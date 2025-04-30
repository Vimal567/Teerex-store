import { render, screen } from '@testing-library/react';
import Cart from '../pages/Cart/Cart';
import CartContext from '../context/cart-context';
import userEvent from '@testing-library/user-event';

const mockCartContext = {
  cart: [{
    id: 1,
    imageURL: 'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/black-polo-men.png',
    name: 'Black Polo',
    type: 'Polo',
    price: 250,
    currency: 'INR',
    color: 'Black',
    gender: 'Men',
    productQty: 2,
    quantity: 3,
  }],
  increaseProductQuantity: jest.fn(),
  decreaseProductQuantity: jest.fn(),
  removeFromCart: jest.fn(),
  placeOrder: jest.fn(),
};

const renderCart = () => {
  return render(
    <CartContext.Provider value={mockCartContext}>
      <Cart />
    </CartContext.Provider>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Cart interactions', () => {
  test('Increase cart item quantity', async () => {
    renderCart();
    const user = userEvent.setup();

    const increaseButton = screen.getByTitle('Increase quantity');
    await user.click(increaseButton);

    expect(mockCartContext.increaseProductQuantity).toHaveBeenCalled();
  });

  test('Decrease cart item quantity', async () => {
    renderCart();
    const user = userEvent.setup();

    const decreaseButton = screen.getByTitle('Decrease quantity');
    await user.click(decreaseButton);

    expect(mockCartContext.decreaseProductQuantity).toHaveBeenCalled();
  });

  test('Remove item from cart', async () => {
    renderCart();
    const user = userEvent.setup();

    const deleteButton = screen.getByTitle('Delete item');
    await user.click(deleteButton);

    expect(mockCartContext.removeFromCart).toHaveBeenCalled();
  });
});
