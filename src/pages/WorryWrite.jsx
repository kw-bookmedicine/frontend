import React, { useState } from 'react'
import Header from '../components/Header';
import styled from 'styled-components';

// ASSET

// COMPONENTS
import ProcessTitle from "../components/Prescription/ProcessTitle";

const WorryWrite = () => {
 const [currentStep, setCurrentStep] = useState(0);
 const [userResponses, setUserResponses] = useState([]);
 const [isCompleted, setIsCompleted] = useState(false);

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

 const questions = [
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
 ];

 const handleNextStep = (response) => {
   const field = questions[currentStep].field;
   setUserResponses([...userResponses, { step: currentStep, response }]);
   setUserSelections((prev) => ({
     ...prev,
     [field]: response,
   }));

   if (currentStep < questions.length - 1) {
     setCurrentStep((prev) => prev + 1);
   } else {
     setIsCompleted(true);
   }
 };
 console.log(userResponses, currentStep, userSelections);

  return (
    <>
      <Header />
      <ProcessTitle type={"Counseling"} value={"60"} />
      <Body id="app-body">
        <div className="form-container">
          <div className="request-chat-form">
            {userResponses.map((ur, index) => (
              <div key={index}>
                <MessageContainer style={{fontWeight:"bold",marginBottom:"20px"}}>{questions[ur.step].question}</MessageContainer>
                <p style={{ textAlign: "end", backgroundColor:"white", marginBottom:"20px"}}>
                  <span style={{fontWeight:"bold"}}>{ur.response}</span>에 대해서 고민이 있어
                </p>
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
                        onClick={() => handleNextStep(option)}
                      >
                        {option}
                      </Answer>
                    ))}
                  </Answers>
                  {/* <Button onClick={() => handleNextStep("다음")}>
                    선택하기
                  </Button> */}
                </MessageContainer>
              </>
            )}
          </div>
        </div>
      </Body>
    </>
  );
}

export default WorryWrite;

const Body = styled.div`
  padding: 0px 160px;
  background-color: #dce9ec;
  height: 800px;
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
  border-radius: 10px;
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
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #c8edf2;
  border-radius: 10px;
`;