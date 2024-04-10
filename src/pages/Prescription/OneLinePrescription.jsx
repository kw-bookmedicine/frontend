import React, { useState } from 'react';

// SERVICES
import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import PrescriptionCard from '../../components/Prescription/PrescriptionCard';

// STYLE
import '../../styles/Prescription/OneLinePrescription.css';

const OneLinePrescription = () => {
	const [iconUrl, setIconUrl] = useState('/icon/white_search_icon.svg');

	const [iconClick, setIconClick] = useState(false);

	const handleIconUrl = async () => {
		if (!iconClick) {
			setIconUrl('/icon/active_search_icon.svg');
		} else {
			setIconUrl('/icon/white_search_icon.svg');
		}
	};

	return (
		<>
			<Header />
			<section>
				<div className="OneLinePrscr_content">
					<div className="OneLinePrscr_title_wrapper">
						<p>한 줄 처방</p>
					</div>
					<div className="OneLinePrscr_container">
						<div className="OneLinePrscr_search_wrapper">
							<form action="" className="cnsSearchBar_wrapper">
								<img
									src={iconUrl}
									alt="검색"
									id="cnsSearch_icon"
									onClick={() => {
										handleIconUrl();
										setIconClick(!iconClick);
										let searchBar = document.querySelector(
											'.cnsSearchBar_wrapper',
										);
										let searchBarText =
											document.getElementById('cnsSearch_text');
										searchBar.classList.toggle('searchBar-visible');
										searchBarText.classList.toggle('searchBar-visible');
									}}
								/>
								<input
									type="text"
									id="cnsSearch_text"
									placeholder="검색어를 입력해주세요"
								/>
							</form>
						</div>
						<div className="OneLinePrscr_card_container">
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default OneLinePrescription;
