import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const urlRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: urlRef.current.value
    });
  }

  useEffect(() => {
    urlRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submit="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onUpdateAvatar={props.onUpdateAvatar}
      onSubmit={handleSubmit}
    >
      <input
        id="input-link-avatar"
        className="popup__input popup__input_type_link-avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required=""
        ref={urlRef}
      />
      <span id="input-link-avatar-error" className="popup__error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup