import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import Header from "../../components/Header";
import Title from "../../components/Prescription/ProcessTitle";
import SearchBookModal from "../../components/Modal/SearchBook";

// ASSETS
import loading_img from "../../assets/loading_thumbnail_x4.png";
import loading_test_img from "../../assets/loading_test_img.png";

// STYLE
import "../../styles/Counseling/PrescriptionWrite.css";

const PrescriptionWrite = () => {
  const [input, setInput] = useState("");
  const [isShow, setIsShow] = useState(false); // 검색 모달창

  // 모달창을 클릭한 여부
  const [modalIsClick, setModalIsClick] = useState(false);
  let [searchData, setSearchData] = useState(0);

  const handleModalClose = async () => {
    setIsShow(false);
  };

  const handleModalShow = async () => {
    setIsShow(true);
  };

  const handleModalIsClick = async () => {
    setModalIsClick(true);
    setSearchData(searchData + 1);
    searchData = searchData + 1;
    // console.log(searchData);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            // console.log(item.target, 'is visible!');
            if (modalIsClick === true) {
              chTarget.classList.add("visible");
              chTarget.classList.remove("no");
            } else {
              chTarget.classList.add("visible");
              chTarget.classList.remove("no");
            }
          } else {
            if (modalIsClick === false) {
              // chTarget.classList.add('no');
              // chTarget.classList.remove('visible');
              chTarget.classList.add("visible");
            } else {
              chTarget.classList.add("no");
              chTarget.classList.remove("visible");
            }
          }
        });
      },
      {
        threshold: 0.05,
      }
    );
    // 특정 dom 요소가 화면에 등장하는 지 여부를 감시함.
    const box = document.getElementById("observe_target");
    const chTarget = document.getElementById("prscr_write_box");
    observer.observe(box);
  });

  return (
    <>
      <Header />
      <Title type={"process"} value={"30"} />
      <div className="prescription_content_container">
        <section className="prescription_content_up_container">
          <div className="prscr_bookInfo_wrapper">
            <div className="prscr_left_wrapper">
              <img
                src={modalIsClick ? loading_test_img : loading_img}
                alt="로딩 썸네일"
                className="prscr_img_wrapper"
              />
              {/* <button type="submit" className="search_res_no_btn">
								찾는 책이 없어요
							</button> */}
            </div>
            <div className="prscr_right_wrapper">
              <div className="prscr_searchBar_wrapper">
                <img
                  src="/icon/search_icon.png"
                  className="prscr_search_icon"
                />

                <input
                  type="text"
                  placeholder="처방할 책을 검색해주세요"
                  value={input}
                  className="prscr_search_text"
                  onChange={(e) => {
                    setInput(e.target.value);
                    handleModalShow();
                  }}
                />
                {input.length > 0 ? (
                  <button
                    className="prscr_search_close_btn"
                    onClick={() => {
                      setInput("");
                      handleModalClose();
                    }}
                  >
                    X
                  </button>
                ) : null}
              </div>

              {/* 처음에 모달 클릭되었을 때 책 정보 나타나는 에러 방지 */}
              {isShow === false && modalIsClick === true
                ? input.length > 0
                  ? null
                  : setModalIsClick(false)
                : null}

              {isShow && input.length > 0 ? (
                <SearchBookModal
                  onClose={handleModalClose}
                  isClick={handleModalIsClick}
                  author={input}
                  active={isShow}
                />
              ) : (
                <SearchBookModal
                  onClose={handleModalClose}
                  isClick={handleModalIsClick}
                  author={input}
                  active={isShow}
                />
              )}

              {isShow === false && modalIsClick && searchData > 0 ? (
                <div className="prscr_search_res_wrapper">
                  <p className="search_res_bookTitle">책 제목</p>
                  <p className="search_res_bookAuthor">저자</p>
                  <p className="search_res_bookCompany">출판사</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section
          className="prescription_content_bottom_container"
          id="observe_target"
        >
          <div id="prscr_write_box">
            <p>처방사유</p>
            <textarea type="text" placeholder="처방사유를 작성하세요" />
          </div>
        </section>
      </div>
      <div className="prescription_btn_container">
        <button className="prscr_cancel_btn">취소하기</button>
        <Link to={"/prescription/write/2"}>
          <button className="prscr_apply_btn">처방전 작성하기</button>
        </Link>
      </div>
    </>
  );
};

export default PrescriptionWrite;
