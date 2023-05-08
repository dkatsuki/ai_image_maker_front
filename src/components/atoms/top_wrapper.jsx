import styled from 'styled-components';
import media from 'modules/media_query.js';
import SiteHeader from "components/atoms/site_header";
import { SITE_HEADER_HEIGHT } from 'modules/constants';

const TopWapper = ({className, children}) => {

	return(
    <div className={`${className} TopWrapper`}>
      <SiteHeader />
      {children}
    </div>
  )
}

const StyledTopWapper = styled(TopWapper)`
width: 50vw;
min-width: 600px;
margin: 0 auto;
min-height: 100vh;
padding-top: ${SITE_HEADER_HEIGHT + 28}px;

${media.mobile`
overflow-x: hidden;
padding: 0px 2vw;
width: 100%;
min-height: 100vh;
min-width: auto;
`}
`;

export default StyledTopWapper