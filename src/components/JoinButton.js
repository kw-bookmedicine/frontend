const JoinButton = ({ text, type }) => {
	const btnType = ['agree', 'select'].includes(type) ? type : 'default';

	return (
		<button className={['Btn_agree', `Btn_${btnType}`].join(' ')}>
			{text}
		</button>
	);
};

export default JoinButton;
