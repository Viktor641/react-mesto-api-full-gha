function PopupWithForm(props) {
  return (
    <div className={`popup popup_theme_${props.name} ${props.isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close button" onClick={props.onClose} />
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit">{props.submit}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm