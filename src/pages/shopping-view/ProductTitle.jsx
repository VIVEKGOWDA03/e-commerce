import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Tooltip from "@/components/ui/Tooltip";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { DollarSignIcon } from "lucide-react";
import React from "react";
import styled from "styled-components";

const ShoppingProductTitle = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) => {
  // console.log(product?._id,"product?._id");
  const price = product?.price;
  const salePrice = product?.salePrice;
  function calculateDiscountPercentage(price, salePrice) {
    if (price <= 0 || salePrice < 0) {
      return 0; // Return 0 if the price or salePrice is invalid
    }

    const discount = price - salePrice;
    const discountPercentage = (discount / price) * 100;
    return discountPercentage.toFixed(0); // Return the percentage rounded to 2 decimal places
  }
  return (
    <StyledWrapper>
      <Card className="w-full bg-[#27272a  max-w-sm mx-auto">
        <div
          onClick={() => {
            handleGetProductDetails(product?._id);
          }}
          className=""
        >
          <div className="relative">
            <img
              className="w-full h-[200px] object-cover rounded-t-lg"
              src={product.image}
              alt={product.title || "Product Image"}
            />

            {product?.totalStock === 0 && (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
                Out of stock
              </Badge>
            )}

            {product?.totalStock > 0 && product?.totalStock < 10 && (
              <Badge className="text-white absolute top-1 left-2 bg-yellow-500 hover:bg-yellow-500">
                Only {product?.totalStock} items left
              </Badge>
            )}

            {/* {product?.salePrice > 0 && (
              <Badge className="absolute text-white top-16 left-2 bg-green-600 hover:bg-green-600">
                Sale
              </Badge>
            )} */}
          </div>

          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-">
              {" "}
              {brandOptionsMap[product?.brand]}
            </h2>
            <div className="flex flex-col w-full gap-[2px]  justify-betwee items-cente mb-">
              <span className=" text-[gray] font-[700] text-muted-foreground">
                {product?.title}
              </span>
              <span className=" w-fit text-white bg-gradient-to-r from-yellow-400 to-yellow-600 py-0.5 px-1 rounded-full text-[10px] font-[700] shadow-lg text-center">
                {/* {categoryOptionsMap[product?.category]} */}
                Deal of the day
              </span>
            </div>

            <div className="flex w-full gap-2 items-center mb-2">
              <div className="flex w-full gap-2 items-center mb-2">
                {/* Price and Sale Price Logic */}
                {product?.price === product?.salePrice ? (
                  // Show only salePrice when both are equal
                  <span className="text-lg font-semibold text-black flex items-center">
                    <p className="inline-block mr-1">₹</p>
                    {product?.salePrice}
                  </span>
                ) : (
                  <>
                    {/* Regular Price */}
                    <span
                      className={`${
                        product?.salePrice > 0 ? "line-through" : ""
                      } text-sm flex items-center text-[gray]`}
                    >
                      {product?.price > 0 && (
                        <span className="flex items-center font-[10px] text-[gray]">
                          <p className="inline-block mr-1">₹</p>
                          {product?.price}
                        </span>
                      )}
                    </span>

                    {/* Sale Price */}
                    {product?.salePrice > 0 && (
                      <span className="text-lg font-bold text-black flex items-center">
                        <p className="inline-block mr-1">₹</p>
                        {product?.salePrice}
                      </span>
                    )}
                  </>
                )}

                {/* Discount Percentage */}
                {product?.salePrice > 0 &&
                  calculateDiscountPercentage(
                    product?.price,
                    product?.salePrice
                  ) > 0 && (
                    <span className="text-sm flex items-center font-bold text-red-500">
                      {calculateDiscountPercentage(
                        product?.price,
                        product?.salePrice
                      )}
                      %<p className="inline-block ml-1">OFF!</p>
                    </span>
                  )}
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="items-center w-full flex justify-center">
          {product?.totalStock > 0 ? (
            <button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    box-sizing: border-box;
    width: 190px;
    height: 254px;
    background: rgba(217, 217, 217, 0.58);
    border: 1px solid white;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    color: black;
  }

  .card:hover {
    border: 1px solid black;
    transform: scale(1.05);
  }

  .card:active {
    transform: scale(0.95) rotateZ(1.7deg);
  }
`;

export default ShoppingProductTitle;
