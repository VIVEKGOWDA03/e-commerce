import React from "react";
import { Spotlight } from "../ui/spotlight";

export function SpotlightPreview({
  images,
  isSmallScreen,
  showSplash,
  currentImage,
}) {
  return (
    <div
      className={`${
        showSplash && isSmallScreen ? "justify-between" : "justify-center"
      } flex flex-col h-full items-center pt-[20%] overflow-hidden gap-10`}
    >
      <h1 className=" text-7xl font-rubikVinyl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Urban{" "}
        <span className="text-yellow-400 font-[400] font-rubikVinyl">
          Store{" "}
        </span>
      </h1>
      <div className="w-full flex items-center pt-[50px] justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            className={`${
              showSplash && isSmallScreen ? "w-[180px] h-[180px] " : ""
            } absolute w-[120px] h-[120px] transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            src={image}
            alt={`Image-${index}`}
          />
        ))}
      </div>
      <div className="w-full py-[5%] flex flex-col text-xl font-sixtyfour font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        <span>Your Favorite!</span>
        <span>fashion Partner</span>
      </div>
    </div>
  );
}
