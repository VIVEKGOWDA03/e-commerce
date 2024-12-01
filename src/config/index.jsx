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
        id: "women",
        label: "Women",
      },
      {
        id: "accessories",
        label: "Accessories",
      },
      {
        id: "footwear",
        label: "Footwear",
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
      {
        id: "hm",
        label: "H&M",
      },
      {
        id: "zara",
        label: "Zara",
      }
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

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
];

export const FilterOptions = {
  Category: [
    {
      id: "men",
      label: "Men",
    },
    {
      id: "women",
      label: "Women",
    },
    {
      id: "kids",
      label: "Kids",
    },
    {
      id: "accessories",
      label: "Accessories",
    },
    { id: "footwear", label: "Footwear" },
  ],
  Brand: [
    {
      id: "puma",
      label: "Puma",
    },
    {
      id: "adidas",
      label: "Adidas",
    },
    {
      id: "levi",
      label: "Levis",
    },
    {
      id: "nike",
      label: "Nike",
    },
    {
      id: "hm",
      label: "H&M",
    },
    {
      id: "zara",
      label: "Zara",
    }

  ],
};
export const sortBy = [
  {
    id: "price-hightolow",
    label: "price:High to Low",
  },
  {
    id: "price-lowtohigh",
    label: "price:Low to High",
  },
  {
    id: "title-atoz",
    label: "title: A to Z",
  },
  {
    id: "title-ztoa",
    label: "title: Z to A",
  },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  levi: "Levi's",
  zara: "Zara",
  puma: "Puma",
  hm: "H&M",
};
