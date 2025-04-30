import React, { useContext } from 'react'
import './Header.css';
import { useLocation, Link } from 'react-router-dom';
import CartContext from '../../context/cart-context';

const Header = () => {

  const location = useLocation();
  const { cart } = useContext(CartContext);

  return (
    <div className='header-container'>
      <div className="brand">
        <h1>Teerex Store</h1>
        <img src="/assets/logo-icon.svg" alt="Teerex Store logo" />
      </div>

      <ul className='menu'>
        {location.pathname === "/cart" ?
          <li className='menu-item'>
            <Link to="/">Products</Link>
          </li>
          :
          <li className="menu-item">
            <Link to="/cart">
              <img src="/assets/cart-icon.svg" alt="cart" />
              <span>{cart?.length || 0}</span>
            </Link>
          </li>}
      </ul>
    </div>
  )
}

export default Header;