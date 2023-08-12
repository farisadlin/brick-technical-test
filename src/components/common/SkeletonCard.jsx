import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const StyledSkeletonCard = styled.div`
  background-color: #e0e0e0;
  background-image: linear-gradient(90deg, #e0e0e0 0px, #f8f8f8 40px, #e0e0e0 80px);
  background-size: 468px 100%;
  animation: ${shimmerAnimation} 1.5s infinite linear;
  color: transparent;
  height: 100px;
  border-radius: 4px; /* Optional: To make the card have rounded corners */
  position: relative;
  overflow: hidden; /* To ensure the shimmer effect respects the border-radius */
`;

export default function SkeletonCard() {
    return <StyledSkeletonCard />
}
