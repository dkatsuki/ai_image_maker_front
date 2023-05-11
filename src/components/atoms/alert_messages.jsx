import styled from 'styled-components';
import colors from 'modules/colors.js';
import {useMemo} from 'react';

const AlertMessages = ({ className, messages, type }) => {
  const displayMessages = useMemo(() => {
    if (!Array.isArray(messages)) {
      return(
        <p>{messages}</p>
      )
    }

    const results = messages.map((message) => {
      return(
        <p key={message}>{message}</p>
      )
    })

    return(results);
  }, [JSON.stringify(messages)])

  return (
    <div className={`${className} ${type} AlertMessages`} role="alert">
      {displayMessages}
    </div>
  );
}

const StyledAlertMessages = styled(AlertMessages)`
  border-radius: 0.2rem;
  padding: 0.3rem;
  display: flex;
  align-items: center;

  &.error {
    background-color: ${colors.alertRed};
  }

  &.success {
    background-color: ${colors.successGreen};
  }
`;

StyledAlertMessages.defaultProps = {
  type: 'error',
  message: '失敗しました!'
}

export default StyledAlertMessages;