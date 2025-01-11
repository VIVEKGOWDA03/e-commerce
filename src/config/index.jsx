import {
  ArrowRight,
  CassetteTapeIcon,
  HomeIcon,
  LayoutDashboard,
  Menu,
  PackageSearch,
  SearchCheckIcon,
  ShoppingBasket,
  ShoppingCartIcon,
} from "lucide-react";
import path from "path";

export const registerFormControls = [
  {
    name: "userName",
    label: " User Name",
    placeholder: "Enter Your Name",
    componenttype: "input",
    type: "text",
  },
  {
    name: "email",
    label: " Email",
    placeholder: "Enter Your Email",
    componenttype: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componenttype: "password",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: " Email",
    placeholder: "Enter Your Email",
    componenttype: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
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
        id: "kids",
        label: "Kids",
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

import { Home, User, Users, Baby, ShoppingBag, Gem } from "lucide-react"; // Use valid icons
import { MdCategory } from "react-icons/md";

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="w-6 h-6" />,
    path: "/shop/home",
  },

  {
    id: "products",
    label: "Products",
    icon: <Home className="w-6 h-6" />,
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    icon: <User className="w-6 h-6" />, // Replaced with 'User'
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    icon: <Users className="w-6 h-6" />, // Replaced with 'Users'
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    icon: <Baby className="w-6 h-6" />,
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    icon: <ShoppingBag className="w-6 h-6" />, // Replaced with 'ShoppingBag'
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: <Gem className="w-6 h-6" />, // Replaced with 'Gem'
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    icon: <SearchCheckIcon className="w-6 h-6" />,
    path: "/shop/search",
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
    },
  ],
};
export const sortBy = [
  {
    id: "price-hightolow",
    label: "Price:High to Low",
  },
  {
    id: "price-lowtohigh",
    label: "Price:Low to High",
  },
  {
    id: "title-atoz",
    label: "Title: A to Z",
  },
  {
    id: "title-ztoa",
    label: "Title: Z to A",
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

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const buttonsData = [
  {
    text: "Home",
    icon: <HomeIcon className="w-4 h-4" />,
    endIcon: <ArrowRight className="w-4 h-4" />,
    navigateTo: "/shop/home",
  },
  {
    text: "Shop",
    icon: <ShoppingCartIcon className="w-4 h-4" />,
    endIcon: <ArrowRight className="w-4 h-4" />,
    navigateTo: "/shop/account",
  },
  {
    text: "Account",
    icon: <User className="w-4 h-4" />,
    endIcon: <ArrowRight className="w-4 h-4" />,
    navigateTo: "/shop/account",
  },
  {
    text: "Account",
    icon: <MdCategory className="w-4 h-4" />,
    endIcon: <ArrowRight className="w-4 h-4" />,
    navigateTo: "/shop/account",
  },
];

export const categoryWithImages = [
  {
    id: "men",
    label: "Men",
    image: "/assets/brand/men.png",
    size: { width: 50, height: 75 },
  },
  {
    id: "women",
    label: "Women",
    image: "/assets/brand/copy4.png",
    size: { width: 64, height: 75 },
  },
  {
    id: "kids",
    label: "Kids",
    image: "/assets/brand/kid.png",
    size: { width: 56, height: 75 },
  },
  {
    id: "accessories",
    label: "Accessories",
    image: "/assets/brand/acc.png",
    size: { width: 50, height: 75 },
  },
  {
    id: "footwear",
    label: "Footwear",
    image: "/assets/brand/foot.png",
    size: { width: 70, height: 75 },
  },
  {
    id: "all",
    label: "Explore All",
    image: "/assets/brand/Category.png",
    size: { width: 50, height: 75 },
  },
];

export const brandWithImages = [
  {
    id: "nike",
    label: "Nike",
    image: "/assets/brand/nike.svg",
  },
  {
    id: "adidas",
    label: "Adidas",
    image: "/assets/brand/adidas.svg",
  },
  {
    id: "puma",
    label: "Puma",
    image: "/assets/brand/puma.svg",
  },
  {
    id: "levi",
    label: "Levi's",
    image: "/assets/brand/levis.svg",
  },
  {
    id: "hm",
    label: "H&M",
    image: "/assets/brand/h.svg",
  },
  {
    id: "zara",
    label: "Zara",
    image: "/assets/brand/zara.svg",
  },
];

export const images = [
  "/assets/items/men.jpg",
  "/assets/items/kids.webp",
  // "/assets/items/ex03.webp",
  "/assets/items/c01.jpg",
  "/assets/items/c02.webp",
  "/assets/items/c03.webp",
  "/assets/items/c04.webp",
];

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

export const products = [
  {
    title: "Product 4",
    thumbnail: "/assets/items/c02.webp",
    link: "/shop/listing",
  },
  {
    title: "Product 5",
    thumbnail: "/assets/items/c03.webp",
    link: "/shop/listing",
  },
  {
    title: "Product 6",
    thumbnail: "/assets/items/c04.webp",
    link: "/shop/listing",
  },
 
  {
    title: "Product 4",
    thumbnail: "/assets/items/c02.webp",
    link: "/shop/listing",
  },
  {
    title: "Product 5",
    thumbnail: "/assets/items/c03.webp",
    link: "/shop/listing",
  },
  {
    title: "Product 6",
    thumbnail: "/assets/items/c04.webp",
    link: "/shop/listing",
  },
  { title: "Product 1", thumbnail: "/assets/items/men.jpg", link: "/product2" },
  {
    title: "Product 2",
    thumbnail: "/assets/items/c04.webp",
    link: "/shop/listing",
  },
  { title: "Product 3", thumbnail: "/assets/items/c01.jpg", link: "/product2" },

  {
    title: "Product 7",
    thumbnail: "/assets/items/men.jpg",
    link: "/shop/listing",
  },
  {
    title: "Product 8",
    thumbnail: "/assets/items/c04.webp",
    link: "/shop/listing",
  },
  {
    title: "Product 9",
    thumbnail: "/assets/items/c01.jpg",
    link: "/shop/listing",
  },
  // Add more products...
];
