import { CartItem as CartItemType } from './types';

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded transition-colors"
          data-testid={`quantity-decrease-${product.id}`}
        >
          −
        </button>
        <span className="text-center w-8 font-semibold" data-testid={`quantity-${product.id}`}>
          {quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded transition-colors"
          data-testid={`quantity-increase-${product.id}`}
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-blue-600">${subtotal.toFixed(2)}</p>
      </div>

      <button
        onClick={() => onRemove(product.id)}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        data-testid={`remove-${product.id}`}
      >
        Remove
      </button>
    </div>
  );
}
