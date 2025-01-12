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
    "bigcommerce",
    "paypal",
    "stripe",
    "klarna",
    "afterpay",
    "fedex",
    "ups",
    "dhl",
    "facebook",
    "instagram",
    "pinterest",
    "tiktok",
    "gucci",
    "prada",
    "zara",
    "hm",
    "shoes",
    "bags",
    "jewelry",
    "clothing",
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

  const [showSplash, setShowSplash] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const images = ["/assets/logos/trolley.png", "/assets/logos/bucket.png"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Show splash only if it's the user's first visit
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowSplash(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Cycle through images
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true); // Set to true for small screens
    }
  }, []);

  useEffect(() => {
    if (showSplash && isSmallScreen) {
      const timer = setTimeout(() => {
        setShowSplash(false); // Hide splash after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [showSplash, isSmallScreen]);

  return (
    <div className="w-full min-h-screen flex bg-black">
      {/* Splash Screen Section */}
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
        </div>
      </div>

      {/* Main Content Section */}
      <div
        className={`${
          !showSplash || !isSmallScreen ? "flex" : "hidden"
        } flex bg-red-20 bg-black relative flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8`}
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
