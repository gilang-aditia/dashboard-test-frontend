import { FileWarningIcon } from "lucide-react";
import { CustomAlert } from "../../components/ui/custom-alert";
import { CartPage } from "./components/cart-page";

export default function CartsPage() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Carts</h1>
      <CustomAlert
        className="mb-4 border-none"
        status="info"
        title="Halaman carts"
        description="Lihat Pembelian anda."
        icon={<FileWarningIcon />}
      />
      <CartPage />
    </div>
  );
}
