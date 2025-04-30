import { render, screen } from '@testing-library/react';
import Filter from '../components/Filter/Filter';
import userEvent from '@testing-library/user-event';

test('on check filter products', async () => {
  const mockSetGenderFilterData = jest.fn();
  const user = userEvent.setup();

  render(
    <Filter
      colourFilterData={[]}
      setColourFilterData={jest.fn()}
      genderFilterData={[]}
      setGenderFilterData={mockSetGenderFilterData}
      priceFilterData={[]}
      setPriceFilterData={jest.fn()}
      clothTypeFilter={[]}
      setClothTypeFilter={jest.fn()}
    />
  );

  await user.click(screen.getByRole('checkbox', { name: 'Men' }));

  expect(mockSetGenderFilterData).toHaveBeenCalled();

  const updateFn = mockSetGenderFilterData.mock.calls[0][0];
  const result = typeof updateFn === 'function' ? updateFn([]) : updateFn;

  expect(result).toContain('Men');
});
