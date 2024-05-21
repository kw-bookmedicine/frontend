import styled from "styled-components";

const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: white;
  padding-top: 40px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 20px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ModalContent = styled.div`
  font-size: 16px;
  color: #666666;
  line-height: 30px;
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const CloseButton = styled.button`
  border: none;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  background: var(--primary-color);
  margin-top: 20px;
  margin-bottom: -20px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #e0e0e0;
  color: black;
  border: none;
  width: 30%;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  background: #c8edf2;
  color: black;
  border: none;
  width: 50%;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

const S = {
  ModalLayout,
  ModalContainer,
  ModalTitle,
  ModalContent,
  ModalFooter,
  CloseButton,
  CancelButton,
  ConfirmButton,
};

export default S;
