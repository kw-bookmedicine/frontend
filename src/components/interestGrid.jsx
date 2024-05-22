import React, { useState } from "react";

const interestGrid = ({ choiceClick, list }) => {
  return (
    <>
      {list.length > 0
        ? list.map((item, idx) => {
            return (
              <div
                className="user_interest_item"
                id={item}
                key={idx + item}
                onClick={choiceClick}
              >
                {item}
              </div>
            );
          })
        : null}
    </>
  );
};

export default interestGrid;
