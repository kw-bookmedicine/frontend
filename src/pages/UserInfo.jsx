import React from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';

// STYLES
import '../styles/UserInfo.css';

const UserInfo = () => {
	const { page } = useParams();
	console.log(page);

	return (
		<>
			<Header />
		</>
	);
};

export default UserInfo;
