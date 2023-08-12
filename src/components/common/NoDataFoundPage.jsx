import styled from "styled-components";

const StyledEmptyContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: #777;
    text-align: center;
`;

export default function NoDataFoundPage() {
    return (
        <StyledEmptyContainer>
            <p>No data found.</p>
            <span>Please try searching for something else.</span>
        </StyledEmptyContainer>
    );
}
