import { render, screen } from '@testing-library/react';
import LandingPage from '../pages/LandingPage/LandingPage';
import CartContext from '../context/cart-context';
import { SnackbarProvider } from 'notistack';
import userEvent from '@testing-library/user-event';

const renderLandingPage = () => {
  const cartContext = {
    addToCart: jest.fn()
  };

  render(
    <CartContext.Provider value={cartContext}>
      <SnackbarProvider>
        <LandingPage />
      </SnackbarProvider>
    </CartContext.Provider>
  );
};

test('displays search input with correct placeholder', async () => {
  renderLandingPage();
  const searchInput = await screen.findByPlaceholderText(/^Search/);
  expect(searchInput).toBeInTheDocument();
});

test('shows matching items when user searches for a product', async () => {
  renderLandingPage();
  const user = userEvent.setup();
  const searchInput = await screen.findByPlaceholderText(/^Search/);
  await user.type(searchInput, 'green polo');

  const result = screen.getAllByText(/green polo/i);
  expect(result.length).toBeGreaterThan(0);
});
