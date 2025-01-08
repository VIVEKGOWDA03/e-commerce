import {
  ArrowRight,
  Home,
  House,
  LogOut,
  ShoppingCart,
  ShoppingCartIcon,
  SquareMenu,
  SquareUserRound,
  User,
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
import { buttonsData, shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { TiThMenu } from "react-icons/ti";
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
import CustomButton from "../common/CustomButton";

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false); // Cart sheet state
  const [openMenuSheet, setOpenMenuSheet] = useState(false); // Menu sheet state
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

  function handleNavigateAcc() {
    setOpenCartSheet(false);
    navigate("/shop/account");
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
      <nav className="flex justify-between flex-col mt-4 mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer"
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        ))}
      </nav>
    );
  }

  function HeaderRightContent({className}) {
    return (
      <div className={`flex ${className} lg:block lg:items-center lg:flex-row gap-2`}>
        <DropdownMenu className="">
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-2xl font-rubikVinyl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 bg-slate-100">
            <DropdownMenuLabel>
              Logged in as
              <span className="text-bold text-red-600">
                {" "}
                {user?.userName.toUpperCase()}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNavigateAcc}>
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
    <header className="fixed top-0 z-40 w-full border-b bg-white ">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          to="/shop/home"
          className="flex items-center gap-2 min-w-[120px] "
        >
          <WordRotate
            className="w-12"
            words={[
              <img src={bucket} alt="Bucket" className="w-12 h-12" />,
              <img src={trolley} alt="Trolley" className="w-12 h-12" />,
            ]}
          />
          <h1 className="text-xl sm:text-2xl md:text-2xl font-rubikVinyl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-700 bg-opacity-50">
            Urban{" "}
            <span className="text-yellow-400 font-rubikVinyl">Store </span>
          </h1>
        </Link>

        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="flex gap-1">
          <div className="flex  gap-1 justify-center items-center lg:block">
            <Sheet
              open={openCartSheet}
              onOpenChange={(open) => setOpenCartSheet(open)}
            >
              <UserCartWrapper
                setOpenCartSheet={setOpenCartSheet}
                cartItems={cartItems?.items?.length ? cartItems.items : []}
              />
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
                <span className="sr-only">User Cart</span>
              </Button>
            </Sheet>

            <Sheet
              open={openMenuSheet}
              onOpenChange={(open) => setOpenMenuSheet(open)}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden w-10 h-10"
                  onClick={() => setOpenMenuSheet(true)}
                >
                  {/* <img className="w-8 h-8" src="/assets/icons/menu.gif"/> */}
                  <TiThMenu className="w-8 h-8" />
                  {/* <img className="w-8 h-8" src="/assets/icons/menu.gif"/> */}
                  <span className="sr-only">Toggle header menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-white">
                <HeaderRightContent />
                <div className="flex  w-full flex-col justify-center items-center mt-3">
                  {buttonsData.map((button, index) => (
                    <CustomButton
                      className="w-full"
                      onClick={() => setOpenMenuSheet(false)}
                      key={index}
                      text={button.text}
                      icon={button.icon}
                      endIcon={button.endIcon}
                      navigateTo={button.navigateTo}
                    />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <HeaderRightContent className="hidden" />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
