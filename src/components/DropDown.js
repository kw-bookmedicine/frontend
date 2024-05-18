import { useRef, useState } from 'react';
import '../styles/DropDown.css';
import useDetectClose from '../hooks/useDetectClose';

const DropDown = ({ DropDownTitle, type, ctgType }) => {
	const dropDownRef = useRef(null);
	const dropDownMenuRef = useRef(null);

	// 드롭다운 메뉴 리스트 상태
	const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

	// 메뉴 리스트 아이템 상태
	const [isSelect, setIsSelect] = useDetectClose(dropDownMenuRef, false);
	const [selectTitle, setSelectTitle] = useState('');

	const setCtg = async (ctg) => {
		// console.log(ctg);
		ctgType(ctg);
	};

	const renderJob = () => {
		return (
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
		);
	};

	const renderCategory = () => {
		return (
			<ul
				ref={dropDownRef}
				className={
					isOpen ? 'dropDown_ctg_menu_list_active' : 'dropDown_ctg_menu_list'
				}
				id="dropDown_ctg_menu"
			>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('관계/소통');
						setCtg('관계/소통');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					관계/소통
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('소설/에세이');
						setCtg('소설/에세이');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					소설/에세이
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('경제/경영');
						setCtg('경제/경영');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					경제/경영
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(isSelect);
						setSelectTitle('자녀/양육');
						setCtg('자녀/양육');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					자녀/양육
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('사회');
						setCtg('사회');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					사회
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('철학');
						setCtg('철학');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					철학
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('건강');
						setCtg('건강');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					건강
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('역사');
						setCtg('역사');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					역사
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('수학/과학/공학');
						setCtg('수학/과학/공학');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					수학/과학/공학
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('문제집/수험서');
						setCtg('문제집/수험서');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					문제집/수험서
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('취업');
						setCtg('취업');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					취업
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('취미');
						setCtg('취미');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					취미
				</li>
				<li
					ref={dropDownMenuRef}
					onClick={() => {
						setIsOpen(!isOpen);
						setIsSelect(!isSelect);
						setSelectTitle('기타');
						setCtg('기타');
					}}
					className={
						isSelect ? 'dropDown_menu_item_select' : 'dropDown_menu_item'
					}
				>
					기타
				</li>
			</ul>
		);
	};

	return (
		<div className={type === 'job' ? 'dropDown_menu' : 'dropDown_ctg_menu'}>
			<button
				className={
					type === 'job' ? 'dropDown_menu_button' : 'dropDown_ctg_menu_button'
				}
				onClick={() => {
					setIsOpen(!isOpen);
					setIsSelect(!isSelect);
				}}
			>
				{selectTitle !== '' ? selectTitle : DropDownTitle}
			</button>
			{type === 'job' ? renderJob() : renderCategory()}
		</div>
	);
};

export default DropDown;
