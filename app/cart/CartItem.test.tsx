import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItem } from './CartItem';
import { CartItem as CartItemType } from './types';

describe('CartItem', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 29.99,
    image: 'test-image.jpg',
  };

  const mockItem: CartItemType = {
    product: mockProduct,
    quantity: 2,
  };

  const mockOnRemove = jest.fn();
  const mockOnUpdateQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart item with product details', () => {
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$59.98')).toBeInTheDocument();
  });

  it('calls onUpdateQuantity when decrease button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    await user.click(screen.getByTestId('quantity-decrease-1'));
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('calls onUpdateQuantity when increase button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    await user.click(screen.getByTestId('quantity-increase-1'));
    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CartItem
        item={mockItem}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    );

    await user.click(screen.getByTestId('remove-1'));
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});
