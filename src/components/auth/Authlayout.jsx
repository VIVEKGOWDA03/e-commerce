// import React from "react";
// import { Outlet } from "react-router-dom";
// import ShimmerButton from "../ui/shimmer-button";

// const Authlayout = () => {
//   return (
//     <div className="w-full min-h-screen flex bg-white">
//       <div className="bg-black hidden lg:flex items-center justify-center  w-1/2 px-12">
//         <div className="max-w-md  space-y-6 text-center text-primary-foreground">
//           {/* <p className="text-4xl text-[red] font-extrabold tracking-tighter">
//             welcome to shop
//           </p> */}
//           <ShimmerButton>
//           welcome to shop

//           </ShimmerButton>
//         </div>
//       </div>
//       <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Authlayout;

import React from "react";
import { Outlet } from "react-router-dom";
import ShimmerButton from "../ui/shimmer-button";
import RetroGrid from "../ui/retro-grid";
import IconCloud from "../ui/icon-cloud";

const Authlayout = () => {
  const iconSlugs = [
    "shopify", "woocommerce", "magento", "bigcommerce", // E-commerce platforms
    "paypal", "stripe", "square", // Payment services
    "fedex", "ups", "dhl", // Shipping services
    "facebook", "instagram", "pinterest", "twitter" // Marketing and social media
  ];
  return (
    <div className="w-full min-h-screen flex bg-white">
      <div className="bg-blak hidden lg:flex items-center justify-center  w-1/2 px-12">
        <div className="max-w-md  space-y-6 text-center text-primary-foreground">
        {/* <RetroGrid></RetroGrid> */}
        <IconCloud iconSlugs={iconSlugs} />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Authlayout;
