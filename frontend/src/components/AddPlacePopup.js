import { useState } from "react";
import { PopupWithForm } from "./PopupWithForm"

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
	const [name, setName] = useState('');
	const [link, setLink] = useState('');
	const [valid, setValid] = useState(false)
	const [errorMessageName, setErrorMessageName] = useState('')
	const [errorMessageLink, setErrorMessageLink] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddPlace({
			name: name,
			link: link
		})
		setName('')
		setLink('')
		setValid(false)
	}

	const handleClose = () => {
		setName('')
		setLink('')
		setValid(false)
		onClose()
	}

	const handleInput = (e) => {
		if (e.target.name === 'name') {
			if (!e.target.validity.valid) {
				setValid(false)
				setErrorMessageName(e.target.validationMessage)
			} else {
				setErrorMessageName('')
			}
		} else if (e.target.name === 'link') {
			if (!e.target.validity.valid) {
				setValid(false)
				setErrorMessageLink(e.target.validationMessage)
			} else {
				setErrorMessageLink('')
			}
		} else if (!name || !link) {
			setValid(false)
		} 
		
		if (e.target.closest('form').checkValidity()) {
			setValid(true)
		}
	}

	return (
		<PopupWithForm
			name={'popup-action'}
			isOpen={isOpen}
			btnName={'Создать'}
			onClose={handleClose}
			title={'Новое место'}
			onSubmit={handleSubmit}
			valid={valid}
		>
			<label className="form__field">
				<input type="text" name="name" id='name' required placeholder="Название"
					className="form__input form__input_type_title" minLength="2" maxLength="30" value={name} onInput={(ev) => handleInput(ev)} onChange={(e) => setName(e.target.value)} />
				<span className="form__error form__input-name-error">{errorMessageName}</span>
			</label>
			<label className="form__field">
				<input type="url" name="link" id='link' required placeholder="Ссылка на картинку"
					className="form__input form__input_type_link" value={link} onInput={(ev) => handleInput(ev)} onChange={(e) => setLink(e.target.value)} />
				<span className="form__error form__input-link-error">{errorMessageLink}</span>
			</label>
		</PopupWithForm>
	)
}

