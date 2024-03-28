import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import literatureIcon from "../assets/myworry-category-literature.png";

const MyWorry = () => {
  return (
    <>
      <Header />
      <Title />
      <StyledContainer>
        <Select />
        <Items />
      </StyledContainer>
    </>
  );
};

export default MyWorry;

const Title = () => {
  return <StlyedTitle>내가 등록한 증상</StlyedTitle>;
};

const Select = () => {
  return (
    <>
      <StlyedSelect name="symptomStatus" id="symptom-status-select">
        <option value="all">전체보기</option>
        <option value="success">처방 성공</option>
        <option value="inProgress">처방중</option>
        <option value="failed">처방 실패</option>
      </StlyedSelect>
    </>
  );
};

const Items = () => {
  const registrationDate = "2000.00.00";
  const prescriptionCount = 10;

  return (
    <>
      <StyledUl>
        {Array.from({ length: 9 }, (_, index) => {
          return (
            <StyledLi key={index}>
              <ItemContainer>
                <ItemBigCategory>
                  <ItemCategoryIcon
                    src={literatureIcon}
                    alt="카테고리 아이콘"
                  />
                  <div>문학</div>
                </ItemBigCategory>
                <ItemTitle>
                  <h2>“새로운 곳에 적응하기 힘들어요”</h2>
                </ItemTitle>
              </ItemContainer>

              <ItemInfo>
                <div>처방전 갯수: {prescriptionCount}개</div>
                <div>{registrationDate}</div>
              </ItemInfo>
            </StyledLi>
          );
        })}
      </StyledUl>
    </>
  );
};

const StlyedTitle = styled.nav`
  height: 55px;
  font-size: 24px;
  text-align: center;
  line-height: 55px;
  font-weight: bold;
  box-shadow: 0px 2px 4px #00000040;
`;

const StyledContainer = styled.main`
  max-width: 1114px;
  padding: 90px 0px;
  margin: 0 auto;
`;

const StlyedSelect = styled.select`
  border: none;
  width: 140px;
  height: 30px;
  font-weight: bold;
  font-size: 24px;
  outline: none;
  margin-bottom: 50px;
`;

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-wrap: wrap;
  gap: 30px;
`;

const StyledLi = styled.li`
  width: 350px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 10px 10px 26px #00000040;
`;

const ItemContainer = styled.div`
border-top-left-radius:10px;
border-top-right-radius:10px;
  height: 260px;
  background: transparent linear-gradient(180deg, #a4c4dd 0%, #dce9ec 100%) 0%
    0% no-repeat padding-box;
  padding: 15px 20px 0px 20px;
`;

const ItemBigCategory = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const ItemCategoryIcon = styled.img`
  margin-right: 10px;
`;

const ItemTitle = styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 20px;
  font-weight: bold;
`;

const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  height: 40px;
  color: #868686;
`;

