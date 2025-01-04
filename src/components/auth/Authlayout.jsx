import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ShimmerButton from "../ui/shimmer-button";
import RetroGrid from "../ui/retro-grid";
import IconCloud from "../ui/icon-cloud";
import { Spotlight } from "../ui/spotlight";
import { SpotlightPreview } from "../common/Spotlights";
import WorldMap from "../ui/world-map";

const Authlayout = () => {
  const iconSlugs = [
    "shopify",
    "woocommerce",
    "magento",
    "bigcommerce", // E-commerce platforms
    "paypal",
    "stripe",
    "klarna",
    "afterpay", // Payment services
    "fedex",
    "ups",
    "dhl", // Shipping services
    "facebook",
    "instagram",
    "pinterest",
    "tiktok", // Social media for marketing
    "gucci",
    "prada",
    "zara",
    "hm", // Fashion brands
    "shoes",
    "bags",
    "jewelry",
    "clothing", // Fashion categories
    "sustainable",
    "luxury",
    "fastfashion",
    "handmade",
  ];
  const dots = [
    {
      start: { lat: 28.7041, lng: 77.1025 },
      end: { lat: 19.076, lng: 72.8777 },
    },
    {
      start: { lat: 12.9716, lng: 77.5946 },
      end: { lat: 22.5726, lng: 88.3639 },
    },
  ];

  const [showSplash, setShowSplash] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const images = ["/assets/logos/trolley.png", "/assets/logos/bucket.png"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Cycle through images
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);
  // Check for small screen width
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true); // Set to true for small screens
    }
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      const timer = setTimeout(() => {
        setShowSplash(false); // Hide Section 1 after 2 seconds on small screens
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isSmallScreen]);

  return (
    <div className="w-full min-h-screen flex bg-black">
      {/* section-1 */}
      <div
        className={`${
          showSplash && isSmallScreen ? "flex w-full px-0" : "hidden"
        } bg-blak lg:flex items-center justify-center w-1/2 px-12 box-border`}
      >
        <div className="w-full flex flex-col items-center justify-center text-center h-[100vh]">
          <Spotlight
            className="-top-40 left-0 md:left-50 md:-top-20"
            fill="white"
          />
          <SpotlightPreview
            images={images}
            isSmallScreen={isSmallScreen}
            showSplash={showSplash}
            currentImage={currentImage}
            className=""
          />
          {/* <p className="top-[20%] left-[10% w-fit h-[120px] absolute font-cairoPlay text-xl text-white">
            Urban Store is an online fashion hub offering trendy products with a
            seamless shopping experience.
          </p> */}
        </div>
        {/* <IconCloud iconSlugs={iconSlugs} /> */}

        {/* <div className="w-ful absolute h-[100px bottom-0 ">
          <WorldMap dots={dots} />
        </div> */}
      </div>

      {/* section-2 */}
      <div
        className={`${
          !showSplash || !isSmallScreen ? "flex" : "hidden"
        } flex bg-red-20 bg-blac relative flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8`}
      >
        <div className="absolute bg-purple-300 inset-0 z-1">
          <RetroGrid />
        </div>
        <Outlet className="z-20" />
      </div>
    </div>
  );
};

export default Authlayout;
