import React from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="w-full min-h-fit flex-col  p-[5%] max-w-[1440px min-h-[660px] bg-gradient-to-b from-[#331f4e] to-black flex ">
      <h1 className="text-7xl xs:text-4xl flex gap-1 font-rubikVinyl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Urban
        <span className="text-yellow-400 text-[#ACC7ED pl-0.5 font-[400] font-rubikVinyl">
          Store
        </span>
      </h1>
      <p className="text-yellow-40 items-center flex gap-0.5 mt-[10px] text-[#ACC7ED]  font-[600] font-roboto">
        <IoPhonePortraitOutline className="text-yellow-200" />
        Experience the Urban store app
      </p>
      <div className="w-full gap-[50px] flex mt-[20px] h-auto  flex-wrap justify-between items-center ">
        <div className="app-ad-store flex  gap-4  h-[50px] ">
          <img
            className="h-[50px]"
            src="/assets/alert/appstores.png"
            alt="app-store"
          />
          <img
            className="h-[50px]"
            src="/assets/alert/playstore.png"
            alt="ad-store"
          />
        </div>

        <div className="social   justify-end flex gap-2">
          <a href="#" className="w-4 h-4">
            <img className="w-4 h-4" src="/assets/social/fb.svg" alt="fb" />
          </a>
          <a href="#" className="w-4 h-4">
            <img className="w-4 h-4" src="/assets/social/in.svg" alt="in" />
          </a>
          <a href="#" className="w-4 h-4">
            <img className="w-4 h-4" src="/assets/social/yt.svg" alt="yt" />
          </a>
          <a href="#" className="w-4 h-4">
            <img className="w-4 h-4" src="/assets/social/x.svg" alt="x" />
          </a>
        </div>
      </div>
      <div className=" text-gray-300 py-8 ">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* NEED HELP */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">NEED HELP</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  My Account
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Gift Vouchers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Community Initiatives
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  
                </a>
              </li>
            </ul>
          </div>

          {/* MORE INFO */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">MORE INFO</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400">
                  T&C
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* STORE NEAR ME */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">STORE NEAR ME</h3>
            <ul className="space-y-2">
            <li>
                <a href="#" className="hover:text-yellow-400">
                  Bengaluru
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Mumbai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Pune
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  New Delhi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  View More
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6">
            <span className="text-gray-400">COD Available</span>
            <span className="text-gray-400">30 Days Easy Returns</span>
          </div>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
