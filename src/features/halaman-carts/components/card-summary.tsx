import { Button } from "../../../components/ui/button";

interface OrderSummaryProps {
  selectedItems: number;
  subtotal: number;
  discount: number;
  total: number;
}

export function OrderSummary({
  selectedItems,
  subtotal,
  discount,
  total,
}: OrderSummaryProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Selected Items</span>
          <span>{selectedItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-500">-${discount.toFixed(2)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t pt-3 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="bg-primary hover:bg-primary/90 mt-6 w-full">
        Proceed to Checkout ({selectedItems})
      </Button>
    </div>
  );
}
