import {
  House,
  LogOut,
  ShoppingCart,
  SquareMenu,
  SquareUserRound,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/cart-slice";
import { Label } from "../ui/label";
import TypingAnimation from "../ui/typing-animation";
import WordRotate from "../ui/word-rotate";
import SparklesText from "../ui/sparkles-text";
import bucket from "../../assets/logos/bucket.png";
import trolley from "../../assets/logos/trolley.png";
import shop1 from "../../assets/logos/shop1.png";
import Loader from "../ui/Loader";
import Tooltip from "../ui/Tooltip";
import { Dock, DockIcon } from "../ui/dock";
import { Button } from "../ui/button";

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }
  useEffect(() => {
    if (user?.id) {
      console.log("Fetching cart items for user:", user.id);
      dispatch(fetchCartItems({ userId: user?.id }));
    }
  }, [dispatch, user?.id]);
  function MenuItems() {
    function handleNavigate(getCurrentMennuItem) {
      sessionStorage.removeItem("filters");
      const currentFilter =
        getCurrentMennuItem.id !== "home" &&
        getCurrentMennuItem.id !== "products" &&
        getCurrentMennuItem.id !== "search"
          ? {
              Category: [getCurrentMennuItem.id],
            }
          : null;

      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${getCurrentMennuItem.id}`)
          )
        : navigate(getCurrentMennuItem.path);
    }
    return (
      <nav className="flex flex-col mt-4 mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer"
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        ))}
        {/* <Dock>
          {shoppingViewHeaderMenuItems.map((menuItem) => (
            <DockIcon
              key={menuItem.id}
              onClick={() => handleNavigate(menuItem)}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
            >
              <span className="text-sm font-medium">{menuItem.icon}</span>
            </DockIcon>
          ))}
        </Dock> */}
      </nav>
    );
  }
  function HeaderRightContent() {
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet
          open={openCartSheet}
          onOpenChange={(open) => setOpenCartSheet(open)}
        >
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 font-extrabold text-xs text-white bg-red-600 px-2 py-0.5 rounded-full shadow-md">
              {cartItems?.items?.length || 0}
            </span>

            <span className="sr-only "> User Cart</span>
          </Button>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 ">
            <DropdownMenuLabel>
              Logged in as
              <span className="text-bold  text-red-600">
                {" "}
                {user?.userName.toUpperCase()}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <SquareUserRound className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white bg-background ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          to="/shop/home"
          className="flex items-center gap-2 min-w-[120px] "
        >
          {/* <House className="w-6 h-6" /> */}
          {/* <img className="w-8 h-8" src={bucket} alt="logo" /> */}
          {/* <Loader/> */}
          <WordRotate
            className="w-12"
            words={[
              <img src={bucket} alt="Bucket" className="w-12 h-12" />,
              <img src={trolley} alt="Trolley" className="w-12 h-12" />,
              <img src={shop1} alt="Trolley" className="w-12 h-12" />,
            ]}
          />
          <span className="sm:text-8xl font-cairoPlay ">
            {/* <TypingAnimation text="Fashion Fynder" className="text-2xl " /> */}
            {/* <WordRotate words={[]} /> */}
            {/* <SparklesText className="text-xl " text="Urban Store" /> */}
            <h1 className="text-xl sm:text-2xl md:text-2xl font-rubikVinyl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-700 bg-opacity-50">
              Urban{" "}
              <span className="text-yellow-400  font-rubikVinyl">
                Store{" "}
              </span>
              {/* <br />   Store */}
            </h1>
          </span>
        </Link>
        <Sheet className="">
          <SheetTrigger asChild>
            <button variant="outline" size="icon " className="lg:hidden">
              <SquareMenu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white">
            <HeaderRightContent />
            <div className="flex justify-center items-center">
              <MenuItems className="mt-3" />
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block ">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
