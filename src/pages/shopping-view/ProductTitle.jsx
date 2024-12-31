import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Tooltip from "@/components/ui/Tooltip";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { DollarSignIcon } from "lucide-react";
import React from "react";

const ShoppingProductTitle = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  // console.log(product?._id,"product?._id");

  return (
    <Card className="w-full  max-w-sm mx-auto">
      <div
        onClick={() => {
          handleGetProductDetails(product?._id);
        }}
        className=""
      >
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover rounded-t-lg"
            src={product.image}
            alt={product.title || "Product Image"}
          />

          {product?.totalStock === 0 && (
            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
              Out of stock
            </Badge>
          )}

          {product?.totalStock > 0 && product?.totalStock < 10 && (
            <Badge className="text-white absolute top-10 left-2 bg-yellow-500 hover:bg-yellow-500">
              Only {product?.totalStock} items left
            </Badge>
          )}

          {product?.salePrice > 0 && (
            <Badge className="absolute text-white top-16 left-2 bg-green-600 hover:bg-green-600">
              Sale
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex w-full  justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex w-full justify-between items-center mb-2">
            {/* Regular Price */}
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold flex items-center text-primary`}
            >
              {product?.price > 0 ? (
                <span className=" flex items-center text-lg font-semibold text-black">
                  <p className="inline-block  mr-1">₹</p>
                  {/* <DollarSignIcon className="inline-block w-4 h-4 mr-1" /> */}
                  {product?.price}
                </span>
              ) : null}
            </span>

            {/* Sale Price */}
            <span
              className={`${
                product?.salePrice > 0 ? "text-red-600" : ""
              } text-lg font-semibold text-primary`}
            >
              {product?.salePrice > 0 ? (
                <span className="text-lg flex items-center font-semibold text-red-600">
                  <p className="inline-block  mr-1">₹</p>
                  {/* <DollarSignIcon className="inline-block w-4 h-4 mr-1" /> */}
                  {product?.salePrice}
                </span>
              ) : null}
            </span>
          </div>
        </CardContent>
      </div>
      <CardFooter className="items-center w-full flex justify-center">
  {product?.totalStock > 0 ? (
    <button
      onClick={() => handleAddtoCart(product?._id,product?.totalStock)}
      className="w-fit py-2 flex bg-blue-60 justify-center text-white rounded-lg"
    >
      <Tooltip
      className="w-full"
        text="Add To Cart"
        Price={product?.salePrice || product?.price}
      />
    </button>
  ) : (
    <button
      disabled
      className="w-full py-2 flex opacity-60  bg-gray-400 justify-center text-white rounded-lg cursor-not-allowed"
    >
      <Tooltip
        text="Out of Stock"
        Price={product?.salePrice || product?.price}
      />
    </button>
  )}
</CardFooter>

    </Card>
  );
};

export default ShoppingProductTitle;
