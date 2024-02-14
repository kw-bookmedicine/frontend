import React, { useEffect } from 'react';
import image from '../../assets/naver-icon.jpg';

// STYLES
import '../../styles/Modal2.css';

const MyListModal = ({ onClose }) => {
	const handleClose = () => {
		onClose?.();
	};

	return (
		<>
			<div className="Overlay">
				<div className="ModalWrap">
					<div onClick={handleClose} className="CloseButton">
						X
					</div>
					<div className="Contents">
						<img src={image} alt="smile" />
						<h1>This is a Modal Dialog</h1>
						<div onClick={handleClose} className="Modal2_button">
							Close
						</div>
					</div>
				</div>
			</div>
			;
		</>
	);
};

export default MyListModal;
