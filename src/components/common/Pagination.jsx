import { MEDIA_QUERIES_DEVICE } from '@/constants';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // Allow wrapping on smaller screens
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  overflow-x: auto; // Use horizontal scroll if necessary
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 5px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#ccc' : 'transparent')};

  &:hover {
    background-color: #eee;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

    @media ${MEDIA_QUERIES_DEVICE.TABLET} {
        padding: 6px 10px;
        margin: 0 3px;
    }
`;

function Pagination({ totalPages, currentPage, onPageChange }) {
    const maxDisplayPagesDesktop = 10;
    const maxDisplayPagesMobile = 2;

    const getPageButtons = () => {
        const buttons = [];

        const maxDisplayPages = Math.min(totalPages, window.innerWidth <= 768 ? maxDisplayPagesMobile : maxDisplayPagesDesktop);

        let startPage = Math.max(currentPage - Math.floor(maxDisplayPages / 2), 1);
        let endPage = startPage + maxDisplayPages - 1;

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

        if (startPage > 1) {
            buttons.unshift(
                <PageButton key="start-1" onClick={() => onPageChange(1)}>1</PageButton>,
                <PageButton key="start-ellipsis" disabled>...</PageButton>
            );
        }

        if (endPage < totalPages) {
            buttons.push(
                <PageButton key="end-ellipsis" disabled>...</PageButton>,
                <PageButton key="end-last" onClick={() => onPageChange(totalPages)}>{totalPages}</PageButton>
            );
        }

        return buttons;
    };

    return (
        <PaginationContainer>
            {currentPage > 1 && (
                <PageButton onClick={() => onPageChange(currentPage - 1)}>
                    Previous
                </PageButton>
            )}
            {getPageButtons()}
            {currentPage < totalPages && (
                <PageButton onClick={() => onPageChange(currentPage + 1)}>
                    Next
                </PageButton>
            )}
        </PaginationContainer>
    );
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
