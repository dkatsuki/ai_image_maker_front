import styled from "styled-components";
import SiteHeader from "components/atoms/site_header";

const TopTemplate = (props) => {
  console.log(props)
  return(
    <div className={props.className}>
      <SiteHeader />
    </div>
  );
}

const StyledTopTemplate = styled(TopTemplate)`
`;

export default StyledTopTemplate;
