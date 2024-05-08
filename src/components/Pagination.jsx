import React from "react";
import styled from "styled-components";

const Pagination = ({ totalBooks, paginate, currentPage }) => {
  const pageNumbers = [];
  const maxPageNumberLimit = 10; // 한 번에 보여줄 최대 페이지 번호 개수
  const totalPages = Math.ceil(totalBooks / maxPageNumberLimit);
  let startPage = Math.max(currentPage - Math.floor(maxPageNumberLimit / 2), 1);
  let endPage = Math.min(startPage + maxPageNumberLimit - 1, totalPages);

  // 시작 페이지 재조정: 끝 페이지가 최대 페이지에 도달했지만, 시작 페이지가 아직 여유가 있는 경우
  if (endPage - startPage + 1 < maxPageNumberLimit) {
    startPage = Math.max(endPage - maxPageNumberLimit + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer className="pagination">
      {pageNumbers.map((number) => {
        return (
          <PageItem
            key={number}
            className="page-item"
            $iscurrent={number === currentPage}
            onClick={() => {
              window.scrollTo(0, 0);
              paginate(number);
            }}
          >
            {number}
          </PageItem>
        );
      })}
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
