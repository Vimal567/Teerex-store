import React, { useContext } from 'react';
import './Cart.css';
import CartContext from '../../context/cart-context';
import { Link } from 'react-router-dom';

const Cart = () => {

  const { cart, increaseProductQuantity, decreaseProductQuantity, removeFromCart, placeOrder } = useContext(CartContext);

  return (
    <div className='cart-section'>
      <h2>Shopping Cart</h2>

      {cart && cart.length ?
        <div className='cart-checkout-section'>
          <div className='cart-container'>
            {cart.map((product, index) => {
              return <div className='cart-item' key={index}>
                <div className='product-image'>
                  {<img src={product.imageURL} alt='product' />}
                  <div className='update-quantity'>
                    {product.productQty > 1 ?
                      <button title='Decrease quantity' onClick={() => decreaseProductQuantity(product.id)}>
                        <img src='/assets/minus-icon.svg' alt='reduce quantity' />
                      </button>
                      :
                      <button title='Delete item' onClick={() => removeFromCart(product.id)}>
                        <img src='/assets/delete-icon.svg' alt='reduce quantity' />
                      </button>
                    }
                    {product.productQty}
                    <button title='Increase quantity' onClick={() => increaseProductQuantity(product.id)}>
                      <img src='/assets/plus-icon.svg' alt='increase quantity' />
                    </button>
                  </div>
                </div>
                <div className='product-details'>
                  <h3>{product.name}</h3>
                  <div className='price'>Price &#8377;: {product.price}</div>
                  <div className='total'>Total Price &#8377;: {product.price * product.productQty}</div>
                  <button type='button' title='Delete item' onClick={() => removeFromCart(product.id)}>Delete</button>
                </div>
              </div>
            })}
          </div>
          <div className='checkout-section'>
            <div className='checkout-container'>
              <h2>Order Summary</h2>
              <br />
              <div className='total-products'>Total Products: {cart.length}</div>
              <div className='cart-total'>Total amount: &#8377;{cart.reduce((total, product) => total + product.price * product.productQty, 0)}</div>
              <button type='button' onClick={placeOrder}>Checkout</button>
            </div>
          </div>
        </div>
        :
        <div className='empty-cart'>
          <div>
            No items in the cart
            <img src='/assets/cart-icon.svg' alt='empty cart icon' />
          </div>
          <div><Link to={"/"}>Click here to navigate to the products page</Link></div>
        </div>
      }

      <div className='mobile-checkout-section'>
        <div className='mobile-checkout-container'>
          <div className='total'>Total amount: &#8377;{cart.reduce((total, product) => total + product.price * product.productQty, 0)}</div>
          <div className='checkout' onClick={placeOrder}>Checkout</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;