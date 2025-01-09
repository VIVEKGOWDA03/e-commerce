import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import CustomToast from "../ui/CustomToast";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addReview, getReview } from "@/store/shop/review-slice";

const ProductDetailsDialog = ({ setOpen, open, productDetails }) => {
  const dispatch = useDispatch();
  const [reviewMsg, setreviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  // console.log(productDetails?._id, "hdhdhdh");

  const { reviews, isloading } = useSelector((state) => state.shopReview);
  // console.log(reviews, "log");

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  function handleRatingChange(getRating) {
    setRating(getRating);
  }
  const price = productDetails?.price;
  const salePrice = productDetails?.salePrice;
  function calculateDiscountPercentage(price, salePrice) {
    if (price <= 0 || salePrice < 0) {
      return 0; // Return 0 if the price or salePrice is invalid
    }

    const discount = price - salePrice;
    const discountPercentage = (discount / price) * 100;
    return discountPercentage.toFixed(0); // Return the percentage rounded to 2 decimal places
  }
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
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));
        setOpen(false);
        setToast({
          isVisible: true,
          message: "Product added to cart",
          type: "success",
        });
      }
    });
  }
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails(null));
    setRating(0);
    setreviewMsg("");
  }
  function handleAddReview() {
    const formData = {
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    };

    console.log("Form Data:", formData); // Log the formData for debugging

    dispatch(addReview({ formData })).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setreviewMsg("");
        dispatch(getReview({ id: productDetails?._id }));
        setToast({
          isVisible: true,
          message: "Review added",
          type: "success",
        });
      } else {
        setToast({
          isVisible: true,
          message: data.payload.message || "Failed to add review.",
          type: "error",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      console.log("Fetching reviews for product:", productDetails?._id); // Debugging
      dispatch(getReview({ id: productDetails?._id }));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 2;
  return (
    <div className="w-full h-auto">
      <Dialog
        className="bg-white w-full overflow-auto"
        open={open}
        onOpenChange={handleDialogClose}
      >
        <DialogContent className=" bg-white pb-[10%] overflow-auto sm:flex sm:w-full sm:h-fit gap-5 sm:p-12 h-[100vh] max-w-[fit] sm:max-w-[fit] lg:max-w-[fit]">
          <div className="relative w-fit h-auto overflow-auto rounded-l">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              // width={600}
              // height={600}
              className="aspect-square w-[full] h-[200px] object-cover"
            />
          </div>
          <div className=" flex flex-col min-h-[10px] ">
            <h1 className="text-3xl  font-extrabold">
              {productDetails?.title}
            </h1>
            <p className="text-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
            <div className="flex w-full gap-2 items-center mb-2">
              {/* Price and Sale Price Logic */}
              {productDetails?.price === productDetails?.salePrice ? (
                // Show only salePrice when both are equal
                <span className="text-lg font-semibold text-black flex items-center">
                  <p className="inline-block mr-1">₹</p>
                  {productDetails?.salePrice}
                </span>
              ) : (
                <>
                  {/* Regular Price */}
                  <span
                    className={`${
                      productDetails?.salePrice > 0 ? "line-through" : ""
                    } text-sm flex items-center text-[gray]`}
                  >
                    {productDetails?.price > 0 && (
                      <span className="flex items-center font-[10px] text-[gray]">
                        <p className="inline-block mr-1">₹</p>
                        {productDetails?.price}
                      </span>
                    )}
                  </span>

                  {/* Sale Price */}
                  {productDetails?.salePrice > 0 && (
                    <span className="text-lg font-bold text-black flex items-center">
                      <p className="inline-block mr-1">₹</p>
                      {productDetails?.salePrice}
                    </span>
                  )}
                </>
              )}

              {/* Discount Percentage */}
              {productDetails?.salePrice > 0 &&
                calculateDiscountPercentage(
                  productDetails?.price,
                  productDetails?.salePrice
                ) > 0 && (
                  <span className="text-sm flex items-center font-bold text-red-500">
                    {calculateDiscountPercentage(
                      productDetails?.price,
                      productDetails?.salePrice
                    )}
                    %<p className="inline-block ml-1">OFF!</p>
                  </span>
                )}
            </div>
            <div className="flex font-roboto  items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarRating rating={averageReview} />
              </div>
              <span className="text-foreground">
                ({averageReview.toFixed(1)})
              </span>
            </div>
            <div className="mt-5 w-full mb-5">
              {productDetails?.totalStock === 0 ? (
                <button className="w-full !bg-black opacity-60 cursor-not-allowed rounded-[10px] btn-danger">
                  Out of stock
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleAddtoCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                  className="w-full font-roboto  !bg-black rounded-[10px] btn-danger"
                >
                  Add to cart
                </button>
              )}
            </div>
            <Separator />
            <div className={` max-h-[300px] overflow-auto font-roboto }`}>
              {reviews && reviews.length > 0 ? (
                <h2 className={` text-xl font-bold mb-4  `}>Reviews</h2>
              ) : null}
              <div className="grid gap-6">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div className="flex gap-4 font-roboto">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {reviewItem?.userName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarRating rating={reviewItem?.reviewValue} />
                        </div>
                        <p className="text-foreground">
                          {reviewItem?.reviewMessage}{" "}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1></h1>
                )}
              </div>

              <div className=" mt-10 font-roboto flex-col min-h-fit overflow-hidden w-full relative flex gap-2">
                <Label>Write a review</Label>
                <div className="flex gap-2 ">
                  <StarRating
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                  <Button
                    onClick={handleAddReview}
                    disabled={reviewMsg.trim() === ""}
                    className=" btn-primary"
                  >
                    Submit
                  </Button>
                </div>
                <Input
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(event) => setreviewMsg(event.target.value)}
                  className="pl-4 pr-16 py-2 font-roboto border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Write a review"
                />
              </div>
            </div>
          </div>
          <CustomToast
            className="z-100"
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={() => setToast({ ...toast, isVisible: false })}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailsDialog;
