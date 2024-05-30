import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

// SERVICE
import api from "../../services/api";

// COMPONENTS
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Btn from "../../components/Button";
import ModalPortal from "../../components/Modal/Portal";
import MyListModal from "../../components/Modal/MyListModal";

// STYLES
import "../../styles/Profile/MyPage.css";

const Mypage = () => {
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const [intro, setIntro] = useState("여기에 자기소개를 입력하세요.");
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEdit(false);
    // 여기서는 간단하게 console에 출력하도록 했지만, 실제로는 이 정보를 서버에 전송하여 저장할 수 있습니다.
    // console.log('유저의 자기소개:', intro);
    swal("제출되었습니다!", "자기 소개 정보가 변경되었습니다!", "success");
  };

  const textAreaRef = useRef(null);

  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (isEdit) {
      // 포커스가 설정된 후에 커서를 맨 뒤로 이동시킴
      textAreaRef.current.focus();
      const length = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(length, length);
    }
  }, [isEdit]);

  const getUserData = () => {
    api.get("/client", { withCredentials: true }).then((res) => {
      // console.log(res.data);
      // console.log(res.data.nickname);

      res.data.nickname === null
        ? setNickname("사용자 닉네임")
        : setNickname(res.data.nickname);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Header />
      <div className="myPage_container">
        <div className="myPage_banner">
          <img
            className="myPage_banner_img"
            src="/images/profile_bg.png"
            alt=""
          />
        </div>
        <div className="myPage_content">
          <div className="myPage_user_wrapper">
            <div className="user_left_wrapper">
              <div className="user_left_img_wrapper">
                <img
                  src="/icon/profile/basic_profile_img.svg"
                  alt="기본 프로필 이미지"
                />
              </div>
            </div>
            <div className="user_right_wrapper">
              <div className="right_userInfo_title_wrapper">
                <p className="userInfo_name_text">{nickname}</p>
                <p>
                  나는 어디에서 왔을까? 내가 제일 좋아하는 색깔은 검정검정.나는
                  어디에서 왔을까? 내가 제일 좋아하는 색깔은 검정검정.나는
                  어디에서
                </p>
              </div>
              <div className="right_userInfo_dashboard_wrapper">
                <div className="dashboard_worry_wrapper">
                  <img src="/icon/profile/profile_worry_icon.svg" alt="" />
                  나의 고민 개수
                  <p className="dashboard_number">20개</p>
                </div>
                <div className="dashboard_prscr_wrapper">
                  <img src="/icon/profile/profile_prscr_icon.svg" alt="" />
                  내가 남긴 처방전 개수
                  <p className="dashboard_number">20개</p>
                </div>
              </div>
            </div>
          </div>
          <div className="myPage_service_wrapper">
            <div className="service_title">서비스 관리</div>
            <div className="service_my_list">내가 남긴 고민</div>
            <Link to={"/myPrescriptions"}>
              <div className="service_my_list">내가 남긴 처방</div>
            </Link>
            <div className="service_my_list">내가 남긴 한 줄 처방</div>
            <div onClick={handleModal} className="service_userReview_text">
              복용내역
            </div>
            <ModalPortal>
              {modalOn && <MyListModal onClose={handleModal} />}
            </ModalPortal>

            {/* <Link to={'/myfeed'}>
							<div className="service_userFeed_text">내 피드</div>
						</Link> */}
          </div>
          <div className="myPage_info_wrapper">
            <div className="info_title">정보 관리</div>
            <Link to={"/edit"}>
              <div className="info_myInfo_text">내 정보 관리</div>
            </Link>
          </div>
          <div className="myPage_button_wrapper">
            <Btn text={"회원탈퇴"} type="withdraw" />
            <Btn text={"로그아웃"} type="profile_logout" />
          </div>
          <section className="myPage_footer">
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
};

export default Mypage;
