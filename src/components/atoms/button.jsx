import styled from 'styled-components';
import colors from 'modules/colors';

const Button = ({ className, content, onClick }) => {
  content = content || '送信';

  return (
    <div className={`${className} Button`} onClick={onClick}>
      <p>{content}</p>
    </div>
  );
}

const StyledButton = styled(Button)`
display: inline-block;
background-color: ${colors.main};
border-radius: 4px;
padding: 0.5rem 1rem;
color: ${colors.white};
cursor: pointer;
`;

StyledButton.defaultProps = {
}

export default StyledButton;