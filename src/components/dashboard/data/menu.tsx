// import { StarFilledIcon } from "@radix-ui/react-icons";
import { Home, ClipboardList, ReceiptCent, BoxIcon } from "lucide-react";

export const DashboardMenus = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home size={18} />,
  },
  {
    id: "halamanProduk",
    label: "Halaman Produk",
    href: "halamanproduk",
    icon: <ClipboardList size={18} />,
  },
  {
    id: "halamanRecipes",
    label: "Halaman Receipes",
    href: "halamanrecipes",
    icon: <ReceiptCent size={18} />,
  },
  {
    id: "halamanCarts",
    label: "Halaman Carts",
    href: "halamancarts",
    icon: <BoxIcon size={18} />,
  },
  // {
  //   id: "pesanan",
  //   title: "Pesanan",
  //   icon: <CircleHelp size={18} />,
  //   hidden: false,
  //   links: [
  //     {
  //       label: "Semua Pesanan",
  //       href: "orders",
  //       icon: <CircleHelp size={18} />,
  //     },

  //     {
  //       label: "Menunggu Pembayaran",
  //       href: "menunggu-pembayaran",
  //       icon: <Tags size={18} />,
  //     },
  //     {
  //       label: "Dalam Proses",
  //       href: "dalam-proses",
  //       icon: <Box size={18} />,
  //     },
  //     {
  //       label: "Delivery Order",
  //       href: "delivery-order",
  //       icon: <Box size={18} />,
  //     },
  //     {
  //       label: "Dalam Perjalanan",
  //       href: "dalam-perjalanan",
  //       icon: <Users size={18} />,
  //     },
  //     {
  //       label: "Selesai",
  //       href: "pesanan-selesai",
  //       icon: <PieChart size={18} />,
  //     },
  //     {
  //       label: "Gagal",
  //       href: "refund-pesanan",
  //       icon: <Star size={18} />,
  //     },
  //   ],
  // },
];
