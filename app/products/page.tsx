'use client';

import { useState } from 'react';
import { ProductCard } from '@/features/products/ProductCard';
import { PRODUCTS } from '@/features/products/data';
import type { Product } from '@/features/products/types';
import { useCart } from '@/cart/useCart';
import { Cart } from '@/cart/Cart';

export default function ProductsPage() {
  const [showCart, setShowCart] = useState(false);
  const { items, total, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleAddToCart = (productId: number) => {
    const product = PRODUCTS.find((p: Product) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setShowCart(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors"
            data-testid="toggle-cart"
          >
            {showCart ? 'View Products' : `View Cart (${items.length})`}
          </button>
        </div>

        {showCart ? (
          <Cart
            items={items}
            total={total}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClear={handleClearCart}
          />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="products-grid"
          >
            {PRODUCTS.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
