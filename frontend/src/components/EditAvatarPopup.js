import { useRef, useState } from "react";
import { PopupWithForm } from "./PopupWithForm"

export const EditAvatarPopup = ({ onClose, isOpen, onUpdateAvatar }) => {
	const [valid, setValid] = useState(false)
	const [errorMessageAvatar, setErrorMessageAvatar] = useState('')
	const avatarUrl = useRef()

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdateAvatar({
			avatar: avatarUrl.current.value,
		});
		avatarUrl.current.value = '';
		setValid(false)
	}
	const handleClose = () => {
		avatarUrl.current.value = '';
		setValid(false)
		onClose()
	}


	const handleInput = (e) => {
		if (!e.target.validity.valid || avatarUrl.current.value === '') {
			setValid(false)
			setErrorMessageAvatar(e.target.validationMessage)
		} else {
			setErrorMessageAvatar('')
		}
		if (e.target.closest('form').checkValidity()) {
			setValid(true)
		}
	}
	return (
		<PopupWithForm
			name={'popup-change-avatar'}
			isOpen={isOpen}
			onClose={handleClose}
			onSubmit={handleSubmit}
			btnName={'Сохранить'}
			valid={valid}
			title={'Изменить аватар'}   >
			<label className="form__field">
				<input ref={avatarUrl} type="url" name="avatar" id='avatar' required placeholder="Ссылка на аватар"
					className="form__input form__input_type_link" onInput={(ev) => handleInput(ev)} />
				<span className="form__error form__input-avatar-error">{errorMessageAvatar}</span>
			</label>
		</PopupWithForm>
	)
}

