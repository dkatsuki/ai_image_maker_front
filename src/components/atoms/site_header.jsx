import siteLogoSource from 'images/site_logo.svg';
import styled from 'styled-components';
import Image from 'next/image';
import media from 'modules/media_query';
import colors from 'modules/colors';
import { DESKTOP_SITE_HEADER_HEIGHT, MOBILE_SITE_HEADER_HEIGHT } from 'modules/constants';

const SiteHeader = ({className}) => {
  return (
    <header className={className}>
      <Image
        src={siteLogoSource}
        alt="Aigazo"
        width={270}
        height={90}
      />
    </header>
  );
}

const StyledSiteHeader = styled(SiteHeader)`
background-color: ${colors.white};
position: fixed;
left: 0;
top: 0;
width: 100vw;
height: ${DESKTOP_SITE_HEADER_HEIGHT}px;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 0.3rem 0.2rem ${colors.rgba.gray(0.2)};
margin-bottom: 1.5rem;

> img {
  display: block;
  height: 80%;
}

${media.mobile`
height: ${MOBILE_SITE_HEADER_HEIGHT}px;
`}
`;

export default StyledSiteHeader;