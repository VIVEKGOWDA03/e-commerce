import {
  House,
  LogOut,
  ShoppingCart,
  SquareMenu,
  SquareUserRound,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/cart-slice";

const ShoppingHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  // console.log(cartItems, "cartItemsccccccccc");
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }
  useEffect(() => {
    if (user?.id) {
      console.log("Fetching cart items for user:", user.id);
      dispatch(fetchCartItems({ userId: user?.id }));
    }
  }, [dispatch, user?.id]);
  function MenuItems() {
    return (
      <nav className="flex flex-col mt-4 mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Link
            className="text-sm font-medium"
            to={menuItem.path}
            key={menuItem.id}
          >
            {menuItem.label}
          </Link>
        ))}
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
          <button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="sr-only "> User Cart</span>
          </button>
          <UserCartWrapper
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
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2 ">
          <House className="w-6 h-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button variant="outline" size="icon " className="lg:hidden">
              <SquareMenu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white">
            <HeaderRightContent />
            <MenuItems className="mt-3" />
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
