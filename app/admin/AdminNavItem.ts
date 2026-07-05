import {
  LayoutDashboard,
  Package,
  Tags,
  PackagePlus,
  FolderPlus,
  ReceiptText,
} from "lucide-react";


export const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/category",
    label: "Category",
    icon: Tags,
  },
  {
    href: "/admin/products/add",
    label: "Add Product",
    icon: PackagePlus,
  },
  {
    href: "/admin/category/add",
    label: "Add Category",
    icon: FolderPlus,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ReceiptText,
  },
];