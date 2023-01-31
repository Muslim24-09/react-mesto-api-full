import React, { useContext } from "react";
import { Card } from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export const Main = ({
	onEditProfile,
	onAddPlace,
	onEditAvatar,
	onCardClick,
	cards,
	onCardLike,
	onDeleteCard }) => {

	// подписка на контекст
	const user = useContext(CurrentUserContext)

	return (
		<main className="content">
			<section className="profile">
				<button type='button' className="profile__avatar-btn" title='Редактировать аватар' onClick={onEditAvatar}>
					<img className="profile__avatar" src={user.avatar} alt="аватар профиля" />
				</button>
				<div className="profile__info">
					<h1 className="profile__name">{user.name}</h1>
					<button type="button" className="profile__edit-button" title='Редактировать профиль' onClick={onEditProfile}></button>
					<p className="profile__about">{user.about}</p>
				</div>
				<button type="button" className="profile__add-button" title='Добавить новую карточку' onClick={onAddPlace}></button>
			</section>
			<section className="elements elements-wrapper">
				{
					cards.map(card => (
						<Card
							card={card}
							key={card._id}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onDeleteCard={onDeleteCard} />
					))
				}
			</section>
		</main>
	)
}