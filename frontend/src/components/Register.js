import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Sign } from "./Sign";

export const Register = ({ onRegister }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const messageIsRegistered = (
		<div className="auth__signup">
			<p className="auth__signup_text">Уже зарегистрированы?</p>
			<Link to="sign-in" className="auth__signup_link">
				Войти
			</Link>
		</div>
	)

	const handleChangeEmail = (e) => {
		setEmail(e.target.value)
	}
	const handleChangePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onRegister({ email, password })
	}

	return (
		<Sign
			btnClassName={"auth__form-submit-btn auth__form-submit-btn_size"}
			title={'Регистрация'}
			btnText={'Зарегистрироваться'}
			onSubmit={handleSubmit}
			messageIsRegistered={messageIsRegistered}
		>
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