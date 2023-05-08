import styled from "styled-components";

const TopTemplate = (props) => {
  console.log(props)
  return(
    <div className={props.className}>
      <h1>{props.title}</h1>
    </div>
  );
}

const StyledTopTemplate = styled(TopTemplate)`
background-color: green;
`;

export default StyledTopTemplate;
