import React, { useContext } from "react";
import addButton from '../images/addButton.svg';
import editButton from '../images/EditButton.svg';
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__findings">
          <div className="profile__container">
            <div className="profile__change-image">
              <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
              <button type="button" className="profile__pencil" onClick={props.onEditAvatar} />
            </div>
            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__text">{currentUser.name}</h1>
                <button type="button" className="profile__edit-btn button" onClick={props.onEditProfile}>
                  <img
                    src={editButton}
                    alt="карандаш"
                    className="profile__picture"
                  />
                </button>
              </div>
              <p className="profile__paragraph">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-btn button" onClick={props.onAddPlace}>
            <img
              src={addButton}
              alt="крестик"
              className="profile__btn-image"
            />
          </button>
        </div>
      </section>
      <section className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onCardDeleteOpen={props.onCardDeleteOpen}
          />
        ))}
      </section>
    </main>
  )
}

export default Main