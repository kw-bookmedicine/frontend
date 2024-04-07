import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";

// ASSET

// COMPONENTS
import ProcessTitle from "../components/Prescription/ProcessTitle";

// mission
// UI 구현 -> 버튼 클릭 추가 -> 같은 field 라서 다음질문에서 선택이 된 것을 볼 수 있는데 질문마다 다른 field로 차후 변경될테니 버그는 아님

// 스크롤 이벤트 추가
// 애니메이션 추가
// 진행바 수정
// 로딩 후 화면 전환 추가

const WorryWrite = () => {
  const [currentStep, setCurrentStep] = useState(0); // 현재 질문 단계
  const [userResponses, setUserResponses] = useState([]); // 사용자의 답변 저장
  const [isCompleted, setIsCompleted] = useState(false); // 질문 완료 여부

  const [showOptions, setShowOptions] = useState(false); // 답변 옵션과 버튼을 보여줄지 여부를 결정하는 새 상태

  const [userSelections, setUserSelections] = useState({
    category: "",
    worry1: "",
    worry2: "",
    space: "",
    type: "",
    brand: "",
    angleInstallation: "",
    pipingType: "",
    serviceDate: "",
  });

  // 스크롤을 적용할 요소를 위한 ref 생성
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 현재 단계의 질문이 렌더링된 후 0.5초를 기다렸다가 옵션과 버튼을 보여주도록 설정
    setShowOptions(false); // 새로운 질문이 로드될 때마다 옵션을 숨깁니다.
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 1000); // 0.5초 후에 상태 업데이트
    scrollToBottom();

    return () => clearTimeout(timer);
  }, [currentStep]); // 새로운 질문지일때 스크롤 자동 내림
  // useEffect를 사용한 이유는 렌더링이 다 된 이후에 작동하기

  const [questions, setQuestions] = useState([
    {
      field: "category",
      question: "현재 가지고 있는 고민은 무엇인가요?",
      options: [
        "경제",
        "건강",
        "자녀/양육",
        "취업/진로",
        "공부/자기계발",
        "관계/소통",
        "소설/에세이",
        "철학",
        "역사",
        "과학",
        "사회",
        "취미",
      ],
      selected: false,
    },
    {
      field: "worry1",
      question: "현재 가지고 있는 고민은 무엇인가요?",
      options: [
        "경제",
        "건강",
        "자녀/양육",
        "취업/진로",
        "공부/자기계발",
        "관계/소통",
        "소설/에세이",
        "철학",
        "역사",
        "과학",
        "사회",
        "취미",
      ],
      selected: false,
    },
    {
      field: "worry2",
      question: "현재 가지고 있는 고민은 무엇인가요?",
      options: [
        "경제",
        "건강",
        "자녀/양육",
        "취업/진로",
        "공부/자기계발",
        "관계/소통",
        "소설/에세이",
        "철학",
        "역사",
        "과학",
        "사회",
        "취미",
      ],
      selected: false,
    },
    // 질문 추가
  ]);

  const handleNextStep = () => {
    // 현재 field 가져오기
    const currentField = questions[currentStep].field;
    const response = userSelections[currentField];
    setUserResponses([...userResponses, { step: currentStep, response }]);
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSelectedAnswer = (selectedOption) => {
    const updatedQuestions = questions.map((item, index) => {
      // 선택된 객체의 상태 변경
      if (index === currentStep) {
        return { ...item, selected: true };
      }
      return item;
    });
    setQuestions(updatedQuestions);

    // 유저가 선택한 답변 저장
    const field = questions[currentStep].field;
    setUserSelections((prev) => ({
      ...prev,
      [field]: selectedOption,
    }));
  };

  const processValue = Math.floor((currentStep / questions.length) * 100);

  return (
    <>
      <Header />
      <ProcessTitle type={"Counseling"} value={processValue} />
      <Body id="app-body">
        <div className="form-container">
          <div className="request-chat-form">
            {userResponses.map((ur, index) => (
              <div key={index}>
                <PrevQuestionMessageWrapper>
                  {questions[ur.step].question}
                </PrevQuestionMessageWrapper>
                <PrevAnswerMessageWrapper>
                  <PrevAnswerMessage>
                    <HightLigint>{ur.response}</HightLigint>에 대해서 고민이
                    있어
                  </PrevAnswerMessage>
                </PrevAnswerMessageWrapper>
              </div>
            ))}
            {!isCompleted && (
              <>
                <MessageContainer ref={scrollContainerRef}>
                  <Content>{questions[currentStep].question}</Content>
                  <Answers>
                    {questions[currentStep].options.map((option, index) => (
                      <Answer
                        key={index}
                        onClick={() => handleSelectedAnswer(option)}
                      >
                        <OptionButton
                          clicked={
                            userSelections[questions[currentStep].field] ===
                            option
                          }
                        />
                        {option}
                      </Answer>
                    ))}
                  </Answers>
                  <Button
                    disabled={!questions[currentStep].selected}
                    onClick={() => handleNextStep()}
                  >
                    선택하기
                  </Button>
                </MessageContainer>
              </>
            )}
          </div>
        </div>
      </Body>
    </>
  );
};

export default WorryWrite;

const OptionButton = ({ clicked }) => {
  return (
    <StyledOptionButton>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
          fill={clicked ? "#37c8dc" : "none"}
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z"
          fill={clicked ? "#37c8dc" : "#C0C0C0"}
        ></path>
      </svg>
    </StyledOptionButton>
  );
};

const Body = styled.div`
  padding: 40px 160px 180px;
  background-color: #dce9ec;
  min-height: 700px;
  min-height: 80vh;
  height: auto;
`;

const PrevQuestionMessageWrapper = styled.div`
  width: fit-content;
  padding: 20px;
  height: 100%;
  font-size: 20px;
  background-color: white;
  font-weight: bold;
  border-radius: 4px 16px 16px;
  margin-bottom: 20px;
`;

const PrevAnswerMessageWrapper = styled.div`
  display: flex;
  justify-content: end;
  font-size: 20px;
  margin-bottom: 20px;
`;

const HightLigint = styled.span`
  font-weight: bold;
`;

const PrevAnswerMessage = styled.div`
  background-color: #a4d6dd;
  padding: 20px;
  border-radius: 16px 4px 16px 16px;
`;

const MessageContainer = styled.div`
  width: 340px;
  padding: 20px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px 16px 16px;
`;

const Content = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Answers = styled.ul`
  width: 100%;
  max-height: 340px;
  margin-bottom: 20px;
  
  // 스크롤바가 안보이지만 스크롤 가능
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리 등 WebKit 기반 브라우저용 */
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 및 엣지(구버전)용 */
  scrollbar-width: none; /* 파이어폭스용 */
`;

const Answer = styled.li`
  width: 100%;
  height: 40px;
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #c8edf2;
  border-radius: 10px;
  font-size: 20px;
`;

const StyledOptionButton = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
