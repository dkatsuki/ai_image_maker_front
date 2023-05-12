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
      border: solid 1px ${colors.black};
      width: 100%;
      height: auto;
    }
  }
}
`;

const Form = ({ className }) => {
  const [generatedAiImages, setGeneratedAiImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const defaultAiImage = {
    spell: '',
    width: aiImageConfig.widthOptions[0],
    height: aiImageConfig.heightOptions[0],
    n: aiImageConfig.nOptions[0],
  }

  const [aiImage, setAiImage] = useState(defaultAiImage);

  const onReset = () => {
    setGeneratedAiImages([]);
    setAiImage(defaultAiImage);
  }

  const startLoading = (message) => {
    setIsLoading(true);
    onReset();
    setLoadingMessage(message);
  };

  const finishLoading = () => {
    setIsLoading(false);
  };

  const onChange = (event) => {
    if (event.target.name === 'width') {
      setAiImage({...aiImage, width: event.target.value, height: event.target.value});
      return;
    }
    setAiImage({...aiImage, [event.target.name]: event.target.value});
  }

  const onGenerateImage = () => {
    let requestPath = '/ai_images';
    const postData = {ai_image: aiImage, to_json_option: {methods: ['image_source']}}
    startLoading(`画像を生成中です.....\n数秒から〜十数秒程度かかります......`);

    if (Number(aiImage.n) < 2) {
      api.httpPost(requestPath, postData, (response) => {
        setGeneratedAiImages([response.body]);
        finishLoading();
      })
    } else {
      requestPath  = '/ai_images/create_multiple_pattern_image_records'
      api.httpPost(requestPath, postData, (response) => {
        setGeneratedAiImages(response.body);
        finishLoading();
      })
    }
  }

  const onTranslateToEnglish = () => {
    startLoading(`翻訳中です....少々お待ちください`);
    api.httpPost('/translations/to_english', {text: aiImage.spell}, (response) => {
      finishLoading();
      setAiImage({...aiImage, spell: response.text});
    })
  }

  return (
    <div className={className}>
      <StyledGeneratedAiImagesDisplayArea aiImages={generatedAiImages} />
      <textarea
        className={`${className} TextArea`}
        name="spell"
        value={aiImage.spell}
        onChange={onChange}
      />
      <div className="button-line" >
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
        <Button content="英語に翻訳" onClick={onTranslateToEnglish} />
        <Button content="画像生成" onClick={onGenerateImage} />
      </div>
      <Loading isLoading={isLoading} text={loadingMessage} />
    </div>
  );
};

const StyledForm = styled(Form)`
width: 100%;
border-radius: 4px;
font-size: 1rem;
line-height: 1.5rem;
position: relative;

> textarea {
  width: 100%;
  height: 10.0rem;
}

> div.button-line {
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
  return(
    <TopWrapper className={props.className}>
      <ArticleHeader content="AI画像生成サービスAigazo(アイガゾ)とは？" />
      <p>
        AI画像生成を気軽に出来るサービスです。<br/>
        以下のフォームにどんな画像を入力したいのかを入力して送信してみましょう。<br/>
        文章で指示したり、単語の羅列にしてみたりで結果が色々変わります。<br/>
        英語に翻訳してからの方が精度が高まる傾向があります。
      </p>
      <StyledForm />
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
