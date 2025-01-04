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
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/productdeatils";
import CustomToast from "@/components/ui/CustomToast";
import { getFeatureImages } from "@/store/common-slice";
import CustomCard from "@/components/common/CustomCard";

const ShoppingHome = () => {
  const slides = [b1, b2, b3, b4, b5, b6];
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonfeature);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // console.log(productList,"productList");
  const dispatch = useDispatch();
  const categoryWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];
  const brandWithIcon = [
    {
      id: "nike",
      label: "Nike",
      icon: MdCheckCircle,
    },
    {
      id: "adidas",
      label: "Adidas",
      icon: MdFitnessCenter,
    },
    {
      id: "puma",
      label: "Puma",
      icon: MdSportsSoccer,
    },
    {
      id: "levi",
      label: "Levi's",
      icon: MdStore,
    },
    {
      id: "hm",
      label: "H&M",
      icon: MdStorefront,
    },
    {
      id: "zara",
      label: "Zara",
      icon: MdShoppingBag,
    },
  ];

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
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
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
          message: "Order Status Updated",
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <div className="relative w-full sm:h-[400px] lg:h-[600px] h-[300px]  overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
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
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoryWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToLisitingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-black" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <motion.div
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
      </motion.div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToLisitingPage(brandItem, "Brand")}
                key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-red-400" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTitle
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
        <CustomCard title="title" productImage={productList?.im} />
      </section>
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
