import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';
import { Product } from '../features/products/types';

describe('useCart', () => {
  const mockProduct1: Product = {
    id: 1,
    name: 'Product 1',
    price: 19.99,
    image: 'product1.jpg',
  };

  const mockProduct2: Product = {
    id: 2,
    name: 'Product 2',
    price: 29.99,
    image: 'product2.jpg',
  };

  const mockProduct3: Product = {
    id: 3,
    name: 'Product 3',
    price: 49.99,
    image: 'product3.jpg',
  };

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it('adds product to cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('increments quantity when adding duplicate product', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('calculates correct total for single product', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
    });

    expect(result.current.total).toBe(19.99);
  });

  it('calculates correct total for multiple quantities of single product', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct1);
    });

    // 19.99 * 3 = 59.97
    expect(result.current.total).toBeCloseTo(59.97, 2);
  });

  it('calculates correct total for multiple different products', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct2);
      result.current.addToCart(mockProduct2);
    });

    // 19.99 + 29.99*2 = 19.99 + 59.98 = 79.97
    expect(result.current.total).toBeCloseTo(79.97, 2);
  });

  it('removes product from cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct2);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(2);
  });

  it('updates total after removing product', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct2);
    });

    expect(result.current.total).toBeCloseTo(49.98, 2);

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.total).toBe(29.99);
  });

  it('updates quantity of product in cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
    });

    act(() => {
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.total).toBeCloseTo(99.95, 2);
  });

  it('removes product when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct2);
    });

    act(() => {
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(2);
    expect(result.current.total).toBe(29.99);
  });

  it('clears all items from cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct2);
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it('calculates correct total for complex cart scenario', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1); // 19.99
      result.current.addToCart(mockProduct1); // 19.99 * 2
      result.current.addToCart(mockProduct2); // 29.99
      result.current.addToCart(mockProduct3); // 49.99
    });

    // 19.99*2 + 29.99 + 49.99 = 39.98 + 29.99 + 49.99 = 119.96
    expect(result.current.total).toBeCloseTo(119.96, 2);
    expect(result.current.items).toHaveLength(3);
  });

  it('maintains total accuracy after multiple quantity updates', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct2);
    });

    act(() => {
      result.current.updateQuantity(1, 3);
      result.current.updateQuantity(2, 2);
    });

    // 19.99*3 + 29.99*2 = 59.97 + 59.98 = 119.95
    expect(result.current.total).toBeCloseTo(119.95, 2);
  });
});
