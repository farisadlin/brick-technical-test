import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: absolute; /* Add this to overlay the parent */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const LoadingSpinnerIcon = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingSpinnerIcon />
    </LoadingContainer>
  );
};

export default Loading;
