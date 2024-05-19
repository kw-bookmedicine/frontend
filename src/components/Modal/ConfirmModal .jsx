import React from "react";
import styles from "../../styles/Modal/ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>작성하신 글을 삭제 하시겠어요?</p>
        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelBtn}>
            아니요
          </button>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            네, 삭제할래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
