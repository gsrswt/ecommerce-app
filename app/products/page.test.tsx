import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsPage from './page';

// Mock the ProductCard component to avoid rendering issues in tests
jest.mock('@/features/products/ProductCard', () => {
  return {
    ProductCard: ({ product, onAddToCart }: any) => (
      <div data-testid={`product-card-${product.id}`}>
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button onClick={() => onAddToCart(product.id)} data-testid={`add-to-cart-${product.id}`}>
          Add to Cart
        </button>
      </div>
    ),
  };
});

describe('ProductsPage', () => {
  it('renders the page title', () => {
    render(<ProductsPage />);
    expect(screen.getByText('Our Products')).toBeInTheDocument();
  });

  it('renders products grid initially', () => {
    render(<ProductsPage />);
    const grid = screen.getByTestId('products-grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders all products', () => {
    render(<ProductsPage />);

    // Based on data.ts, we have 6 products
    const productCards = screen.getAllByTestId(/^product-card-/);
    expect(productCards).toHaveLength(6);
  });

  it('shows View Cart button with item count', () => {
    render(<ProductsPage />);
    expect(screen.getByText('View Cart (0)')).toBeInTheDocument();
  });

  it('adds product to cart and updates count', async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    await user.click(screen.getByTestId('add-to-cart-1'));
    expect(screen.getByText('View Cart (1)')).toBeInTheDocument();
  });

  it('increments cart count for duplicate products', async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    await user.click(screen.getByTestId('add-to-cart-1'));
    await user.click(screen.getByTestId('add-to-cart-1'));

    expect(screen.getByText('View Cart (1)')).toBeInTheDocument();
  });

  it('toggles between products and cart view', async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    // Initially shows products
    expect(screen.getByTestId('products-grid')).toBeInTheDocument();

    // Add a product to cart
    await user.click(screen.getByTestId('add-to-cart-1'));

    // Click to show cart
    await user.click(screen.getByTestId('toggle-cart'));
    expect(screen.queryByTestId('products-grid')).not.toBeInTheDocument();
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();

    // Click to show products again
    await user.click(screen.getByTestId('toggle-cart'));
    expect(screen.getByTestId('products-grid')).toBeInTheDocument();
  });

  it('renders specific products by name', () => {
    render(<ProductsPage />);

    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Smart Watch')).toBeInTheDocument();
    expect(screen.getByText('USB-C Cable')).toBeInTheDocument();
  });
});

