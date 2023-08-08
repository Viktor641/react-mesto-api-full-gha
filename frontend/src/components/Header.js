import logo from '../images/header-logo.svg';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt={props.alt} className="header__logo" />
      <nav className="header__container">
        <p className="header__text">{props.email}</p>
        <Link to={props.link} className="header__link button" type="button" onClick={props.onSignOut}>{props.text}</Link>
      </nav>
    </header>
  )
}

export default Header