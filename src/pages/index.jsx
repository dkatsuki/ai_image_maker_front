import styled from "styled-components";

const SampleHome = (props) => {
  return (
    <div className={props.className}>
      <h1>Sample Home</h1>
    </div>
  )
}


const StyledSampleHome = styled(SampleHome)`
background-color: green;
`

export default StyledSampleHome
