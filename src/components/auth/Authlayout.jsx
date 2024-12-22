import React from "react";
import { Outlet } from "react-router-dom";
import ShimmerButton from "../ui/shimmer-button";
import RetroGrid from "../ui/retro-grid";
import IconCloud from "../ui/icon-cloud";
import an2 from "../../assets/gifs/an4.gif";
import an6 from "../../assets/gifs/an6.gif";
import logo1 from "../../assets/logo/logo3.jpg";

const Authlayout = () => {
  const iconSlugs = [
   "shopify", "woocommerce", "magento", "bigcommerce", // E-commerce platforms
    "paypal", "stripe", "klarna", "afterpay", // Payment services
    "fedex", "ups", "dhl", // Shipping services
    "facebook", "instagram", "pinterest", "tiktok", // Social media for marketing
    "gucci", "prada", "zara", "hm", // Fashion brands
    "shoes", "bags", "jewelry", "clothing", // Fashion categories
    "sustainable", "luxury", "fastfashion", "handmade", 
  ];
  return (
    <div className="w-full min-h-screen flex bg-white">
      <div className="bg-blak hidden lg:flex items-center bg justify-center  w-1/2 px-12">
        <div className="max-w-md  space-y-6 text-center text-primary-foreground">
          <IconCloud iconSlugs={iconSlugs} />
          {/* <img src={logo1} /> */}
          {/* <img src={an2} /> */}
        </div>
      </div>
      <div className="flex bg-red-20 bg-blac relative flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute bg-purple-300 inset-0 z-1">
          <RetroGrid />
        </div>

        <Outlet className="z-20" />
      </div>
    </div>
  );
};

export default Authlayout;
