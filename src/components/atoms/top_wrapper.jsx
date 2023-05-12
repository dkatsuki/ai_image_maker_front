import styled from 'styled-components';
import media from 'modules/media_query.js';
import SiteHeader from "components/atoms/site_header";
import { DESKTOP_SITE_HEADER_HEIGHT, MOBILE_SITE_HEADER_HEIGHT } from 'modules/constants';

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
padding-top: ${DESKTOP_SITE_HEADER_HEIGHT + 28}px;

${media.mobile`
padding: 0px 2vw;
padding-top: ${MOBILE_SITE_HEADER_HEIGHT + 10}px;
overflow-x: hidden;
width: 100%;
min-height: 100vh;
min-width: auto;
`}
`;

export default StyledTopWapper