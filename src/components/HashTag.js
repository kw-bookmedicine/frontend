import React from 'react';

// STYLES
import '../styles/HashTag.css';

const HashTag = ({ text, type, onClick }) => {
	let tagType = ['sm-category', 'interest', 'keyword'].includes(type)
		? type
		: 'default';

	const renderTag = (type) => {
		if (type === 'interest') {
			return (
				<button className={`Tag-${tagType}`} onClick={onClick}>
					{text}{' '}
				</button>
			);
		} else {
			return <button className={`Tag-${tagType}`}>#{text}</button>;
		}
	};

	return renderTag(tagType);
};

HashTag.defaultProps = {
	type: 'default',
};

export default HashTag;
