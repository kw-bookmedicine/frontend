import React, { useEffect, useReducer, useRef, useState } from "react";
import Header from "./../../components/Header";
import styled, { keyframes } from "styled-components";

// ASSET

// COMPONENTS
import ProcessTitle from "./../../components/Prescription/ProcessTitle";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

// 화면이 크기가 줄어들지 않게 고정하기
// 로딩 후 화면 전환 추가
// 사용자에게 받은 정보를 보여주는 임의 페이지로 라우팅하기
// 수정할 수 있게 스크롤 이벤트 추가

// 1. 컴포넌트
// 2. 변수를 어떻게 관리하는게 좋을까?

// 액션 타입 정의
const ActionTypes = {
  SET_CURRENT_QUESTION_INDEX: "SET_CURRENT_QUESTION_INDEX",
  SET_USER_ANSWERS: "SET_USER_ANSWERS",
  SET_IS_QUESTIONNAIRE_COMPLETED: "SET_IS_QUESTIONNAIRE_COMPLETED",
  SET_SHOW_QUESTION: "SET_SHOW_QUESTION",
  SET_SHOW_OPTIONS: "SET_SHOW_OPTIONS",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_USER_SELECTIONS: "SET_USER_SELECTIONS",
  SET_QUESTIONS: "SET_QUESTIONS",
};

// 액션 생성자
const actionCreators = {
  setCurrentQuestionIndex: (index) => ({
    type: ActionTypes.SET_CURRENT_QUESTION_INDEX,
    payload: index,
  }),
  setUserAnswers: (answers) => ({
    type: ActionTypes.SET_USER_ANSWERS,
    payload: answers,
  }),
  setIsQuestionnaireCompleted: (isCompleted) => ({
    type: ActionTypes.SET_IS_QUESTIONNAIRE_COMPLETED,
    payload: isCompleted,
  }),
  setShowQuestion: (show) => ({
    type: ActionTypes.SET_SHOW_QUESTION,
    payload: show,
  }),
  setShowOptions: (show) => ({
    type: ActionTypes.SET_SHOW_OPTIONS,
    payload: show,
  }),
  setIsLoading: (isLoading) => ({
    type: ActionTypes.SET_IS_LOADING,
    payload: isLoading,
  }),
  setUserSelections: (selections) => ({
    type: ActionTypes.SET_USER_SELECTIONS,
    payload: selections,
  }),
  setQuestions: (questions) => ({
    type: ActionTypes.SET_QUESTIONS,
    payload: questions,
  }),
};

// 리듀서 함수
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_QUESTION_INDEX:
      return { ...state, currentQuestionIndex: action.payload };
    case ActionTypes.SET_USER_ANSWERS:
      return { ...state, userAnswers: action.payload };
    case ActionTypes.SET_IS_QUESTIONNAIRE_COMPLETED:
      return { ...state, isQuestionnaireCompleted: action.payload };
    case ActionTypes.SET_SHOW_QUESTION:
      return { ...state, showQuestion: action.payload };
    case ActionTypes.SET_SHOW_OPTIONS:
      return { ...state, showOptions: action.payload };
    case ActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.SET_USER_SELECTIONS:
      return {
        ...state,
        userSelections: { ...state.userSelections, ...action.payload },
      };
    case ActionTypes.SET_QUESTIONS:
      return { ...state, questions: action.payload };
    default:
      return state;
  }
};

const apiEndpointMap = {
  건강: "Health",
  "자녀/양육": "Children_Parenting",
  취업: "Employment_Career",
  "문제집/수험서": "Workbook_Examination",
  "관계/소통": "Relationships_Communication",
  "소셜/에세이": "Fiction_Essays",
  철학: "Philosophy",
  역사: "History",
  "수학/과학/공학": "Science_Math_Engineering",
  사회: "Society",
  취미: "Hobbies",
  기타: "ETC",
  "경제/경영": "Economy_Management",
};

