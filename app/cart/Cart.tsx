import { useMemo } from 'react';
import { CartItem as CartItemType } from './types';
import { CartItem } from './CartItem';

const BUTTON_BASE_CLASS = 'flex-1 text-white font-semibold py-2 px-4 rounded transition-colors';
const EMPTY_CART_MESSAGE = 'Your cart is empty';

interface CartProps {
  items: CartItemType[];
  total: number;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onClear: () => void;
}

export function Cart({
  items,
  total,
  onRemove,
  onUpdateQuantity,
  onClear,
}: CartProps) {
  const itemCount = useMemo(() => 
    items.reduce((sum, item) => sum + item.quantity, 0), 
    [items]
  );

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600 text-lg">{EMPTY_CART_MESSAGE}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <span className="text-gray-600" data-testid="item-count">
          ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </span>
      </div>

      <div className="mb-6" data-testid="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <div className="border-t border-gray-300 pt-6 mb-6">
        <div className="bg-gray-50 rounded p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-2xl font-bold text-blue-600" data-testid="total-display">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClear}
            className={`${BUTTON_BASE_CLASS} bg-gray-400 hover:bg-gray-500`}
            data-testid="clear-cart"
          >
            Clear Cart
          </button>
          <button
            className={`${BUTTON_BASE_CLASS} bg-blue-600 hover:bg-blue-700`}
            data-testid="checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}