import styled from 'styled-components';
import media from 'modules/media_query.js';
import SiteHeader from "components/atoms/site_header";

const TopWapper = (props) => {

	return(
    <div className={`${props.className} TopWrapper`}>
      <SiteHeader />
    </div>
  )
}

const StyledTopWapper = styled(TopWapper)`
width: 70vw;
min-width: 910px;
margin: 0 auto;
min-height: 100vh;

${media.mobile`
overflow-x: hidden;
padding: 0px 2vw;
width: 100%;
min-height: 100vh;
min-width: auto;
`}
`;

export default StyledTopWapper