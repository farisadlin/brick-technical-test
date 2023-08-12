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

    // Display up to 10 buttons or less if there are fewer pages
    const maxDisplayPages = Math.min(totalPages, 10);

    // Determine the range of pages to display
    let startPage = Math.max(currentPage - Math.floor(maxDisplayPages / 2), 1);
    let endPage = startPage + maxDisplayPages - 1;

    // Adjust the range if it exceeds total pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxDisplayPages + 1, 1);
    }

    for (let page = startPage; page <= endPage; page++) {
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

    // Add "..." before the first page if necessary
    if (startPage > 1) {
      buttons.unshift(<PageButton key="start-ellipsis">...</PageButton>);
    }

    // Add "..." after the last page if necessary
    if (endPage < totalPages) {
      buttons.push(<PageButton key="end-ellipsis">...</PageButton>);
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
