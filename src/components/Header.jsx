import React from 'react'
import './Header.css';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {

  const location = useLocation();

  return (
    <div className='header-container'>
      <div className="brand">
        <h1>Teerex Store</h1>
        <img src="/assets/logo.svg" alt="logo" />
      </div>
      <ul className='menu'>
        {location.pathname.substring(1) === "cart" ?
          <li className='menu-item'>
            <Link to="/">Products</Link>
          </li>
          : <Link to="/cart">
            <li className="menu-item">
              <Link to="/cart">
                <img src="/assets/cart.svg" alt="cart navigation" />
              </Link>
            </li>
          </Link>}
      </ul>
    </div>
  )
}

export default Header;