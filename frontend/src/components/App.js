import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from "../utils/api";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { PopupDeleteCard } from "./PopupDeleteCard";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Login";
import { Register } from "./Register";
import { login, register, checkToken } from "../utils/auth";
import { InfoToolTip } from './InfoTooltip';

import successIcon from "../images/success.svg";
import failIcon from "../images/fail.svg";


export const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isPopupDeleteCardOpen, setIsPopupDeleteCardOpen] = useState(false)
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [itemToDelete, setItemToDelete] = useState({})

  const [isSuccessRegister, setIsSuccessRegister] = useState(false)
  const [isSuccessLoggedIn, setIsSuccessLoggedIn] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [email, setEmail] = useState('')
  const [imageSrc, setImageSrc] = useState('')

  const history = useHistory();

  useEffect(() => {
    if (isSuccessLoggedIn) {
      Promise.all([api.getAddingPictures(), api.getUserInfo()])
        .then(([cardsInfo, userInfo]) => {
          setCurrentUser(userInfo)
          setCards(cardsInfo)
        })
        .catch((err) => console.log(err))
    } else return;

  }, [isSuccessLoggedIn])

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    checkToken(token)
      .then((res) => {
        setIsSuccessLoggedIn(true)
        setEmail(res.data.email)
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log("401 — Токен не передан или передан не в том формате");
        }
        console.log("401 — Переданный токен некорректен");
      });

  }, [])


  useEffect(() => {
    if (isSuccessLoggedIn) {
      history.push('/')
    }
  }, [isSuccessLoggedIn, history])

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsPopupDeleteCardOpen(false)
    setSelectedCard({})
    setInfoToolTipOpen(false)
  }

  const closeAllPopupsEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups()
    }
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleUpdateUser = (user) => {
    api.updateUserInfo(user)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateAvatar = (url) => {
    api.updateUserAvatar(url)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i =>  i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => {
          return c._id === card._id ? newCard : c
        }))
      })
      .catch((err) => console.log(err))
  }

  const handleAddPlaceSubmit = (card) => {
// card= {name, link}
    api.addItem(card)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
    card.name = ''

  }

  const handleCardDelete = () => {
    api.removeItem(itemToDelete._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== itemToDelete._id))
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  const handlePopupSubmitOpen = (card) => {
    setItemToDelete(card)
    setIsPopupDeleteCardOpen(true)
  }

  const handleRegisterSubmit = (userData) => {
    register(userData)
      .then(
        () => {
          setIsSuccessRegister(true);
          setInfoToolTipOpen(true)
          setPopupMessage('Вы успешно зарегистрировались!')
          setImageSrc(successIcon)
          history.push('/signin')
        })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setIsSuccessRegister(false);
        setPopupMessage('Что-то пошло не так. Попробуйте ещё раз!')
        setImageSrc(failIcon)
        setInfoToolTipOpen(true)
      });
  }

  const handleLoginSubmit = (userData) => {

    login(userData).then(
      (res) => {
        setIsSuccessLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        setEmail(userData.email)
        history.push('/');
      })
      .catch((err) => {
        setImageSrc(failIcon)
        setPopupMessage('Пользователь с таким логином/паролем не найден')
        setInfoToolTipOpen(true)
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsSuccessLoggedIn(false);
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container" onKeyDown={closeAllPopupsEsc} >
          <Header userEmail={email} onSignOut={handleSignOut} />
          <Switch>
            <Route path="/signup">
              <Register
                onRegister={handleRegisterSubmit}
              />
            </Route>
            <Route path="/signin">
              <Login
                onLogin={handleLoginSubmit}
              />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              isLoggedIn={isSuccessLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onDeleteCard={handlePopupSubmitOpen}
            />
            <Route>
              {isSuccessLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          {isSuccessLoggedIn && <Footer />}

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupDeleteCard
            isOpen={isPopupDeleteCardOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            cardToDelete={itemToDelete} />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccessRegister}
            isSuccessLogin={isSuccessLoggedIn}
            message={popupMessage}
            imgSrc={imageSrc}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}