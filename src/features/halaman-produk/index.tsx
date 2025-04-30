import { FileWarningIcon } from "lucide-react";
import { CustomAlert } from "../../components/ui/custom-alert";
import { TableProduk } from "./components/table-produk";

export default function ProductList() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Product</h1>
      <CustomAlert
        className="mb-4 border-none"
        status="error"
        title="Hallo Selamat Datang | Dashboard"
        description="Anda dapat melihat, mengupdate, dan menghapus Produk dari Dashboard."
        icon={<FileWarningIcon />}
      />
      <TableProduk />
    </div>
  );
}
