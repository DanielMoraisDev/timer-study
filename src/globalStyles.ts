import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	html {
		scroll-behavior: smooth;
	}

	* {
		margin: 0;
		padding: 0;
	}

	body {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#root {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100vh;
	}
`;
