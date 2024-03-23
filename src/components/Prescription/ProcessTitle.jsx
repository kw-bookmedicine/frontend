import React from 'react';
import { Link } from 'react-router-dom';

// STYLES
import '../../styles/Counseling/ProcessTitle.css';

const ProcessTitle = ({ type }) => {
	let processTitleType = ['process'].includes(type) ? type : 'default';

	return <div className="process_title_wrapper"></div>;
};

export default ProcessTitle;
