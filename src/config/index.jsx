import { LayoutDashboard, PackageSearch, ShoppingBasket } from "lucide-react";
import path from "path";

export const registerFormControls = [
  {
    name: "userName",
    label: " User Name",
    placeholder: "Enter your name",
    componenttype: "input",
    type: "text",
  },
  {
    name: "email",
    label: " email",
    placeholder: "Enter your email",
    componenttype: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componenttype: "password",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: " email",
    placeholder: "Enter your email",
    componenttype: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componenttype: "password",
    type: "password",
  },
];

export const AdminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard absoluteStrokeWidth />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket absoluteStrokeWidth />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <PackageSearch absoluteStrokeWidth />,
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componenttype: "input",
    type: "text",
    placeholder: "Enter products title",
  },
  {
    label: "Description",
    name: "description",
    componenttype: "textarea",
    placeholder: "Enter products description",
  },
  {
    label: "Category",
    name: "category",
    componenttype: "select",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "Women",
        label: "Women",
      },
      {
        id: "accessories",
        label: "Accessories",
      },
      {
        id: "foootwear",
        label: "Foootwear",
      },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componenttype: "select",
    options: [
      {
        id: "nike",
        label: "Nike",
      },
      {
        id: "adidas",
        label: "Adidas",
      },
      {
        id: "puma",
        label: "Puma",
      },
      {
        id: "levi",
        label: "Levi's",
      },
    ],
  },
  {
    label: "Price",
    name: "price",
    componenttype: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componenttype: "input",
    type: "number",
    placeholder: "Enter product price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componenttype: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
