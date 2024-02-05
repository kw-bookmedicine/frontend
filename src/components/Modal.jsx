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

  // Modal 내부 상태 추가
  const [localSelectedEmotion, setLocalSelectedEmotion] = useState("");

  const handleEmotionClick = (emotion) => {
    setLocalSelectedEmotion(emotion);
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
            {Object.entries(emotions).map(([emotion, description], index) => (
              <div key={index}>
                <button onClick={() => handleEmotionClick(emotion)}>
                  {/* 이미지가 없어서 임시로 div로 처리함 */}
                  {/* <img className="feeling-img" src="" alt={emotion} /> */}
                  <div className="feeling-img"></div>
                  <p>{emotion}</p>
                </button>
              </div>
            ))}
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