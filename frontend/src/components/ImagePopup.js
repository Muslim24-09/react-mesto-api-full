export const ImagePopup = ({ card, onClose }) => (
		<div className={Object.keys(card).length !== 0 ? "popup popup_blackout popup_opened" : 'popup popup_blackout'} id="popup-pictures" onClick={onClose}>
			<div className="popup__container popup__container_pictures">
				<button type="button" className="popup__close-button popup__close-button_pictures"></button>
				<img className="popup__pictures" src={card.link} alt={card.name} />
				<p className="popup__pictures-title">{card.name}</p>
			</div>
		</div>
	)
