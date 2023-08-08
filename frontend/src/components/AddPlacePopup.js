import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addbutton"
      submit="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-title"
        className="popup__input popup__input_type_title"
        type="text"
        name="title"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        value={title}
        onChange={handleTitleChange}
      />
      <span id="input-title-error" className="popup__error" />
      <input
        id="input-link"
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        value={link}
        onChange={handleLinkChange}
      />
      <span id="input-link-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup