import '../styles/HashTag.css';

const HashTag = ({ text, type }) => {
	let tagType = ['sm-category'].includes(type) ? type : 'default';

	return <button className={`Tag-${tagType}`}>#{text}</button>;
};

HashTag.defaultProps = {
	type: 'default',
};

export default HashTag;
