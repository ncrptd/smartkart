import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
function Header() {
  return (
    <header>
      <div className="container  ">
        <h1 className="logo">
          <Link>SmartKart</Link>
        </h1>
        <div className="searchbar">
          <FormInput placeholder="search" />
        </div>
        <ul className="nav__list">
          <li className="nav__item">
            <Link className="nav__link btn">Login</Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link">
              <FontAwesomeIcon icon={faHeart} />
            </Link>
          </li>
          <li className="nav__item">
            <Link>
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
