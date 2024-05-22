import React from "react";
import S from "./Modal.styled"; // 스타일 임포트
import BaseModal from "./BaseModal";

const LoginErrorModal = ({ show, onClose }) => {
  return (
    <BaseModal show={show} onClose={onClose} title="로그인 실패">
      <p>아이디 또는 비밀번호를 잘못 입력했습니다.</p>
      <p>입력하신 내용을 다시 확인해주세요.</p>
      <S.ModalFooter>
        <S.CloseButton onClick={onClose}>확인</S.CloseButton>
      </S.ModalFooter>
    </BaseModal>
  );
};

export default LoginErrorModal;
