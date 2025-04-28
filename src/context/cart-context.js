import React, { createContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import { DUPLICATE, MAX_QUANTITY, ORDER_PLACED } from '../constants/constant';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = (product) => {
    const duplicate = cart.find((cartItem) => cartItem.id === product.id);
    if (duplicate) {
      return enqueueSnackbar(DUPLICATE, { variant: 'warning' });
    }
    setCart((prevCart) => [...prevCart, { ...product, productQty: 1 }]);
  };

  // Increase product quantity
  const increaseProductQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) => {
        if (product.id === productId) {
          if (product.productQty === product.quantity) {
            enqueueSnackbar(MAX_QUANTITY, { variant: 'warning' });
            return product;
          } else {
            return { ...product, productQty: product.productQty + 1 };
          }
        }
        return product;
      })
    );
  };

  // Decrease product quantity
  const decreaseProductQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((product) =>
        product.id === productId && product.productQty
          ? { ...product, productQty: product.productQty - 1 }
          : product
      );

      // Remove product if quantity reaches zero
      return updatedCart.filter((product) => product.productQty > 0);
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Place order
  const placeOrder = () => {
    setCart([]);
    navigate('/');
    enqueueSnackbar(ORDER_PLACED, { variant: 'success' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseProductQuantity, decreaseProductQuantity, removeFromCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
