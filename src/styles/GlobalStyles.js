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

    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'SangSangAnt';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/SangSangAnt.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'HakgyoansimWoojuR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimWoojuR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}


    body{
        line-height: 1;
        font-family: 'Pretendard-Regular', sans-serif;
        /* font-family: var(----basic-font); */
        /* background-color: #fff; */
    }

    ol, ul, li{
        list-style: none;
    }
    
    button {
        border: 0;
        font-family: 'Pretendard-Regular', sans-serif;
        cursor: pointer;
    }
    
    header {
		display: flex;
	position: relative;
	height: 64px;
	border-bottom: 0.5px solid #dfdfdf;
	padding: 0 72px;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    

	/* font */
	font-family: 'GmarketSans';
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
    }
`;

export default GlobalStyles;
