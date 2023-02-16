import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({ card, onCardClick, onCardLike, onDeleteCard }) => {

	const user = useContext(CurrentUserContext)
	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = card.owner === user._id;

	// Создаём переменную, которую после зададим в `className` для кнопки удаления
	const cardDeleteButtonClassName = (
		` ${isOwn ? 'element__delete-button' : 'element__delete-button hidden'}`
	);

	const isLiked = card.likes.some(i => i === user._id)
	const cardLikeButtonClassName = (`
	element__like-button ${isLiked ? 'element__like-button_active' : ''}`)

	const handleClick = () => {
		onCardClick(card)
	}

	const handleLike = () => {
		onCardLike(card)
	}
	const handleDeleteClick = () => {
		onDeleteCard(card)
	}

	return (
		<div className="element">
			<img className="element__image" src={card.link} alt={card.name} onClick={() => handleClick()} />
			<div className="element__container">
				<h2 className="element__title">{card.name}</h2>
				<button type="button" className={cardLikeButtonClassName} onClick={() => handleLike()}>
					<p className="element__counter-likes">{card.likes.length}</p>
				</button>
			</div>
			<button type="button" className={cardDeleteButtonClassName} onClick={() => handleDeleteClick()}></button>
		</div>
	)
}