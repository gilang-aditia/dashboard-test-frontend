import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { CartProduct } from "../types/carts-type";

interface CartItemProps {
  product: CartProduct;
  onRemove: (productId: number) => void;
  onSelect: (productId: number, selected: boolean) => void;
}

export function CartItem({ product, onRemove, onSelect }: CartItemProps) {
  return (
    <div className="flex items-start gap-4 border-b py-4">
      <Checkbox
        checked={product.selected}
        onCheckedChange={(checked) => onSelect(product.id, checked as boolean)}
        className="mt-1"
      />

      <div className="flex flex-1 gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-md bg-gray-100">
          <img
            src={product.thumbnail || "https://via.placeholder.com/80"}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{product.title}</h3>
          <div className="mt-1 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-red-500"
              onClick={() => onRemove(product.id)}
            >
              Cancel
            </Button>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>Quantity: {product.quantity}</p>
            <p className="text-green-500">
              Discount: {product.discountPercentage}%
            </p>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium">${product.price}</p>
        <div className="mt-4 flex flex-col items-end gap-1">
          <p className="text-sm text-gray-500 line-through">
            ${product.total.toFixed(2)}
          </p>
          <p className="font-medium text-green-600">
            ${product.discountedTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
