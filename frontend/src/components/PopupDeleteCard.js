import { PopupWithForm } from "./PopupWithForm"

export const PopupDeleteCard = ({ isOpen, onClose, onDeleteCard }) => {

	const handleSubmit = (e) => {
		e.preventDefault()
		onDeleteCard()
	}
	return (
		<PopupWithForm
			name={'popup-delItem'}
			isOpen={isOpen}
			btnName={'Удалить карточку'}
			onClose={onClose}
			title={'Вы уверены?'}
			onSubmit={handleSubmit}
			valid={true}
		>
		</PopupWithForm>
	)
}