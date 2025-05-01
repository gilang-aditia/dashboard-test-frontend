// src/pages/CartPage.tsx
import { useEffect, useState } from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import { fetchCarts } from "../hook/service";
import { Cart } from "../types/carts-type";
import { OrderSummary } from "./card-summary";
import { CartItem } from "./cart-item";

export function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        setLoading(true);
        const response = await fetchCarts();
        if (response.carts.length > 0) {
          // Tambahkan selected: false ke semua produk
          const cartWithSelection = {
            ...response.carts[0],
            products: response.carts[0].products.map((product) => ({
              ...product,
              selected: false,
            })),
          };
          setCart(cartWithSelection);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, []);

  const handleRemoveItem = (productId: number) => {
    if (cart) {
      setCart({
        ...cart,
        products: cart.products.filter((p) => p.id !== productId),
        totalProducts: cart.totalProducts - 1,
        totalQuantity:
          cart.totalQuantity -
          (cart.products.find((p) => p.id === productId)?.quantity || 0),
        total: cart.products.reduce(
          (sum, p) => sum + (p.id === productId ? 0 : p.total),
          0,
        ),
        discountedTotal: cart.products.reduce(
          (sum, p) => sum + (p.id === productId ? 0 : p.discountedPrice),
          0,
        ),
      });
    }
  };

  const handleSelectItem = (productId: number, selected: boolean) => {
    if (cart) {
      setCart({
        ...cart,
        products: cart.products.map((product) =>
          product.id === productId ? { ...product, selected } : product,
        ),
      });
    }
  };

  // Hitung item yang dipilih dan totalnya
  const selectedItems = cart?.products.filter((p) => p.selected).length || 0;
  const selectedSubtotal =
    cart?.products
      .filter((p) => p.selected)
      .reduce((sum, p) => sum + p.total, 0) || 0;
  const selectedDiscountedTotal =
    cart?.products
      .filter((p) => p.selected)
      .reduce((sum, p) => sum + p.discountedPrice, 0) || 0;
  const selectedDiscount = selectedSubtotal - selectedDiscountedTotal;

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!cart) {
    return <div className="container mx-auto py-8">No cart found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cart.products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onRemove={handleRemoveItem}
              onSelect={handleSelectItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            selectedItems={selectedItems}
            subtotal={selectedSubtotal}
            discount={selectedDiscount}
            total={selectedDiscountedTotal}
          />
        </div>
      </div>
    </div>
  );
}
