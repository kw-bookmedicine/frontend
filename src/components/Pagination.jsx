import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Pagination = ({ booksPerPage, totalBooks, paginate, bookTitle }) => {
  const pageNumbers = [];
  console.log(totalBooks, booksPerPage);
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
    console.log(pageNumbers);
  }

  return (
    <nav>
      <PaginationContainer className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              className="page-item"
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "60px",
                padding: "4px",
              }}
            >
              {/* <a onClick={()=>paginate(number)} href={bookTitle} className="page-link"> */}
              <Link
                onClick={() => {
                  window.scrollTo(0, 0);
                  paginate(number);
                }}
              >
                {number}
              </Link>
              {/* </a> */}
            </li>
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
