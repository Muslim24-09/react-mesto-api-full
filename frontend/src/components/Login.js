import React, { useState } from "react";
import { Sign } from "./Sign";

export const Login = ({ onLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeEmail = (e) => {
		setEmail(e.target.value)
	}
	const handleChangePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onLogin({ email, password })
	}

	return (
		<Sign
			btnClassName={"auth__form-submit-btn"}
			title={'Вход'}
			btnText={'Войти'}
			onSubmit={handleSubmit}
			messageIsRegistered={<></>} >
			<input
				className="auth__form-input"
				type="email"
				value={email || ''}
				placeholder="Email"
				onChange={handleChangeEmail} />
			<input
				className="auth__form-input"
				type="password"
				value={password || ''}
				placeholder="Пароль"
				onChange={handleChangePassword} />
		</Sign>
	)
}