import styled from "styled-components";
import TopWrapper from "components/atoms/top_wrapper";
import media from 'modules/media_query';

const TopTemplate = (props) => {
  return(
    <TopWrapper className={props.className}>
    </TopWrapper>
  );
}

const StyledTopTemplate = styled(TopTemplate)`
${media.mobile`
`}
`;

export default StyledTopTemplate;
