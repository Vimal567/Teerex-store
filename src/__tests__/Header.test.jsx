import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header/Header';
import CartContext from '../context/cart-context';

test('Cart navigation contains anchor element', () => {
  const mockCartContext = {
    cart: []
  };

  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartContext.Provider value={mockCartContext}>
        <Header />
      </CartContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByRole('link', { name: /cart/i })).toBeInTheDocument();
});
