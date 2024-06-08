import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// COMPONENTS
import Header from "../../components/Header";
import Title from "../../components/Prescription/ProcessTitle";
import SearchBookModal from "../../components/Modal/SearchBook";

// ASSETS
import loading_img from "../../assets/loading_thumbnail_x4.png";
import loading_test_img from "../../assets/loading_test_img.png";

// SERVICE
import api from "../../services/api";

// STYLE
import "../../styles/Counseling/PrescriptionWrite.css";
import {
  MAX_LENGTH_DEFAULT,
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_TITLE,
} from "../../constants/constants";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

// todo
// -focus가 되어있을때, 처방전 작성하기 버튼을 누르면 조금 스크롤 이동이 되는 버그 발생-> css 없애면 잘 작동함..
// 책 클릭시 handleChangeISBN함수로 isbn 수정하기 +  isbn: location.state?.isbn || "9788932011172", // 임시 ISBN 값 제거하기
const PrescriptionWrite = () => {
  const [input, setInput] = useState("");
  const [isShow, setIsShow] = useState(false); // 검색 모달창
  const [isLoading, setIsLoading] = useState(true);

  // 모달창을 클릭한 여부
  const [modalIsClick, setModalIsClick] = useState(false);
  let [searchData, setSearchData] = useState(0);

  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");
  const nickname = searchParams.get("nickname");

  // 검색 결과
  const [searchResult, setSearchResult] = useState([]);
  const [choiceItem, setChoiceItem] = useState({});

  // 처방하러가기 버튼으로는 useNavigate로 전달한 해당 처방전의 boardId 데이터 받기
  // 수정하기 버튼에서는 해당 처방에 대한 데이터 title, description, isbn, boardId, prescriptionId 값 받기
  const location = useLocation();

  const navigate = useNavigate(); // 버튼 클릭시 페이지 이동

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

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: location.state?.title || "",
      description: location.state?.description || "",
      isbn: location.state?.isbn || "",
      boardId: location.state?.boardId || "",
      prescriptionId: location.state?.prescriptionId || undefined,
    },
  });

  const title = watch("title");
  const description = watch("description");

  const postPrscr = async (data) => {
    try {
      api
        .post(
          "/api/prescription",
          {
            title: data.title,
            description: data.description,
            isbn: data.isbn,
            boardId: data.boardId,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "success") {
            alert("처방전이 작성되었습니다!");
            navigate(`/worry-detail?board=${boardId}`);
          }
        });
    } catch (error) {
      window.location.replace("/login");
      console.error("Error:", error);
    }
  };

  // 검색 데이터 가져오기
  const fetchSearchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (input.trim() === "") return;

      await api
        .get(
          // `/api/search/book?title=${input}&target=page&sort=view-count&page=${0}&size=${10}`,
          `/api/search/book?title=${input}&target=modal`,

          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          // if (res.data.content.length > 0) {
          //   setSearchResult(res.data.content);
          // }
          if (res.data.length > 0) {
            setSearchResult(res.data);
          }
          setIsLoading(false);
        });
    } catch (err) {
      // window.location.replace("/login");
      console.log(err);
    }
  }, [input]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchData();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input, fetchSearchData]);

  // 검색 결과 중 선택된 아이템 지정
  const resClick = (item) => {
    // console.log(item);
    setChoiceItem(item);
    setValue("isbn", item.isbn);
    setValue("boardId", boardId);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    postPrscr(data);
    if (!data.isbn) {
      alert("책을 선택해주세요.");
      return;
    }
  };

  const imageUrl =
    location.state?.imageUrl ??
    (modalIsClick ? choiceItem.imageUrl ?? loading_img : loading_img);

  return (
    <>
      <Header />
      <Title type={"process"} value={"50"} nickname={nickname} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="prescription_content_container">
          <section className="prescription_content_up_container">
            <div className="prscr_bookInfo_wrapper">
              <div className="prscr_left_wrapper">
                <img
                  src={imageUrl}
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
                    alt=""
                  />
                  <input
                    type="text"
                    placeholder="처방할 책을 검색해주세요"
                    value={isShow ? (input === "" ? "" : input) : ""}
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
                {isShow && input.length === 0 ? setIsShow(false) : null}

                {isShow && input.length > 0 ? (
                  <>
                    <div
                      className={`searchBook_modal_container_${isShow} spinner-container
};`}
                      onClick={handleModalIsClick}
                    >
                      {isLoading && <LoadingSpinner />}
                      {!isLoading && (
                        <SearchBookModal
                          onClose={handleModalClose}
                          isClick={handleModalIsClick}
                          searchResult={searchResult}
                          active={isShow}
                          resClick={resClick}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={`searchBook_modal_container_${isShow}`}
                      onClick={handleModalIsClick}
                    >
                      <SearchBookModal
                        onClose={handleModalClose}
                        isClick={handleModalIsClick}
                        searchResult={searchResult}
                        active={isShow}
                        resClick={resClick}
                      />
                    </div>
                  </>
                )}

                {isShow === false && modalIsClick && searchData > 0 ? (
                  <div className="prscr_search_res_wrapper">
                    <p className="search_res_bookTitle">{choiceItem.title}</p>
                    <p className="search_res_bookAuthor">{choiceItem.author}</p>
                    <p className="search_res_bookCompany">
                      {choiceItem.publishingHouse}
                    </p>
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
              <label>
                <p className="prescription_content_bottom_text">
                  제목{" "}
                  <span>
                    [ {title.length} / {MAX_LENGTH_TITLE}자 ]
                  </span>
                </p>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="처방 제목을 작성하세요"
                  maxLength={MAX_LENGTH_TITLE}
                  minLength={1}
                />
              </label>
              <label>
                <p className="prescription_content_bottom_text">
                  처방사유{" "}
                  <span>
                    [ {description.length} / {MAX_LENGTH_DESCRIPTION}자 ]
                  </span>
                </p>

                <textarea
                  {...register("description", { required: true })}
                  type="text"
                  placeholder="처방사유를 작성하세요"
                  maxLength={MAX_LENGTH_DESCRIPTION}
                  minLength={1}
                />
              </label>
            </div>
          </section>
        </div>
        <div className="prescription_btn_container">
          <button
            type="button"
            onClick={() => navigate(`/worry-detail?board=${boardId}`)}
            className="prscr_cancel_btn"
          >
            취소하기
          </button>
          <button type="submit" className="prscr_apply_btn">
            처방전 작성하기
          </button>
        </div>
      </form>
    </>
  );
};

export default PrescriptionWrite;
