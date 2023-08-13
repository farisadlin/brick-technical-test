import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ErrorCode = styled.h1`
  font-size: 4rem;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const ErrorPage = ({error}) => {
  return (
    <ErrorContainer>
      <ErrorCode>{error?.errorStatus}</ErrorCode>
      <ErrorMessage>{error?.errorMessage?.message}</ErrorMessage>
    </ErrorContainer>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.shape({
    errorMessage: PropTypes.shape({
      message: PropTypes.string.isRequired
    }),
    errorStatus: PropTypes.number
  })
};

export default ErrorPage;
