import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from '../utils/auth.js'
import InfoTooltip from "./InfoTooltip.js";
import success from "../images/SuccessIcon.jpg";
import failure from "../images/failureIcon.jpg"

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [infoTooltipIcon, setInfoTooltipIcon] = useState('');


  const navigate = useNavigate();

  function onLogin(email, password) {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch(() => {
        setInfoTooltipIcon(failure);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      })
  }

  function onRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setInfoTooltipIcon(success);
        setInfoTooltipText("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setInfoTooltipIcon(failure);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip)
  }

  function checkTocken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
            setEmail(res.user.email);
          }
        })
        .catch(console.error)
    }
  }

  useEffect(() => {
    checkTocken()
  }, [])

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail(null);
  }

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData.user)
        setCards(cards)
      })
      .catch(console.error)
  }, [loggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch(console.error)
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch(console.error)
    }
  }

  function handleCardDelete(card) {
    api.deleteCardId(card._id)
      .then(() => {
        setCards((item) => item.filter((c) => c._id !== card._id && c));
      })
      .catch(console.error)
  }

  function handleUpdateUser(profileData) {
    api.sendUserData(profileData)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleUpdateAvatar(avatarLink) {
    api.sendAvatarData(avatarLink)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
            <Route path="/sign-in" element={
              <>
                <Header text="Регистрация" link="/sign-up" />
                <Login onLogin={onLogin} title="Вход" textSubmit="Войти" />
              </>
            }
            />
            <Route path="/sign-up" element={
              <>
                <Header text="Войти" link="/sign-in" />
                <Register
                  onRegister={onRegister}
                  title="Регистрация"
                  textSubmit="Зарегистрироваться"
                  paragraph="Уже зарегистрированы?"
                />
              </>
            }
            />
            <Route path="/" element={
              <>
                <Header
                  text="Выйти"
                  email={email}
                  link="/sign-in"
                  onSignOut={onSignOut}
                />
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer title="© 2023 Mesto Russia" />
              </>

            }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="delete"
            submit="Да"
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />

          <InfoTooltip
            icon={infoTooltipIcon}
            text={infoTooltipText}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
