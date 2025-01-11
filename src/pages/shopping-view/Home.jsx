import React, { useState, useEffect } from "react";
import b1 from "../../assets/banners/b1.webp";
import b2 from "../../assets/banners/b2.webp";
import b3 from "../../assets/banners/b3.webp";
import b4 from "../../assets/banners/b4.webp";
import b5 from "../../assets/banners/b5.webp";
import b6 from "../../assets/banners/b6.webp";
import an1 from "../../assets/gifs/an5.gif";
import an2 from "../../assets/gifs/an4.gif";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductsDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTitle from "./ProductTitle";
import {
  MdCheckCircle,
  MdFitnessCenter,
  MdSportsSoccer,
  MdStore,
  MdStorefront,
  MdShoppingBag,
  MdMore,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/productdeatils";
import CustomToast from "@/components/ui/CustomToast";
import { getFeatureImages } from "@/store/common-slice";
import CustomCard from "@/components/common/CustomCard";
import Footer from "@/components/shopping-view/Footer";
import { brandWithImages, categoryWithImages, images, products, settings } from "@/config";
import Loading from "@/components/common/Loading";
import Slider from "react-slick";
import { HeroParallax } from "@/components/ui/hero-parallax";

const ShoppingHome = () => {
  // const slides = [b1, b2, b3, b4, b5, b6];
  // const slides = ["/assets/imp/off3.webp","/assets/imp/off2.png","/assets/imp/off1.jpg",];
  const slides = [
    "/assets/imp/s1.webp",
    "/assets/imp/s2.webp",
    "/assets/imp/s3.webp",
    "/assets/imp/s4.webp",
    "/assets/imp/s5.webp",
    "/assets/imp/s6.webp",
  ];

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonfeature);
  const { isLoading } = useSelector((state) => state.auth);

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // console.log(productList,"productList");
  const dispatch = useDispatch();
  const [displayProducts, setDisplayProducts] = useState(productList);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to handle window resize event
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // If screen width is 425px or smaller, select 8 random products
    if (windowWidth <= 425) {
      const randomProducts = getRandomProducts(productList, 8);
      setDisplayProducts(randomProducts);
    } else {
      // Show all products for larger screens
      setDisplayProducts(productList);
    }
  }, [windowWidth, productList]);
  if (isLoading) {
    return <Loading />;
  }
  // Function to get random products from the product list
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  // Automatically transition to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides.length]);

  // Function to navigate to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to navigate to the previous slide
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  function handleNavigateToLisitingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");

    if (getCurrentItem.id !== "all") {
      const currentFilter = {
        [section]: [getCurrentItem.id],
      };
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    }

    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId, "getCurrentProductId");
    dispatch(fetchProductsDetails({ id: getCurrentProductId }));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user?.id) {
      console.log("User is not logged in or userId is missing");
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      // console.log(data,"datatatat");
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));

        setToast({
          isVisible: true,
          message: "Product added to cart",
          type: "success",
        });
      }
    });
  }
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
  return (
    <div className="flex flex-col mt-16 min-h-screen">
      {/* Hero Carousel */}
      <div className="relative w-full bg-slate-20 bg-gradient-to-t from-[#F3F6D5] via-[#DAF8E3] to-white h-[600px] items-center  lg:h-[91vh]  overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  max-w-[1220px] lg:w-[90vw]  w-full h-full object-fit transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            src={slide}
            alt={`Slide ${index + 1}`}
          />
        ))}

        {/* Previous Button */}
        <button
          onClick={goToPrevSlide}
          aria-label="Previous Slide"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={goToNextSlide}
          aria-label="Next Slide"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-gray-5 bg-custom-gradien bg-gradient-to-b from-[#F3F6D5] via-[#DAF8E3] to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl  font-bold font-cairoPlay text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {categoryWithImages.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToLisitingPage(categoryItem, "Category")
                }
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex bg-slate-20 flex-col items-center justify-center p-6">
                  <img
                    src={categoryItem.image}
                    alt={`${categoryItem.label} icon`}
                    style={{
                      width: `${categoryItem.size.width}px`,
                      height: `${categoryItem.size.height}px`,
                    }}
                    className="  object-contain"
                    loading="lazy"
                  />
                  <span className="font-bold font-roboto">
                    {categoryItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* <img src="/assets/alert/banner1.svg"
          alt="Image"/> */}
      {/* <motion.div
        style={{ overflow: "hidden", width: "100%" }} // Container to hide overflow
      >
        <motion.img
          src={an2}
          alt="Image"
          style={{ width: "200px" }} // Adjust the width as needed
          initial={{ x: "-100vw" }} // Start position (off-screen left)
          animate={{
            x: ["-100vw", "100vw"], // Move from left to right across the full width of the screen
          }}
          transition={{
            duration: 5, // Time it takes to move from left to right
            repeat: Infinity,
            // repeatType: 'reverse',
            ease: "easeInOut",
          }}
        />
      </motion.div> */}
      <section className="py-12 bg-gray-10 bg-gradient-to-t from-[#F3F6D5] via-[#DAF8E3] to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center font-cairoPlay mb-8">
            Shop By Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {brandWithImages.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToLisitingPage(brandItem, "Brand")}
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={brandItem.image}
                    alt={`${brandItem.label} logo`}
                    className="w-12 h-12 mb-4 object-contain"
                    loading="lazy"
                  />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 hidden xs:block sm:hidden md:hidden lg:hidden">
      <Slider {...settings}>
        {images.map((imgPath, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={imgPath}
              alt={`Slide ${index + 1}`}
              className="w-full h-fit object-fit px-12"
            />
          </div>
        ))}
      </Slider>
    </section>
    <HeroParallax className=" bg-[#E3F7DE]"  products={products}/>

      <section className="py-12 bg-purple-40 ">
        <div className="containe mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xs:gap-2 gap-6">
            {displayProducts && displayProducts.length > 0
              ? displayProducts.map((productItem) => (
                  <ShoppingProductTitle
                    key={productItem.id} // Assuming productItem has an 'id' property
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    classNameFooter={"xs:hidden"}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
        {/* <CustomCard title="title" productImage={productList?.im} /> */}
      </section>
      <footer>
        <Footer className="w-full" />
      </footer>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <CustomToast
        className="z-100"
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default ShoppingHome;
