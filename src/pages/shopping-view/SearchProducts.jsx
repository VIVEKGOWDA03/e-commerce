import { Input } from "@/components/ui/input";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTitle from "./ProductTitle";
import CustomToast from "@/components/ui/CustomToast";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import { fetchProductsDetails } from "@/store/shop/products-slice";
import ProductDetailsDialog from "@/components/shopping-view/productdeatils";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    {
      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (items) => items.productId === getCurrentProductId
        );
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            setToast({
              isVisible: true,
              message: `Only ${getQuantity} items can be added.`,
              type: "info",
            });
            return;
          }
        }
      }
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
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductsDetails({ id: getCurrentProductId }));
  }
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults({ keyword: keyword }));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
  // console.log(keyword, "keyeye");

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="search products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No Result Found</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTitle
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
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

export default SearchProducts;
