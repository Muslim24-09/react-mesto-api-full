import React, { useContext, useEffect, useState } from "react";
import { PopupWithForm } from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
// import {formValidator} from '../utils/formValidator.js';

export const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [valid, setValid] = useState(false)
	const [errorMessageProfileName, setErrorMessageProfileName] = useState('')
	const [errorMessageProfileAbout, setErrorMessageProfileAbout] = useState('')

	// Подписка на контекст
const currentUser = useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser, isOpen]);

const handleSubmit = (e) => {
	e.preventDefault();
	onUpdateUser({
		name,
		about: description,
	})
}

const handleClose = () => {
  setName(currentUser.name);
  setDescription(currentUser.about)
	setValid(false)
	setErrorMessageProfileName('')
	setErrorMessageProfileAbout('')
	onClose()
}

const handleInput = (e) => {
	if (e.target.name === 'name') {
		if (!e.target.validity.valid) {
			setValid(false)
			setErrorMessageProfileName(e.target.validationMessage)
		} else {
			setErrorMessageProfileName('')
		}

	} else if (e.target.name === 'about') {
		if (!e.target.validity.valid) {
			setValid(false)
			setErrorMessageProfileAbout(e.target.validationMessage)
		} else {
			setErrorMessageProfileAbout('')
		}
	}	else if(!name || !description) {
		setValid(false)
	} 

	if (e.target.closest('form').checkValidity()) {
		setValid(true)
	}
}

		return (
		<PopupWithForm
			name={'popup-profile'}
			valid={valid}
			isOpen={isOpen}
			onClose={handleClose}
			btnName={'Сохранить'}
			onSubmit={handleSubmit}
			title={'Редактировать профиль'}  >
			<label className="form__field">
				<input type="text" name="name" id='username' required placeholder="Имя"
					className="form__input form__input_type_name" minLength="2" maxLength="40" noValidate onInput={(ev) => handleInput(ev)} onChange={(ev) => setName(ev.target.value)} value={name || ''} />
				<span className="form__error form__input-username-error">{errorMessageProfileName}</span>
			</label>
			<label className="form__field">
				<input type="text" id='about' name="about" required placeholder="Деятельность"
					className="form__input form__input_type_about" minLength="2" maxLength="200" noValidate onInput={(ev) => handleInput(ev)} onChange={(ev) => setDescription(ev.target.value)} value={description || ''} />
				<span className="form__error form__input-about-error">{errorMessageProfileAbout}</span>
			</label>
		</PopupWithForm>
	)
}
