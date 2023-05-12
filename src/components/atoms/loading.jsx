import styled from 'styled-components';
import colors from 'modules/colors';

const Icon = ({className}) => {
  return(
    <div className={className}>
      <div></div>
      <div></div>
    </div>
  )
}

const StyledIcon = styled(Icon)`
width: 50px;
height: 50px;
display: flex;
flex-wrap: wrap;
justify-content: space-around;

> div:nth-child(1) {
  background-color: ${colors.rgba.main(1)};
  animation: anime1 1.5s infinite;
}

> div:nth-child(2) {
  background-color: ${colors.rgba.main(0.2)};
  animation: anime2 1.5s infinite;
}

> div {
  width: 50%;
  height: 50%;
}

@keyframes anime1 {
  0% { transform: translateX(0); }
  25% { transform: translateX(100%) rotateZ(90deg); }
  50% { transform: translateX(100%) translateY(100%); }
  100% { transform: translateY(100%); }
}

@keyframes anime2 {
  0% { transform: translateY(100%); }
  25% { transform: translateX(-100%) translateY(100%); }
  50% { transform: translateX(-100%) translateY(0%); }
  100% { transform: translateX(0); }
}
`;

const Loading = ({className, text}) => {
  return(
    <div className={`${className} Loading`}>
      <StyledIcon />
      <div>
        <p>
          {text}
        </p>
      </div>
    </div>
  )
}

const StyledLoading = styled(Loading)`
`;


export default StyledLoading;