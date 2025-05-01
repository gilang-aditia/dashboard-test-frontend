import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  DeleteIcon,
  MoreHorizontal,
  Star,
  ArrowUpDown,
  Edit2,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const columns: ColumnDef<any>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => <span className="font-medium">{row.index + 1}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("id")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate text-sm text-gray-600">
        {row.getValue("description") || "-"}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
        {row.getValue("category")}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <div className="font-medium text-gray-900">${price.toFixed(2)}</div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const numA = parseFloat(rowA.getValue("price"));
      const numB = parseFloat(rowB.getValue("price"));
      return numA > numB ? 1 : numA < numB ? -1 : 0;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = parseFloat(row.getValue("rating"));
      return (
        <div className="flex items-center">
          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const numA = parseFloat(rowA.getValue("rating"));
      const numB = parseFloat(rowB.getValue("rating"));
      return numA > numB ? 1 : numA < numB ? -1 : 0;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <div
        className={
          (row.getValue("stock") as number) > 0
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {row.getValue("stock")}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("brand")}</div>
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({}) => {
      return (
        <div className="relative flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="group h-8 w-8 p-0 transition-all duration-200 hover:bg-gray-100/80"
              >
                <div className="relative">
                  <MoreHorizontal className="group-hover:text-primary h-4 w-4 text-gray-500 transition-colors" />
                  <span className="sr-only">Open menu</span>
                </div>
              </Button>
            </DropdownMenuTrigger>

            {/* konten isi dropdownya*/}
            <DropdownMenuContent
              align="end"
              className="z-50 min-w-[180px] rounded-md border border-gray-200 bg-white shadow-lg"
              style={{
                animationDuration: "200ms",
                transformOrigin:
                  "var(--radix-dropdown-menu-content-transform-origin)",
              }}
              sideOffset={5}
            >
              <DropdownMenuLabel className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 font-medium text-gray-900">
                Product Actions
              </DropdownMenuLabel>

              <div className="px-1 py-1">
                <DropdownMenuItem asChild>
                  <Link
                    to={``}
                    className="flex cursor-pointer items-center rounded-md bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit2 className="mr-2 h-4 w-4 text-blue-500" />
                    Edit Product
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600">
                  <DeleteIcon className="mr-2 h-4 w-4 text-red-500" />
                  Delete
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="bg-gray-100" />

              <div className="px-1 py-1">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-50">
                  <Eye className="mr-2 h-4 w-4 text-gray-500" />
                  View Details
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default columns;
