import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import { useToast } from "@/hooks/use-toast";

const ProductDetailsDialog = ({ setOpen, open, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(productDetails?._id,"productDetails");
  const { toast } = useToast();

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
      if (data?.payload?.success) {
        dispatch(fetchCartItems({ userId: user?.id }));
        setOpen(false);
        toast({
          title: "Product added to cart",
          type: "success",
        });
      }
    });
  }
  return (
    <div className="bg-white">
      <Dialog className="bg-white" open={open} onOpenChange={setOpen}>
        <DialogContent className=" bg-white grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className=" flex flex-col min-h-[10px] ">
            <h1 className="text-3xl  font-extrabold">
              {productDetails?.title}
            </h1>
            <p className="text-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through" : ""
                }`}
              >
                ₹ {productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-foreground">
                  ₹ {productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
              </div>
              <span className="text-foreground">(4.5)</span>
            </div>
            <div className="mt-5 w-full mb-5">
              <button
                onClick={() => handleAddtoCart(productDetails?._id)}
                className="w-full !bg-black rounded-[10px] btn-danger"
              >
                Add to cart
              </button>
            </div>
            <Separator />
            <div className="max-h-[300px] overflow-auto">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Vivek</h3>
                    </div>

                    <p className="text-foreground"> good product</p>
                  </div>
                </div>
              </div>
              <div className="mt-6  min-h-fit overflow-hidden w-full relative flex gap-2">
                <input
                  className="w-full pl-4 pr-16 py-2 border rounded-lg focus:outline-none"
                  placeholder="Write a review"
                />
                <button className="absolute pt-1 pb-1 rounded-md right-2 top-1/2 transform -translate-y-1/2 btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetailsDialog;
