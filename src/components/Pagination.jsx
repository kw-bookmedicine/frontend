import React from "react";
import styled from "styled-components";

const Pagination = ({ paginate, currentPage, totalPages }) => {
  const pageNumbers = [];
  const maxPageNumberLimit = 10; // 한 번에 보여줄 최대 페이지 번호 개수

  // 현재 페이지 기준으로 시작 페이지와 끝 페이지를 계산
  let startPage = Math.max(currentPage - Math.floor(maxPageNumberLimit / 2), 1);
  let endPage = Math.min(startPage + maxPageNumberLimit - 1, totalPages);

  // 페이지 번호를 배열에 추가
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const renderPaginationItems = () => {
    const items = [];

    // 첫 페이지
    items.push(
      <PageItem
        key={1}
        $iscurrent={currentPage === 1}
        onClick={() => paginate(1)}
      >
        1
      </PageItem>
    );

    if (startPage > 2) {
      items.push(<PageItem key="start-ellipsis">...</PageItem>);
    }

    // 현재 페이지 주변의 페이지 번호
    pageNumbers.forEach((number) => {
      if (number !== 1 && number !== totalPages) {
        items.push(
          <PageItem
            key={number}
            $iscurrent={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </PageItem>
        );
      }
    });

    if (endPage < totalPages - 1) {
      items.push(<PageItem key="end-ellipsis">...</PageItem>);
    }

    // 마지막 페이지
    if (totalPages > 1) {
      items.push(
        <PageItem
          key={totalPages}
          $iscurrent={currentPage === totalPages}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </PageItem>
      );
    }

    return items;
  };

  return (
    <PaginationContainer className="pagination">
      {currentPage > 1 && (
        <PageItem onClick={() => paginate(currentPage - 1)}>&laquo;</PageItem>
      )}
      {renderPaginationItems()}
      {currentPage < totalPages && (
        <PageItem onClick={() => paginate(currentPage + 1)}>&raquo;</PageItem>
      )}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
`;

const PageItem = styled.li`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 60px;
  padding: 4px;
  color: ${(props) => (props.$iscurrent ? "#00A2BC" : "black")};
  font-weight: ${(props) => (props.$iscurrent ? "bold" : "normal")};

  &:hover {
    cursor: pointer;
    background-color: #d5d5d5;
    border-radius: 50%;
    text-decoration: underline;
  }
`;
