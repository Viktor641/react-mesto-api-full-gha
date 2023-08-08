function ImagePopup(props) {
  return (
    <div className={`popup popup_theme_picture ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_overlay">
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="popup__image"
        />
        <button
          type="button"
          className="popup__close button popup__close_type_picture"
          onClick={props.onClose}
        />
        <h2 className="popup__paragraph">{props.card?.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup