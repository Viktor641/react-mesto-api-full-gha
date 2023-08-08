function InfoTooltip(props) {

  return (
    <div className={`popup ${props.isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close button" onClick={props.onClose} />
        <img className="popup__icon" src={props.icon} alt={props.text}/>
        <h2 className="popup__text">{props.text}</h2>
      </div>
    </div>
  )
}
export default InfoTooltip