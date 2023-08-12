/* eslint-disable react/prop-types */
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#ccc' : 'transparent')};
`;

function Pagination({ totalPages, currentPage, onPageChange }) {
    const getPageButtons = () => {
        const buttons = [];

        for (let page = 1; page <= totalPages; page++) {
            buttons.push(
                <PageButton
                    key={page}
                    onClick={() => onPageChange(page)}
                    active={currentPage === page}
                >
                    {page}
                </PageButton>
            );
        }

        return buttons;
    };

    return (
        <PaginationContainer>
            <PageButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </PageButton>
            {getPageButtons()}
            <PageButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </PageButton>
        </PaginationContainer>
    );
}

export default Pagination;
