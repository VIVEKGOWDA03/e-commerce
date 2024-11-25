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
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTitle from "./ProductTitle";

const ShoppingListingPage = () => {
  const { productList, isLoading } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
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
  }, []);
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, []);
  console.log(filters, filters);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filters} handleFilters={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex gap-4 items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-1"
                  variant="outline"
                  size="sm"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortBy.map((sortItem) => (
                    <DropdownMenuRadioItem
                      className="bg-blue-300 text-bold"
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
                // console.log(productItem, "productItem in map");
                return (
                  <ShoppingProductTitle
                    key={productItem.id}
                    product={productItem}
                  />
                );
              })
            : "No Product available"}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListingPage;
