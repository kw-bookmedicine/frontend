import React from "react";
import BaseModal from "./BaseModal"; // 공통 모달 컴포넌트(로그인, 삭제)
import S from "./Modal.styled";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <BaseModal
      show={isOpen}
      onClose={onClose}
      title="작성하신 글을 삭제 하시겠어요?"
    >
      <S.ModalFooter>
        <S.CancelButton onClick={onClose}>아니요</S.CancelButton>
        <S.ConfirmButton onClick={onConfirm}>네, 삭제할래요</S.ConfirmButton>
      </S.ModalFooter>
    </BaseModal>
  );
};

export default ConfirmModal;
