import React from 'react';
import reactDom from 'react-dom';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
	// const el = document.getElementById('modal');
	// return reactDom.createPortal(children, el);
	return createPortal(<>{children}</>, document.getElementById('modal'));
};

export default Portal;
