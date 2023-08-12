import styled from "styled-components";

const StyledSkeletonCard = styled.div`
  background-color: #e0e0e0;
  color: transparent;
  height: 100px;
`;

export default function SkeletonCard() {
    return <StyledSkeletonCard />
}