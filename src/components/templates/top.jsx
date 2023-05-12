import styled from "styled-components";
import colors from "modules/colors";
import {useMemo, useEffect} from "react";
import TopWrapper from "components/atoms/top_wrapper";
import media from 'modules/media_query';
import ArticleHeader from "components/molecules/article_header";
import api from "modules/api";
import Button from "components/atoms/button";
import { useState } from "react";
import { aiImageConfig } from "modules/model_configs.js";
import Image from "next/image";
import SelectWithLabel from "components/molecules/select_with_label";
import AlertMessages from "components/atoms/alert_messages";
import Loading from "components/atoms/loading";

const GeneratedAiImagesDisplayArea = ({ className, aiImages }) => {
  const [images, setImages] = useState([]);
  const [alertMessages, setAlertMessages] = useState(null);

  useEffect(() => {
    const isError = !!aiImages[0] && !!aiImages[0].errors_list;

    if (isError) {
      const errorsList = aiImages[0].errors_list;

      const errorMessages = Object.keys(errorsList).map((key) => {
        return(errorsList[key][0])
      })

      setImages([]);
      setAlertMessages(
        <AlertMessages
          type="error"
          messages={errorMessages}
        />
      );
      return;
    }

    const results = aiImages.map((aiImage) => {
      return(
        <a href={aiImage.image_source} download>
          <Image
            key={aiImage.id}
            src={aiImage.image_source}
            alt="image"
            width={aiImage.width}
            height={aiImage.height}
          />
        </a>
      )
    })

    setImages(results)
    setAlertMessages(
      <AlertMessages
        type="success"
        messages="画像の生成に成功しました！画像をクリックで保存できます。"
      />
    );
  }, [JSON.stringify(aiImages)])

  if (!aiImages || aiImages.length === 0) {
    return(null);
  }

  if (!!aiImages[0] && !aiImages[0].id && !aiImages[0].errors_list) {
    return(null);
  }

  return(
    <div className={className}>
      {alertMessages}
      <div>
        {images}
      </div>
    </div>
  )
}

const StyledGeneratedAiImagesDisplayArea = styled(GeneratedAiImagesDisplayArea)`
border-top: 1px solid #ccc;
padding-top: 0.5rem;

> .AlertMessages {
  margin-bottom: 0.5rem;
}

> div:last-child {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem 2%;
  > a {
    width: 32%;
    height: auto;
    > img {
      width: 100%;
      height: auto;
    }
  }
}
`;

const Form = ({ className, reset, setGeneratedAiImages }) => {
  const [aiImage, setAiImage] = useState({
    spell: 'スノボをする可愛い猫',
    width: aiImageConfig.widthOptions[0],
    height: aiImageConfig.heightOptions[0],
    n: aiImageConfig.nOptions[0],
  });

  const onReset = () => {
    reset();
    setAiImage({
      spell: 'スノボをする可愛い猫',
      width: aiImageConfig.widthOptions[0],
      height: aiImageConfig.heightOptions[0],
      n: aiImageConfig.nOptions[0],
    });
  }

  const onChange = (event) => {
    if (event.target.name === 'width') {
      setAiImage({...aiImage, width: event.target.value, height: event.target.value});
      return;
    }
    setAiImage({...aiImage, [event.target.name]: event.target.value});
  }

  const generateImage = () => {
    let requestPath = '/ai_images';
    const postData = {ai_image: aiImage, to_json_option: {methods: ['image_source']}}
    if (Number(aiImage.n) < 2) {
      api.httpPost(requestPath, postData, (response) => {
        setGeneratedAiImages([response.body]);
      })
    } else {
      requestPath  = '/ai_images/create_multiple_pattern_image_records'
      api.httpPost(requestPath, postData, (response) => {
        setGeneratedAiImages(response.body);
      })
    }
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
        <SelectWithLabel
          name="width"
          options={['小', '中', '大']}
          values={aiImageConfig.widthOptions}
          label="サイズ"
          onChange={onChange}
          value={aiImage.width}
        />
        <SelectWithLabel
          name="n"
          options={[1, 2, 4, 8]}
          label="作成する画像の数"
          onChange={onChange}
          value={aiImage.n}
        />
        <Button content="リセット" onClick={onReset} />
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
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  > .SelectWithLabel {
    height: 100%;
  }
}
`;

const TopTemplate = (props) => {
  const [generatedAiImages, setGeneratedAiImages] = useState([]);

  const reset = () => {
    setGeneratedAiImages([]);
  }

  return(
    <TopWrapper className={props.className}>
      <ArticleHeader content="AI画像生成サービスAigazo(アイガゾ)とは？" />
      <p>
        AI画像生成を気軽に出来るサービスです。<br/>
        以下のフォームにどんな画像を入力したいのかを入力して送信してみましょう。<br/>
        文章で指示したり、単語の羅列にしてみたりで結果が色々変わります。<br/>
        英語に翻訳してからの方が精度が高まる傾向があります。
      </p>
      <StyledGeneratedAiImagesDisplayArea aiImages={generatedAiImages} />
      <StyledForm
        setGeneratedAiImages={setGeneratedAiImages}
        reset={reset}
      />
      <Loading text="ただ今画像を作成しています...." />
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
