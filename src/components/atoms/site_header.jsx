import siteLogoSource from 'images/site_logo.svg';
import styled from 'styled-components';
import Image from 'next/image';

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
height: 56px;
display: flex;
align-items: center;
justify-content: center;
box-shadow: 0 0.1rem 0.2rem lightGray;
margin-bottom: 1.5rem;

> img {
  display: block;
  height: 80%;
}
`;

export default StyledSiteHeader;