import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }

    *{
        box-sizing: border-box;
    }

    html, body, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }

    body{
        line-height: 1;
        font-family: 'Pretendard';
        /* background-color: #fff; */
    }

    ol, ul, li{
        list-style: none;
    }
    
    button {
        border: 0;
        cursor: pointer;
    }
    /* Header */

header {
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e2e2e2;
	margin-bottom: 10px;
}

header > div {
	display: flex;
	margin: 10px;
}

`;

export default GlobalStyles;
