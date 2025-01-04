import React, { useEffect, useState } from "react";
import ProductFilter from "./Filter";
import {
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { sortBy } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductsDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTitle from "./ProductTitle";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/productdeatils";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import CustomToast from "@/components/ui/CustomToast";
const ShoppingListingPage = () => {
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  //  console.log("user:", user);
  // console.log(cartItems, "cartItems");

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const categorySearchParams = searchParams.get("category");
  function createsearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  }
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductsDetails({ id: getCurrentProductId }));
  }
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    // console.log(cartItems, "cartItems");
    // console.log(getTotalStock, "getTotalStock");

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

  function handleSort(value) {
    setSort(value);
  }
  function handleFilter(getSectionId, getCurrentOptions) {
    console.log(getSectionId, getCurrentOptions);
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOptions);
      if (indexOfCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOptions);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }
  if (isLoading) {
    <div>Loading...</div>;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    setSort("price-high-low");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createsearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);
  // console.log(productDetails, "productDetails");
  // console.log(productList, "productLisysys");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filters} handleFilters={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex gap-4 items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="font-cairoPlay">
              {productList.length} Products
            </span>
            <DropdownMenu className="z-50">
              <DropdownMenuTrigger asChild className="z-50">
                <button
                  className="flex items-center gap-1"
                  variant="outline"
                  size="sm"
                >
                  <ArrowUpDownIcon className="h-4 w-4 " />
                  <span className="font-cairoPlay">Sort by</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-30 w-[200px]">
                <DropdownMenuRadioGroup
                  className="z-10"
                  value={sort}
                  onValueChange={handleSort}
                >
                  {sortBy.map((sortItem) => (
                    <DropdownMenuRadioItem
                      className="bg-blue-200 z-30 px-3 py-2 text-bold font-cairoPlay border border-gray-300 rounded-lg shadow-sm hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => {
                // console.log(productItem._id, "productItem in map");
                return (
                  <ShoppingProductTitle
                    key={productItem._id}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddtoCart={handleAddtoCart}
                  />
                );
              })
            : "No Product available"}
        </div>
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

export default ShoppingListingPage;
