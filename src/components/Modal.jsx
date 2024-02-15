import { useEffect, useState } from 'react';
import '../styles/Modal.css';
import closeIcon from '../assets/closeIcon.svg';

const Modal = ({ isOpen, onClose, selectedEmotion, setSelectedEmotion }) => {
  // const emotions = ["화남", "슬픔", "기쁨", "즐거움", "불안", "외로움"];
  const emotions = {
    화남: "화가나",
    슬픔: "슬퍼",
    기쁨: "기뻐",
    즐거움: "즐거워",
    불안: "불안해",
    외로움: "외로워",
  };

  const emotionList = [
    {
      emotion_id: 1,
      emotion_img: "/icon/angry.png",
      emotion_text: "화남 ",
      emotion_hightlight: "화가나",
    },
    {
      emotion_id: 2,
      emotion_img: "/icon/sad.png",
      emotion_text: "슬픔 ",
      emotion_hightlight: "슬퍼",
    },
    {
      emotion_id: 3,
      emotion_img: "/icon/smile.png",
      emotion_text: "기쁨 ",
      emotion_hightlight: "기뻐",
    },
    {
      emotion_id: 4,
      emotion_img: "/icon/happy.png",
      emotion_text: "즐거움 ",
      emotion_hightlight: "즐거워",
    },
    {
      emotion_id: 5,
      emotion_img: "/icon/stress.png",
      emotion_text: "불안 ",
      emotion_hightlight: "불안해",
    },
    {
      emotion_id: 6,
      emotion_img: "/icon/lonely.png",
      emotion_text: "외로움 ",
      emotion_hightlight: "외로워",
    },
  ];

  // Modal 내부 상태 추가
  const [localSelectedEmotion, setLocalSelectedEmotion] = useState("");

  const handleEmotionClick = (emotion) => {
    setLocalSelectedEmotion(emotion);
    console.log(emotion);
  };

  const handleSubmit = () => {
    setSelectedEmotion(localSelectedEmotion); // 외부 상태 업데이트
    onClose(); // 모달 닫기
  };

  const handleOnClose = () => {
     onClose();
     setLocalSelectedEmotion("");
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" id="wrapper" onClick={handleOnClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleOnClose}>
          <span>
            <img src={closeIcon} alt="" />
          </span>
        </button>
        <div className="modal-contents">
          {/* <p className='modal-title-hightlight'>. .</p> */}
          <div className="modal-title">
            <h1>
              오늘 당신의 <span>기분</span>은 어떤가요?
            </h1>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>
              나는 오늘{" "}
              <span>
                {localSelectedEmotion === ""
                  ? "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
                  : emotions[localSelectedEmotion]}
              </span>
              요.
            </h2>
          </div>
          {/* 오늘의 감정 선택 */}
          <div className="modal-feeling">
            {emotionList.map(
              ({
                emotion_id,
                emotion_img,
                emotion_text,
                emotion_hightlight,
              }) => (
                <div key={emotion_id}>
                  <button
                    onClick={() => handleEmotionClick(emotion_text.trim())}
                  >
                    <img
                      className="feeling-img"
                      src={emotion_img}
                      alt={emotion_text}
                    />
                    <p>{emotion_text.trim()}</p>
                  </button>
                </div>
              )
            )}
          </div>
          <div className="submit-button-container">
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={localSelectedEmotion === "" ? true : false}
            >
              제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;