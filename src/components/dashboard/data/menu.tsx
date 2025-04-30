// import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  Home,
  Users,
  Box,
  Tags,
  ClipboardList,
  PieChart,
  Star,
  CircleHelp,
  Package,
  List,
  PlusCircle,
} from "lucide-react";

export const DashboardMenus = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "dashboard",
    icon: <Home size={18} />,
  },
  {
    id: "halamanProduk",
    label: "Halaman Produk",
    href: "halamanproduk",
    icon: <ClipboardList size={18} />,
  },
  {
    id: "pesanan",
    title: "Pesanan",
    icon: <CircleHelp size={18} />,
    links: [
      {
        label: "Semua Pesanan",
        href: "orders",
        icon: <CircleHelp size={18} />,
      },

      {
        label: "Menunggu Pembayaran",
        href: "menunggu-pembayaran",
        icon: <Tags size={18} />,
      },
      {
        label: "Dalam Proses",
        href: "dalam-proses",
        icon: <Box size={18} />,
      },
      {
        label: "Delivery Order",
        href: "delivery-order",
        icon: <Box size={18} />,
      },
      {
        label: "Dalam Perjalanan",
        href: "dalam-perjalanan",
        icon: <Users size={18} />,
      },
      {
        label: "Selesai",
        href: "pesanan-selesai",
        icon: <PieChart size={18} />,
      },
      {
        label: "Gagal",
        href: "refund-pesanan",
        icon: <Star size={18} />,
      },
    ],
  },
  {
    id: "pengiriman",
    title: "Pengiriman",
    icon: <CircleHelp size={18} />,
    links: [
      {
        label: "List Driver",
        href: "list-driver",
        icon: <CircleHelp size={18} />,
      },
      {
        label: "Tambah Driver",
        href: "tambah-driver",
        icon: <CircleHelp size={18} />,
      },
      {
        label: "List Kendaraan",
        href: "list-vehicle",
        icon: <Tags size={18} />,
      },
      {
        label: "Tambah Kendaraan",
        href: "tambah-vehicle",
        icon: <Tags size={18} />,
      },
    ],
  },
  {
    id: "product-menu",
    title: "Product Menu",
    icon: <Package size={18} />,
    links: [
      {
        label: "Product Aktif",
        href: "produk-aktif",
        icon: <PlusCircle size={18} />,
      },
      {
        label: "List Semua Product",
        href: "list-produk",
        icon: <List size={18} />,
      },
    ],
  },
];
