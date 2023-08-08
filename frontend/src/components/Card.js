import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some(id => id === currentUser._id);

  const cardLikeButtonClassName = (
    `card__like ${isLiked && 'card__like_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleCardLike() {
    props.onCardLike(props.card)
  }  
  
  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="card">
      <img
        src={props.link}
        alt={props.name}
        className="card__image" onClick={handleClick}
      />
      {isOwn && <button type="button" className="card__delete" onClick={handleCardDelete}/>}
      <div className="card__item">
        <h2 className="card__paragraph">{props.name}</h2>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike} />
          <p className="card__like-counter">{props.likes}</p>
        </div>
      </div>
    </div>
  )
}

export default Card