const WorryWrite = () => {
  // 초기 상태
  const initialState = {
    currentQuestionIndex: 0, // 현재 질문 단계
    userAnswers: [], // 사용자의 답변 저장
    isQuestionnaireCompleted: false, // 질문 완료 여부
    showQuestion: true, // 질문 딜레이 적용(애니메이션)
    showOptions: false, // 질문 옵션과 버튼을 보여줄지 여부(애니메이션)
    isLoading: false, // 로딩

    userSelections: {
      // 사용자의 답변
      keywordConcern: "",
      primaryConcern: "",
      secondaryConcern: "",
      // relatedBooksRead: "", // 검색 컴포넌트 있으면 좋을듯
      description: "",
      summary: "",
    },
    questions: [
      // 질문 리스트

      {
        field: "keywordConcern",
        question: "현재 가지고 있는 고민은 무엇인가요?",
        options: [],
        selected: false,
        type: "multipleChoice",
      },

      {
        field: "Question1",
        question: "",
        options: [],
        selected: false,
        type: "multipleChoice",
      },
      {
        field: "Question2",
        question: "",
        options: [],
        selected: false,
        type: "multipleChoice",
      },
      {
        field: "Question3",
        question: "",
        options: [],
        selected: false,
        type: "multipleChoice",
      },
      {
        field: "Question4",
        question: "",
        options: [],
        selected: false,
        type: "multipleChoice",
      },
      {
        field: "Question5",
        question: "",
        options: [],
        selected: false,
        type: "multipleChoice",
      },
      // {
      //   field: "relatedBooksRead",
      //   question: "고민과 관련된 읽어본 책 있으면 적어주세요.",
      //   type: "freeText",
      //   minLength: 1,
      // },
      {
        field: "title",
        question: "어떤 고민에 대해 이야기하고 싶은지 제목을 적어주세요.",
        minLength: 1,
        type: "freeText",
      },
      {
        field: "description",
        question:
          "AI 처방을 위해서 고민에 대한 키워드를 포함해서 작성해주세요!(최소 10자 이상 써주세요)",
        minLength: 10,
        type: "freeText",
      },
      {
        field: "summary",
        question: "지금 고민에 대한 처방전을 받아보세요.",
        type: "normal",
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    currentQuestionIndex,
    userAnswers,
    isQuestionnaireCompleted,
    showQuestion,
    showOptions,
    isLoading,
    userSelections,
    questions,
  } = state;

  useEffect(() => {
    const fetchKeywordQuestion = async () => {
      const response = await api.get(`/api/boardKeyword/keyword`, {
        withCredentials: true,
      });
      const options = response.data;

      const updatedQuestions = questions.map((question) =>
        question.field === "keywordConcern"
          ? { ...question, options: options }
          : question
      );
      dispatch(actionCreators.setQuestions(updatedQuestions));
    };
    fetchKeywordQuestion();
  }, []);

  const updateQuestions = async (selectedOption, existingQuestions) => {
    const apiEndpointSuffix = apiEndpointMap[selectedOption];

    if (apiEndpointSuffix) {
      const apiUrl = `/api/boardKeyword/distractor/${apiEndpointSuffix}`;
      const response = await api.get(apiUrl);
      const categoryQuestions = response.data;

      const newQuestions = existingQuestions.map((question, index) => {
        const questionField = `Question${index}`;
        const categoryQuestion = categoryQuestions[index];

        if (question.field === questionField && categoryQuestion) {
          return {
            ...question,
            question: categoryQuestion.question,
            options: categoryQuestion.distractor,
            selected: false,
            type: "multipleChoice",
          };
        } else if (question.field === questionField) {
          return {
            ...question,
            options: [],
          };
        }
        return question;
      });

      dispatch(actionCreators.setQuestions(newQuestions));
    } else {
      // Reset questions if new option is not valid
      const resetQuestions = existingQuestions.map((question, index) => {
        const questionField = `Question${index + 1}`;
        if (question.field === questionField) {
          return {
            ...question,
            question: "추가 질문을 선택해주세요",
            options: [],
            selected: false,
            type: "multipleChoice",
          };
        }
        return question;
      });
      dispatch(actionCreators.setQuestions(resetQuestions));
    }
  };

  useEffect(() => {
    // 사용자가 선택한 답변에 따라 해당 함수를 호출합니다.
    if (userSelections.keywordConcern) {
      updateQuestions(userSelections.keywordConcern, questions);
    }
  }, [userSelections.keywordConcern]);

  // 질문지 1초후 보이도록 적용
  useEffect(() => {
    dispatch(actionCreators.setShowOptions(false)); // 새로운 질문이 로드될 때마다 옵션을 숨김
    const timer = setTimeout(() => {
      dispatch(actionCreators.setShowOptions(true));
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // showOptions와 currentQuestionIndex 변경 시, 자동 스크롤 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showOptions && currentQuestionIndex >= 1) {
        scrollToElement();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [showOptions, currentQuestionIndex]);

  //  답변 이후 0.5초 후 질문 제목 등장
  useEffect(() => {
    dispatch(actionCreators.setShowQuestion(false));
    const timer = setTimeout(() => {
      dispatch(actionCreators.setShowQuestion(true));
    }, 500);
    return () => clearTimeout(timer);
  }, [userAnswers]);

  // 다음 질문으로 이동 및 현재 userResponse 정보 업데이트
  const handleNextStep = (otherText) => {
    // 현재 field 가져오기
    const currentField = questions[currentQuestionIndex].field;
    let response = userSelections[currentField];

    // '기타' 옵션이 선택된 경우, otherText 사용
    if (response === "기타") {
      response = otherText;
    }

    dispatch(
      actionCreators.setUserAnswers([
        ...userAnswers,
        { step: currentQuestionIndex, response },
      ])
    );
    const titleFieldIndex = state.questions.findIndex(
      (question) => question.field === "title"
    );

    if (currentQuestionIndex < questions.length - 1) {
      // 질문지가 빈배열이면 relatedBookRead 질문으로 이동함
      if (questions[currentQuestionIndex + 1].options?.length === 0) {
        dispatch(actionCreators.setCurrentQuestionIndex(titleFieldIndex));
      } else {
        dispatch(
          actionCreators.setCurrentQuestionIndex(currentQuestionIndex + 1)
        );
      }
    } else {
      dispatch(actionCreators.setIsQuestionnaireCompleted(true));
      // dispatch(actionCreators.setIsLoading(true));
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
      dispatch(actionCreators.setQuestions(updatedQuestions));
      // setQuestions(updatedQuestions);
    }

    // 모든 경우에 사용자 선택을 저장
    handleInputedAnswer(selectedOption);
  };

  // 선택된 답변 userSelections에 저장
  const handleInputedAnswer = (inputData) => {
    const field = questions[currentQuestionIndex].field;
    dispatch(actionCreators.setUserSelections({ [field]: inputData }));
  };

  // 진행바 진행률 계산
  const processValue = isQuestionnaireCompleted
    ? 100
    : Math.floor((currentQuestionIndex / (questions.length - 1)) * 100);

  // 스크롤을 적용할 요소를 위한 ref 생성
  const scrollContainerRef = useRef(null);

  const scrollToElement = () => {
    if (scrollContainerRef.current) {
      const elementRect = scrollContainerRef.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middleOfElement = absoluteElementTop - window.innerHeight / 3;

      window.scrollTo({
        top: middleOfElement,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header />
      <Sticky>
        <ProcessTitle type={"Counseling"} value={processValue} />
      </Sticky>

      <Body id="app-body">
        <SurveyWrapper>
          {userAnswers.map((ur, index) => (
            <div key={index}>
              <PrevQuestionMessageWrapper>
                {questions[ur.step].question}
              </PrevQuestionMessageWrapper>
              <PrevAnswerMessageWrapper>
                <PrevAnswerMessage>
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
                    {questions[currentQuestionIndex].type ===
                      "multipleChoice" && (
                      // 다중 선택 질문을 위한 UI
                      <SelectOptions
                        question={questions[currentQuestionIndex]}
                        handleSelectedAnswer={handleSelectedAnswer}
                        userSelections={userSelections}
                        handleNextStep={handleNextStep}
                        handleInputedAnswer={handleInputedAnswer}
                      />
                    )}
                    {/* 관련된 책 중에 읽어본 책이 있나요?
                      있다 없다 선택지를 주고 있으면 작성할 수 있게 해야하는게 좋아보여
                    */}
                    {questions[currentQuestionIndex].type === "freeText" && (
                      // 자유 응답 질문을 위한 UI
                      <FreeTextAnswer
                        question={questions[currentQuestionIndex]}
                        userSelections={userSelections}
                        handleInputedAnswer={handleInputedAnswer}
                        handleNextStep={handleNextStep}
                      />
                    )}
                    {questions[currentQuestionIndex].type === "normal" && (
                      <NormalQuestion
                        state={state}
                        userAnswers={userAnswers}
                        handleNextStep={handleNextStep}
                        dispatch={dispatch}
                      />
                    )}
                  </>
                )}
              </MessageContainer>
            </>
          )}
        </SurveyWrapper>
      </Body>
      <div style={{ height: "10vh", backgroundColor: "#dce9ec" }}></div>
    </>
  );
};

export default WorryWrite;

// 답변 선택 옵션 컴포넌트
const SelectOptions = ({
  question,
  handleSelectedAnswer,
  userSelections,
  handleNextStep,
  handleInputedAnswer,
}) => {
  // '기타' 옵션을 위한 로컬 상태 추가
  const [otherText, setOtherText] = useState("");

  // 옵션이 기타인지 확인
  const isOtherSelected = userSelections[question.field] === "기타";

  const answersRef = useRef(null);

  // '기타' 입력 처리 함수
  const handleOtherInputChange = (event) => {
    setOtherText(event.target.value);
  };

  // '기타' 제출 처리
  const handleOtherSubmit = () => {
    if (isOtherSelected) {
      handleInputedAnswer(otherText); // '기타' 입력값을 userSelections에 저장
      handleNextStep(otherText);
    }
  };

  useEffect(() => {
    if (isOtherSelected && answersRef.current) {
      answersRef.current.scrollTop = answersRef.current.scrollHeight; // 스크롤을 최대로 설정
    }
  }, [isOtherSelected]);

  return (
    <AnswersContainer>
      <Answers ref={answersRef}>
        {question.options.map((option, index) => (
          <Answer key={index} onClick={() => handleSelectedAnswer(option)}>
            <OptionButton clicked={userSelections[question.field] === option} />
            {option}
          </Answer>
        ))}
        {isOtherSelected && (
          <Input
            placeholder="여기에 답변을 작성하세요."
            value={otherText}
            onChange={handleOtherInputChange}
          />
        )}
      </Answers>

      <Button
        disabled={
          !isOtherSelected ? !question.selected : otherText.trim() === ""
        }
        onClick={isOtherSelected ? handleOtherSubmit : handleNextStep}
      >
        선택하기
      </Button>
    </AnswersContainer>
  );
};

// 자유 형식의 답변 컴포넌트
const FreeTextAnswer = ({
  question,
  userSelections,
  handleInputedAnswer,
  handleNextStep,
}) => {
  const maxLength = 1000;

  return (
    <AnswersContainer>
      <Input
        placeholder="여기에 답변을 작성하세요."
        value={userSelections[question.field]}
        onChange={(e) => handleInputedAnswer(e.target.value)}
        maxLength={maxLength} // textarea 글자수 제한
      />
      <Button
        disabled={
          question.minLength
            ? userSelections[question.field]?.length < question?.minLength
            : false
        }
        onClick={handleNextStep}
      >
        제출하기
      </Button>
    </AnswersContainer>
  );
};

// 정규 질문 타입에 대한 컴포넌트
const NormalQuestion = ({ state, userAnswers, handleNextStep, dispatch }) => {
  const postData = createDataObject(state);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/api/board/new", postData, {
        withCredentials: true,
      });
      console.log("Response:", response);
      // alert("데이터가 성공적으로 전송되었습니다!");
      dispatch(actionCreators.setIsLoading(true));
      navigate("/counseling");
      // navigate("/loading");
    } catch (error) {
      console.error("Error posting data:", error);
      alert("데이터 전송에 실패했습니다.");
      dispatch(actionCreators.setIsLoading(false));
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <AnswersContainer>
        {/* <div style={{ marginBottom: "10px" }}>
          {userAnswers.map((e, index) => (
            <div key={index}>{e.response}</div>
          ))}
        </div> */}
        <div style={{ marginBottom: "20px" }}></div>
      </AnswersContainer>
      <Button
        onClick={() => {
          handleSubmit();
          // handleNextStep();
        }}
      >
        제출하기
      </Button>
    </>
  );
};

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

const createDataObject = (state) => {
  const { questions, userAnswers } = state;

  // Exclude the last question which is the summary
  const relevantQuestions = questions
    .slice(0, -1)
    .filter((q) => q.question.trim() !== "");

  const answers = relevantQuestions.map((question, index) => {
    const answer = userAnswers.find((ans) => ans.step === index);
    return {
      question: question.question,
      answer: answer && answer.response ? answer.response : "없음",
    };
  });

  // Extract specific information based on the field
  const keywordIndex = relevantQuestions.findIndex(
    (q) => q.field === "keywordConcern"
  );
  const keywordResponse =
    keywordIndex !== -1 && userAnswers[keywordIndex]
      ? userAnswers[keywordIndex].response
      : "ETC";
  const keyword = apiEndpointMap[keywordResponse] || "ETC";

  const titleIndex = relevantQuestions.findIndex((q) => q.field === "title");
  const title =
    titleIndex !== -1 && userAnswers[titleIndex]
      ? userAnswers[titleIndex].response
      : "No title provided";

  const descriptionIndex = relevantQuestions.findIndex(
    (q) => q.field === "description"
  );
  const description =
    descriptionIndex !== -1 && userAnswers[descriptionIndex]
      ? userAnswers[descriptionIndex].response
      : "No description provided";

  const data = {
    title: title,
    description: description,
    keyword: keyword,
    answers: answers,
  };

  return data;
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Sticky = styled.div`
  position: sticky;
  top: 64px;
  z-index: 999;
  background-color: white;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;
`;

const Body = styled.div`
  padding: 40px 160px 180px;
  background-color: #dce9ec;
  min-height: 90vh;
  height: auto;
`;

const SurveyWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
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
  word-wrap: break-word;
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
  word-wrap: break-word;
  word-break: break-all;
  animation: ${expand} 0.5s ease-out forwards;
  /* animation: ${(props) =>
    props.expanded ? expand : reduce} 0.5s ease-out */
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
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledOptionButton = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
