import ProductImageUploade from "@/components/admin-view/image-uploade";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/Form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/Product-Slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminProducts = () => {
  const [openCreateProductsDialog, setopenCreateProductsDialog] =
    useState(false);
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { isLoading, productList, error } = useSelector(
    (state) => state.adminProducts || {}
  );
  console.log(productList, "productList");
  const { toast } = useToast();
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          // console.log(data, "edited data");
          dispatch(fetchAllProduct());
          setFormData(initialFormData);
          setopenCreateProductsDialog(false);
          setCurrentEditedId(null);
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data, "data");
          if (data?.payload?.success) {
            dispatch(fetchAllProduct());
            setopenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product added successfully ",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct({ id: getCurrentProductId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
      }
    });
  }
  function isformValid() {
    return Object.keys(formData)
      .map((keys) => formData[keys] !== "")
      .every((keys) => keys);
  }
  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);
  // console.log(formData, "formData");

  return (
    <Fragment>
      <div className="mb-5  w-full flex justify-end">
        <button onClick={() => setopenCreateProductsDialog(true)}>
          Add New Product
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-flow-col-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setopenCreateProductsDialog={setopenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setopenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent className="overflow-auto bg-white" side="right">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product " : " Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUploade
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6 ">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isformValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
