import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      job: description
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      submit="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onUpdateUser={props.onUpdateUser}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        placeholder="Имя"
        required=""
        minLength={2}
        maxLength={40}
        value={name || ''}
        onChange={handleNameChange}
      />
      <span id="input-name-error" className="popup__error" />
      <input
        id="input-job"
        className="popup__input popup__input_type_job"
        type="text"
        name="job"
        placeholder="О себе"
        required=""
        minLength={2}
        maxLength={200}
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span id="input-job-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup