import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";

// ASSET

// COMPONENTS
import ProcessTitle from "../components/Prescription/ProcessTitle";

// mission
// UI 구현 -> 버튼 클릭 추가
// 스크롤 이벤트 추가
// 애니메이션 추가
// 진행바 수정
// 로딩 후 화면 전환 추가

const WorryWrite = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false); // 질문 완료 여부

  const [userSelections, setUserSelections] = useState({
    worry: "",
    space: "",
    type: "",
    brand: "",
    angleInstallation: "",
    pipingType: "",
    serviceDate: "",
  });

  // 경제, 건강, 자녀/양육, 취업/진로, 공부/자기계발, 관계/소통, 소설/에세이, 철학, 역사, 과학, 사회, 취미

  const [questions,setQuestions] = useState([
    {
      field: "worry",
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
      field: "worry",
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
      field: "worry",
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
    //  {
    //    field: "space",
    //    question: "에어컨 사용 공간은 어디인가요?",
    //    options: [
    //      "가정집",
    //      "아파트, 빌라, 주택 등",
    //      "사무공간",
    //      "상업공간",
    //      "물류창고",
    //      "기타",
    //    ],
    //  },
    //  {
    //    field: "type",
    //    question: "에어컨 종류를 선택해주세요.",
    //    options: ["2 in 1", "벽걸이형", "스탠드형", "천장형", "냉난방기 겸용"],
    //  },
    // 필요하다면 더 많은 질문 추가
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

  return (
    <>
      <Header />
      <ProcessTitle type={"Counseling"} value={"60"} />
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
                    <HightLigint style={{ fontWeight: "bold" }}>
                      {ur.response}
                    </HightLigint>
                    에 대해서 고민이 있어
                  </PrevAnswerMessage>
                </PrevAnswerMessageWrapper>
              </div>
            ))}
            {!isCompleted && (
              <>
                <MessageContainer>
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

const OptionButton = ({clicked}) => {
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
}

const Body = styled.div`
  padding: 40px 160px 180px;
  background-color: #dce9ec;
  height: 100%;
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
`

const PrevAnswerMessage = styled.div`
  background-color: white;
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
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Answer = styled.li`
  width: 100%;
  height: 40px;
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #c8edf2;
  border-radius: 10px;
  font-size: 20px;
`;

const StyledOptionButton = styled.div`
  margin-left:10px;
  margin-right:10px;
`