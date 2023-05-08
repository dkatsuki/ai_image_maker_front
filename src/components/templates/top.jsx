import styled from "styled-components";
import TopWrapper from "components/atoms/top_wrapper";
import media from 'modules/media_query';
import ArticleHeader from "components/molecules/article_header";

const TopTemplate = (props) => {
  return(
    <TopWrapper className={props.className}>
      <ArticleHeader content="AI画像生成サービスAigazo(アイガゾ)とは？" />
    </TopWrapper>
  );
}

const StyledTopTemplate = styled(TopTemplate)`
${media.mobile`
`}
`;

export default StyledTopTemplate;
