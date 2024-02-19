import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DropDown.css';
import useDetectClose from '../hooks/useDetectClose';

const DropDown = ({ DropDownTitle }) => {
	const dropDownRef = useRef(null);
	const dropDownMenuRef = useRef(null);

	// 드롭다운 메뉴 리스트 상태
	const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

	// 메뉴 리스트 아이템 상태
	const [isSelect, setIsSelect] = useDetectClose(dropDownMenuRef, false);
	const [selectTitle, setSelectTitle] = useState('');

	return (
		<div className="dropDown_menu">
			<button
				className="dropDown_menu_button"
				onClick={() => {
					setIsOpen(!isOpen);
					setIsSelect(!isSelect);
				}}
			>
				{selectTitle !== '' ? selectTitle : DropDownTitle}
			</button>

			<ul
				ref={dropDownRef}
				className={isOpen ? 'dropDown_menu_list_active' : 'dropDown_menu_list'}
			>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('학생');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					학생
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('직장인');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					직장인
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('자영업');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					자영업
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('프리랜서');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					프리랜서
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('무직');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					무직
				</li>
			</ul>
		</div>
	);
};

export default DropDown;
