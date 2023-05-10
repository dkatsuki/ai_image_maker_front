import styled from "styled-components";
import {useMemo, useEffect} from "react";
import TopWrapper from "components/atoms/top_wrapper";
import media from 'modules/media_query';
import ArticleHeader from "components/molecules/article_header";
import api from "modules/api";
import Button from "components/atoms/button";
import { useState } from "react";
import { aiImageConfig } from "modules/model_configs.js";
import Image from "next/image";

const GeneratedAiImagesDisplayArea = ({ className, aiImages }) => {

  const images = useMemo(() => {
    const results = aiImages.map((aiImage) => {
      return(
        <Image
          key={aiImage.id}
          src={aiImage.image_source}
          alt="image"
          width={aiImage.width}
          height={aiImage.height}
        />
      )
    })

    return(results)
  }, [JSON.stringify(aiImages)])

  if (!aiImages || aiImages.length === 0 || !aiImages[0].id) {
    return(null);
  }

  return(
    <div className={className}>
      {images}
    </div>
  )
}

const StyledGeneratedAiImagesDisplayArea = styled(GeneratedAiImagesDisplayArea)`
`;

const Form = ({ className, setGeneratedAiImages }) => {
  const [aiImage, setAiImage] = useState({
    spell: '',
    width: aiImageConfig.widthOptions[0],
    height: aiImageConfig.widthOptions[0],
  });

  const onChange = (event) => {
    setAiImage({...aiImage, [event.target.name]: event.target.value});
  }

  const generateImage = () => {
    api.httpPost('/ai_images', {ai_image: aiImage, to_json_option: {methods: ['image_source']}}, (response) => {
      setAiImage(response.body);
      setGeneratedAiImages([response.body]);
    })
  }

  const translateToEnglish = () => {
    api.httpPost('/translations/to_english', {text: aiImage.spell}, (response) => {
      setAiImage({...aiImage, spell: response.text});
    })
  }

  return (
    <div className={className}>
      <textarea
        className={`${className} TextArea`}
        name="spell"
        value={aiImage.spell}
        onChange={onChange}
      />
      <div>
        <Button content="英語に翻訳" onClick={translateToEnglish} />
        <Button content="画像生成" onClick={generateImage} />
      </div>
    </div>
  );
};

const StyledForm = styled(Form)`
width: 100%;
border-radius: 4px;
font-size: 1rem;
line-height: 1.5rem;

> textarea {
  width: 100%;
  height: 10.0rem;
}

> div:last-child {
  display: flex;
  justify-content: space-between;
}
`;

const TopTemplate = (props) => {
  const [generatedAiImages, setGeneratedAiImages] = useState([{
  }]);

  return(
    <TopWrapper className={props.className}>
      <ArticleHeader content="AI画像生成サービスAigazo(アイガゾ)とは？" />
      <p>
        AI画像生成を気軽に出来るサービスです。<br/>
        以下のフォームにどんな画像を入力したいのかを入力して送信してみましょう。<br/>
        文章で指示したり、単語の羅列にしてみたりで結果が色々変わります。<br/>
        英語に翻訳してからの方が精度が高まる傾向があります。
      </p>
      <StyledForm setGeneratedAiImages={setGeneratedAiImages} />
      <StyledGeneratedAiImagesDisplayArea aiImages={generatedAiImages} />
    </TopWrapper>
  );
}

const StyledTopTemplate = styled(TopTemplate)`

> * {
  margin-bottom: 1rem;
}

> p {
  line-height: 1.8rem;
}

${media.mobile`
`}
`;

export default StyledTopTemplate;
