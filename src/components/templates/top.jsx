import styled from "styled-components";
import TopWrapper from "components/atoms/top_wrapper";
import media from 'modules/media_query';
import ArticleHeader from "components/molecules/article_header";

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
    </TopWrapper>
  );
}

const StyledTopTemplate = styled(TopTemplate)`
> p {
  line-height: 1.8rem;
}

${media.mobile`
`}
`;

export default StyledTopTemplate;
