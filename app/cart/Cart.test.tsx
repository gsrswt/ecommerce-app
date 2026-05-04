import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart } from './Cart';
import { CartItem as CartItemType } from './types';

describe('Cart', () => {
  const mockProduct1 = {
    id: 1,
    name: 'Product 1',
    price: 19.99,
    image: 'product1.jpg',
  };

  const mockProduct2 = {
    id: 2,
    name: 'Product 2',
    price: 29.99,
    image: 'product2.jpg',
  };

  const mockProduct3 = {
    id: 3,
    name: 'Product 3',
    price: 49.99,
    image: 'product3.jpg',
  };

  const mockItems: CartItemType[] = [
    { product: mockProduct1, quantity: 1 },
    { product: mockProduct2, quantity: 2 },
  ];

  const mockOnRemove = jest.fn();
  const mockOnUpdateQuantity = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty cart message when no items', () => {
    render(
      <Cart
        items={[]}
        total={0}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders all cart items', () => {
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('displays correct total', () => {
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('total-display')).toHaveTextContent('$79.97');
  });

  it('displays item count in singular form', () => {
    render(
      <Cart
        items={[{ product: mockProduct1, quantity: 1 }]}
        total={19.99}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('item-count')).toHaveTextContent('(1 item)');
  });

  it('displays item count in plural form', () => {
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('item-count')).toHaveTextContent('(3 items)');
  });

  it('calculates and displays correct total for single item', () => {
    const singleItem = [{ product: mockProduct1, quantity: 1 }];
    render(
      <Cart
        items={singleItem}
        total={19.99}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('total-display')).toHaveTextContent('$19.99');
  });

  it('calculates and displays correct total for multiple different items', () => {
    const multipleItems: CartItemType[] = [
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 1 },
      { product: mockProduct3, quantity: 1 },
    ];
    // 19.99*2 + 29.99*1 + 49.99*1 = 39.98 + 29.99 + 49.99 = 119.96
    render(
      <Cart
        items={multipleItems}
        total={119.96}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('total-display')).toHaveTextContent('$119.96');
  });

  it('displays subtotal breakdown with item count', () => {
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByText('Items (3):')).toBeInTheDocument();
    expect(screen.getByTestId('subtotal-display')).toHaveTextContent('$79.97');
  });

  it('calls onClear when clear cart button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    await user.click(screen.getByTestId('clear-cart'));
    expect(mockOnClear).toHaveBeenCalled();
  });

  it('renders shopping cart title when items exist', () => {
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  it('renders checkout button', () => {
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('checkout')).toBeInTheDocument();
  });

  it('formats total with two decimal places', () => {
    render(
      <Cart
        items={[{ product: { id: 1, name: 'Item', price: 10, image: 'img.jpg' }, quantity: 3 }]}
        total={30.0}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('total-display')).toHaveTextContent('$30.00');
  });
});
      />
    );

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  it('renders checkout button', () => {
    render(
      <Cart
        items={mockItems}
        total={79.97}
        onRemove={mockOnRemove}
        onUpdateQuantity={mockOnUpdateQuantity}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByTestId('checkout')).toBeInTheDocument();
  });
});
