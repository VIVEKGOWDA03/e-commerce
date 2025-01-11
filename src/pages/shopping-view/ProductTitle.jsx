import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Tooltip from "@/components/ui/Tooltip";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { DollarSignIcon, Star } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ShoppingProductTitle = ({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  classNameFooter,
}) => {
  const { reviews, isloading } = useSelector((state) => state.shopReview);

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
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 2;
  return (
    <StyledWrapper>
      <Card className="w-full bg-[#27272a min-h-[fit]  max-w-xs mx-auto">
        <div
          onClick={() => {
            handleGetProductDetails(product?._id);
          }}
          className="bg-red-40 min-h-fit"
        >
          <div className="relative">
            <img
              className="w-full h-[250px] xs:w-[180px]  xs:h-[200px] xs:object-fill object-fill "
              src={product.image}
              alt={product.title || "Product Image"}
              loading="lazy"
            />

            {product?.totalStock === 0 && (
              <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-600">
                Out of stock
              </Badge>
            )}
            {product?.salePrice > 0 &&
              calculateDiscountPercentage(product?.price, product?.salePrice) >
                0 && (
                <span className="text-[12px] font-roboto box-border justify-center px-1 bg-black w-fit max-w-[75%]  bottom-0 left-0 absolute flex items-center font-bold text-white">
                  -
                  {calculateDiscountPercentage(
                    product?.price,
                    product?.salePrice
                  )}
                  %{/* <p className="inline-block ml-1">OFF!</p> */}
                </span>
              )}
            {/* {product?.totalStock > 0 && product?.totalStock < 10 && (
              <Badge className="text-white absolute top-1 left-2 bg-yellow-500 hover:bg-yellow-500">
                Only {product?.totalStock} items left
              </Badge>
            )} */}

            {/* <span className="w-fit bg-slate-300 rounded-full p-0.5 px-1 font-roboto flex justify-center items-center gap-1 absolute text-[12px] font-bold bottom-2 left-3.5">
              {averageReview.toFixed(1)}{" "}
              <Star className="border-none w-3 h-3 fill-green-700" />
            </span> */}

            {/* {product?.salePrice > 0 && (
              <Badge className="absolute text-white top-16 left-2 bg-green-600 hover:bg-green-600">
                Sale
              </Badge>
            )} */}
          </div>

          <CardContent className=" bg-white font-roboto">
            <h2 className="text-xs pt-0.5 text-[10px  font-bold mb">
              {" "}
              {brandOptionsMap[product?.brand]}
            </h2>
            <div className="flex flex-col w-full gap-[2px]  justify-betwee items-cente mb-">
              <span className="text-[gray] text-xs font-[700] text-muted-foreground">
                {product?.title?.length > 5
                  ? `${product.title.slice(0, 25)}...`
                  : product?.title}
              </span>

              <p className="flex gap-1 items-center">
                {/* <span className=" w-fit  text-white bg-gradient-to-r from-yellow-400 to-yellow-600 py-0.5 px-1 rounded-full text-[8px] font-[700] shadow-lg text-center">
                  {categoryOptionsMap[product?.category]}
                  Deal of the day
                </span> */}
                {/* Discount Percentage */}
                {/* {product?.salePrice > 0 &&
                  calculateDiscountPercentage(
                    product?.price,
                    product?.salePrice
                  ) > 0 && (
                    <span className="text-[13px] flex items-center font-bold text-red-500">
                      {calculateDiscountPercentage(
                        product?.price,
                        product?.salePrice
                      )}
                      %<p className="inline-block ml-1">OFF!</p>
                    </span>
                  )} */}
              </p>
            </div>

            <div className="flex w-full gap-2 items-center mb-2">
              <div className="flex w-full gap-2 items-center mb-2">
                {/* Price and Sale Price Logic */}
                {product?.price === product?.salePrice ? (
                  // Show only salePrice when both are equal
                  <span className="text-[13px] font-semibold text-black flex items-center">
                    <p className="inline-block mr-1">₹</p>
                    {product?.salePrice?.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
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
                        <span className="flex font-semibold items-center  text-[gray]">
                          <p className="inline-block text-[13px] mr-1">₹</p>
                          {product?.price?.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      )}
                    </span>

                    {/* Sale Price */}
                    {product?.salePrice > 0 && (
                      <span className="text-[14px] font-bold text-black flex items-center">
                        <p className="inline-block  mr-1">₹</p>
                        {product?.salePrice?.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter
          className={`items-center xs:h-[25px p-2 w-full flex justify-center ${classNameFooter}`}
        >
          {product?.totalStock > 0 ? (
            <button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full font-roboto bg-black xs:py-0 py-2 flex bg-blue-60 justify-center text-white rounded-lg"
            >
              <Tooltip
                className="w-full text-[13px] font-roboto"
                text="Add To Cart"
                Price={product?.salePrice || product?.price}
              />
            </button>
          ) : (
            <button
              disabled
              className="w-full py-2 font-roboto flex opacity-60  bg-gray-400 justify-center text-white rounded-lg cursor-not-allowed"
            >
              <Tooltip
                className="font-roboto"
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
