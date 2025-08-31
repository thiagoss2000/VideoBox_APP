import styled from "styled-components";

export const AuthContainer = styled.div`
	width: 100%;
	height: 100vh;
	background: #121212;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const AuthBox = styled.div`
	background: #1e1e1e;
	padding: 30px;
	border-radius: 12px;
	width: 100%;
	max-width: 350px;
	display: flex;
	flex-direction: column;
	gap: 14px;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);

	h1 {
		text-align: center;
		color: #c0c0c0;
		margin-bottom: 10px;
	}

	input {
		padding: 10px;
		border-radius: 6px;
		border: 1px solid #373737;
		background: #2a2a2a;
		color: #fff;
		font-size: 14px;

		&:focus {
		outline: none;
		border: 1px solid #1b4eae;
		}
	}

	button {
		background: #1b4eae;
		color: #fff;
		border: none;
		padding: 10px;
		border-radius: 6px;
		font-size: 15px;
		cursor: pointer;
		transition: 0.2s;

		&:hover {
		opacity: 0.9;
		}
	}

	.error {
		color: red;
		font-size: 13px;
		text-align: center;
	}

	.redirect {
		color: #c0c0c0;
		font-size: 13px;
		text-align: center;

		span {
		color: #1b4eae;
		cursor: pointer;
		font-weight: bold;

		&:hover {
			text-decoration: underline;
		}
		}
	}
`;
