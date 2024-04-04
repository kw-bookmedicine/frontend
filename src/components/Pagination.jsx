import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Pagination = ({
  booksPerPage,
  totalBooks,
  paginate,
  bookTitle,
  currentPage,
}) => {
  const pageNumbers = [];
  // console.log(totalBooks, booksPerPage);
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
    // console.log(pageNumbers);
  }

  return (
    <nav>
      <PaginationContainer className="pagination">
        {pageNumbers.map((number) => {
          return (
            <PageItem
              key={number}
              className="page-item"
              isCurrent={number === currentPage}
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
    </nav>
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
  color: ${(props) =>
    props.isCurrent
      ? "#00A2BC"
    : "black"}; // 현재 페이지일 때 빨간색, 아니면 검은색
  font-weight: ${(props)=> props.isCurrent ? "bold" : "normal"};

  &:hover {
    cursor: pointer;
    background-color: #d5d5d5;
    border-radius: 50%;
    text-decoration: underline;
  }
`;