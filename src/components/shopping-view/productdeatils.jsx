// Modernized ProductDetailsDialog.js with improved UI/UX
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
  const { reviews } = useSelector((state) => state.shopReview);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const [toast, setToast] = useState({ isVisible: false, message: "", type: "" });

  const handleRatingChange = (getRating) => setRating(getRating);

  const calculateDiscountPercentage = (price, salePrice) => {
    if (price <= 0 || salePrice < 0) return 0;
    return ((price - salePrice) / price * 100).toFixed(0);
  };

  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    const getCartItems = cartItems.items || [];
    const existingItem = getCartItems.find(item => item.productId === getCurrentProductId);
    if (existingItem && existingItem.quantity + 1 > getTotalStock) {
      setToast({ isVisible: true, message: `Only ${existingItem.quantity} items can be added.`, type: "info" });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems({ userId: user?.id }));
          setToast({ isVisible: true, message: "Product added to cart", type: "success" });
        }
      });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails(null));
    setRating(0);
    setreviewMsg("");
  };

  const handleAddReview = () => {
    const formData = {
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    };

    dispatch(addReview({ formData })).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setreviewMsg("");
        dispatch(getReview({ id: productDetails?._id }));
        setToast({ isVisible: true, message: "Review added", type: "success" });
      } else {
        setToast({ isVisible: true, message: data.payload.message || "Failed to add review.", type: "error" });
      }
    });
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReview({ id: productDetails?._id }));
    }
  }, [productDetails]);

  const averageReview =
    reviews?.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
      : 2;

  return (
    <div className="w-full h-auto font-sans">
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="bg-white p-6 sm:p-10 max-w-4xl w-full h-auto overflow-y-auto rounded-lg shadow-xl">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="rounded-md w-full h-[300px] object-cover"
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-gray-900">{productDetails?.brand}</h1>
              <p className="text-gray-700 text-sm">{productDetails?.description}</p>
              <div className="flex items-center gap-2">
                {productDetails?.price === productDetails?.salePrice ? (
                  <span className="text-xl font-semibold text-black">
                    ₹{productDetails?.salePrice}
                  </span>
                ) : (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      ₹{productDetails?.price}
                    </span>
                    <span className="text-xl font-bold text-black">
                      ₹{productDetails?.salePrice}
                    </span>
                    <span className="text-sm font-medium text-red-600">
                      {calculateDiscountPercentage(productDetails?.price, productDetails?.salePrice)}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <StarRating rating={averageReview} />
                <span className="text-sm text-gray-600">({averageReview.toFixed(1)})</span>
              </div>
              <div>
                {productDetails?.totalStock === 0 ? (
                  <Button disabled className="w-full bg-gray-300 text-white cursor-not-allowed">
                    Out of Stock
                  </Button>
                ) : (
                  <Button onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)} className="w-full">
                    Add to Cart
                  </Button>
                )}
              </div>
              <Separator />
              {reviews?.length > 0 && <h2 className="text-lg font-semibold">Reviews</h2>}
              <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                {reviews?.map((reviewItem, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {reviewItem?.userName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{reviewItem?.userName}</span>
                      <StarRating rating={reviewItem?.reviewValue} />
                      <p className="text-gray-600 text-sm">{reviewItem?.reviewMessage}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Label htmlFor="review">Write a Review</Label>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                  <Button
                    onClick={handleAddReview}
                    disabled={reviewMsg.trim() === ""}
                    className="text-sm"
                  >
                    Submit
                  </Button>
                </div>
                <Input
                  id="review"
                  name="reviewMsg"
                  value={reviewMsg}
                  onChange={(e) => setreviewMsg(e.target.value)}
                  className="mt-2"
                  placeholder="Share your thoughts..."
                />
              </div>
            </div>
          </div>
          <CustomToast
            className="z-50"
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
