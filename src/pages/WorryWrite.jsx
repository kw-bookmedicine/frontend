import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import styled, { keyframes } from "styled-components";

// ASSET

// COMPONENTS
import ProcessTitle from "../components/Prescription/ProcessTitle";

// 화면이 크기가 줄어들지 않게 고정하기
// 로딩 후 화면 전환 추가
// 사용자에게 받은 정보를 보여주는 임의 페이지로 라우팅하기
// 수정할 수 있게 스크롤 이벤트 추가

// 1. 컴포넌트
// 2. 변수를 어떻게 관리하는게 좋을까?


const WorryWrite = () => {
  // 아래 정보들을 useReducer로 관리하는게 좋은가?
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문 단계
  const [userAnswers, setUserAnswers] = useState([]); // 사용자의 답변 저장
  const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] = useState(false); // 질문 완료 여부

  const [showQuestion, setShowQuestion] = useState(true); // 질문 딜레이 적용
  const [showOptions, setShowOptions] = useState(false); // 질문 옵션과 버튼을 보여줄지 여부
  const [isLoading, setIsLoading] = useState(false);

  const [userSelections, setUserSelections] = useState({
    readingFrequency: "",
    keywordConcern: "",
    primaryConcern: "",
    secondaryConcern: "",
    relatedBooksRead: "", // 검색 컴포넌트 있으면 좋을듯
    detailedConcern: "",
    summary: "",
  });

  // 스크롤을 적용할 요소를 위한 ref 생성
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scroll");
  };

  // 질문지 1초후 보이도록 적용
  useEffect(() => {
    setShowOptions(false); // 새로운 질문이 로드될 때마다 옵션을 숨김
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // showOptions와 currentQuestionIndex 변경 시, 자동 스크롤 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showOptions && currentQuestionIndex >= 1) {
        scrollToBottom();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [showOptions, currentQuestionIndex]);

  //  답변 이후 0.5초 후 질문 제목 등장
  useEffect(() => {
    setShowQuestion(false);
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [userAnswers]);

  const [questions, setQuestions] = useState([
    {
      field: "readingFrequency",
      question: "한달에 책을 얼마나 자주 읽으시나요?",
      options: ["1권", "2권", "3권", "4권 이상", "0권"],
      selected: false,
      type: "multipleChoice",
    },
    {
      field: "keywordConcern",
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
      type: "multipleChoice",
    },
    {
      field: "primaryConcern",
      question: "고민 키워드에 대한 질문",
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
      type: "multipleChoice",
    },
    {
      field: "secondaryConcern",
      question: "고민 키워드에 대한 질문",
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
      type: "multipleChoice",
    },
    {
      field: "relatedBooksRead",
      question: "관련된 책중에 읽어본 책 있으면 적어주세요",
      type: "freeText",
    },
    {
      field: "detailedConcern",
      question: "고민에 대해서 자세하게 작성해주세요(최소 100자 이상)",
      minLength: 100,
      type: "freeText",
    },
    {
      field: "summary",
      question: "선택하신 정보들 입니다.",
      type: "normal",
    },
    // 질문 추가
  ]);


  // 다음 질문으로 이동 및 현재 userResponse 정보 업데이트
  const handleNextStep = () => {
    // 현재 field 가져오기
    const currentField = questions[currentQuestionIndex].field;
    const response = userSelections[currentField];
    setUserAnswers([...userAnswers, { step: currentQuestionIndex, response }]); 
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuestionnaireCompleted(true);
      // 마지막 단계 처리 로직 개선 필여
      setIsLoading(true);
      // let sum = 0;
      // for (let i = 0; i < 999999999999; i++){
      //   sum += i;
      // }
      // setIsLoading(false);

    }
  };



  // 질문에 대한 상태 업데이트
  const handleSelectedAnswer = (selectedOption) => {
    const question = questions[currentQuestionIndex];

    // selected 속성이 있는 경우에만 질문 상태를 업데이트
    if ("selected" in question) {
      const updatedQuestions = questions.map((item, index) =>
        index === currentQuestionIndex ? { ...item, selected: true } : item
      );
      setQuestions(updatedQuestions);
    }

    // 모든 경우에 사용자 선택을 저장
    handleInputedAnswer(selectedOption);
  };

  // 선택된 답변 userSelections에 저장
  const handleInputedAnswer = (inputData) => {
    const field = questions[currentQuestionIndex].field;
    setUserSelections((prev) => ({
      ...prev,
      [field]: inputData,
    }));
  };

  // 진행바 진행률 계산
  const processValue = isQuestionnaireCompleted
    ? 100
    : Math.floor((currentQuestionIndex / (questions.length - 1)) * 100);

  const bodyRef = useRef(null);

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Header />
          <Sticky>
            <ProcessTitle type={"Counseling"} value={processValue} />
          </Sticky>

          <Body id="app-body">
            <div ref={bodyRef}>
              {userAnswers.map((ur, index) => (
                <div key={index}>
                  <PrevQuestionMessageWrapper>
                    {questions[ur.step].question}
                  </PrevQuestionMessageWrapper>
                  <PrevAnswerMessageWrapper>
                    <PrevAnswerMessage>
                      {/* <HightLigint>{ur.response}</HightLigint>에 대해서 고민이 있어 */}
                      <HightLigint>{ur.response}</HightLigint>
                    </PrevAnswerMessage>
                  </PrevAnswerMessageWrapper>
                </div>
              ))}

              {!isQuestionnaireCompleted && showQuestion && (
                <>
                  <MessageContainer ref={scrollContainerRef}>
                    <Content>{questions[currentQuestionIndex].question}</Content>
                    {showOptions && (
                      <>
                        {questions[currentQuestionIndex].type === "multipleChoice" && (
                          // 다중 선택 질문을 위한 UI
                          <AnswersContainer>
                            <Answers>
                              {questions[currentQuestionIndex].options.map(
                                (option, index) => (
                                  <Answer
                                    key={index}
                                    onClick={() => handleSelectedAnswer(option)}
                                  >
                                    <OptionButton
                                      clicked={
                                        userSelections[
                                          questions[currentQuestionIndex].field
                                        ] === option
                                      }
                                    />
                                    {option}
                                  </Answer>
                                )
                              )}
                            </Answers>
                            <Button
                              disabled={!questions[currentQuestionIndex].selected}
                              onClick={() => handleNextStep()}
                            >
                              선택하기
                            </Button>
                          </AnswersContainer>
                        )}
                        {/* 관련된 책 중에 읽어본 책이 있나요?
                      있다 없다 선택지를 주고 있으면 작성할 수 있게 해야하는게 좋아보여
                    */}
                        {questions[currentQuestionIndex].type === "freeText" && (
                          // 자유 응답 질문을 위한 UI
                          <AnswersContainer>
                            <Input
                              placeholder="여기에 답변을 작성하세요."
                              value={
                                userSelections[questions[currentQuestionIndex].field]
                              }
                              onChange={(e) =>
                                handleInputedAnswer(e.target.value)
                              }
                            />
                            <Button
                              disabled={
                                questions[currentQuestionIndex].minLength
                                  ? userSelections[questions[currentQuestionIndex].field]
                                      .length < questions[currentQuestionIndex].minLength
                                  : false
                              }
                              onClick={() => handleNextStep()}
                            >
                              제출하기
                            </Button>
                          </AnswersContainer>
                        )}
                        {questions[currentQuestionIndex].type === "normal" && (
                          <>
                            {" "}
                            <AnswersContainer>
                              정보 요약
                              {userAnswers.map((e, index) => {
                                return <div key={index}>{e.response}</div>;
                              })}
                            </AnswersContainer>
                            <Button onClick={() => handleNextStep()}>
                              {" "}
                              제출하기
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </MessageContainer>
                </>
              )}
            </div>
          </Body>
        </>
      )}
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Sticky = styled.div`
  position: sticky;
  top: 64px;
  background-color: white;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const Body = styled.div`
  padding: 40px 160px 180px;
  background-color: #dce9ec;
  /* min-height: 700px; */
  min-height: 90vh;
  height: auto;
  /* height: 100%; */
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
  animation: ${fadeIn} 1s ease-out;
`;

const HightLigint = styled.span`
  font-weight: bold;
`;

const PrevAnswerMessage = styled.div`
  max-width: 80%;
  background-color: #a4d6dd;
  padding: 20px;
  border-radius: 16px 4px 16px 16px;
`;

const MessageContainer = styled.div`
  width: 400px;
  /* width:100%; */
  padding: 20px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  border-radius: 4px 16px 16px;
  animation: ${fadeIn} 1s ease-out;
`;

const Content = styled.p`
  font-size: 20px;
  font-weight: bold;
  animation: ${fadeIn} 1.5s ease-out;
`;

const expand = keyframes`
  from {
    max-height: 0;
  }
  to {
    max-height: 400px;
  }
`;

const reduce = keyframes`
  from {
    max-height: 450px;
  }
  to {
    max-height: 100px;
  }
`;

const AnswersContainer = styled.div`
  width: 100%;
  animation: ${expand} 0.5s ease-out forwards;
  /* animation: ${(props) => (props.expanded ? expand : reduce)} 0.5s ease-out */
`;

const Answers = styled.ul`
  width: 100%;
  max-height: 300px;
  margin-top: 20px;
  margin-bottom: 20px;

  // 스크롤바가 안보이지만 스크롤 가능
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리 등 WebKit 기반 브라우저용 */
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 및 엣지(구버전)용 */
  scrollbar-width: none; /* 파이어폭스용 */
  animation: ${fadeIn} 1.5s ease-out;
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

const Input = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 4px;
  font-size: 16px;
  font-family: var(--basic-font);
  color: #323232;
  border: 2px solid #e1e1e1e1;
  padding: 0.75rem;
  &:focus {
    outline: none;
    border: 2px solid #c8edf2;
  }
  resize: none;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none
  }
  -ms-overflow-style:none;
  scrollbar-width:none;
`;

const StyledOptionButton = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
