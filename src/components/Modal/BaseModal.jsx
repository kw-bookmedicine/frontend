import React from "react";
import S from "./Modal.styled"; // 스타일 임포트

const BaseModal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalLayout onClick={handleOverlayClick}>
      <S.ModalContainer>
        <S.ModalTitle>{title}</S.ModalTitle>
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalLayout>
  );
};

export default BaseModal;
