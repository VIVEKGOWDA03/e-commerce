
// AdminProducts.jsx - NEWLY IMPROVED COMPONENT
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductImageUploade from "@/components/admin-view/image-uploade";
import AdminProductTile from "@/components/admin-view/product-tile"; // Ensure this path is correct
import CommonForm from "@/components/common/Form"; // Assuming this component is functional
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"; // Import Button
import { addProductFormElements } from "@/config"; // Assuming this config is correct
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/admin/Product-Slice";
import { Loader2, PlusCircle } from "lucide-react"; // Import Loader2 for spinner, PlusCircle for add button
import CustomToast from "@/components/ui/CustomToast"; // Import CustomToast

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
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { isLoading, productList, error } = useSelector(
    (state) => state.adminProducts || {}
  );
  const [toastState, setToastState] = useState({ // Renamed to avoid conflict
    isVisible: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();

  // Function to show a toast message
  const showToast = (message, type = "success") => {
    setToastState({
      isVisible: true,
      message,
      type,
    });
  };

  function onSubmit(event) {
    event.preventDefault();

    // Basic validation for image upload in add mode
    if (currentEditedId === null && !uploadedImageUrl) {
      showToast("Please upload an image for the new product.", "warning");
      return;
    }

    const productDataToSubmit = currentEditedId !== null
      ? formData // For editing, formData already contains the image if it was pre-filled
      : { ...formData, image: uploadedImageUrl }; // For adding, use the newly uploaded image URL

    const action = currentEditedId !== null
      ? editProduct({ id: currentEditedId, formData: productDataToSubmit })
      : addNewProduct(productDataToSubmit);

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
        setopenCreateProductsDialog(false);
        setImageFile(null);
        setUploadedImageUrl(""); // Clear uploaded image URL after submission
        setFormData(initialFormData);
        setCurrentEditedId(null);
        showToast(
          currentEditedId !== null
            ? "Product updated successfully!"
            : "Product added successfully!",
          "success"
        );
      } else {
        showToast(
          currentEditedId !== null
            ? "Failed to update product."
            : "Failed to add product.",
          "error"
        );
      }
    }).catch(() => {
      showToast("An error occurred during product operation.", "error");
    });
  }

  function handleDelete(getCurrentProductId) {
    if (window.confirm("Are you sure you want to delete this product?")) { // Use a custom modal instead of window.confirm
      dispatch(deleteProduct({ id: getCurrentProductId })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          showToast("Product deleted successfully!", "success");
        } else {
          showToast("Failed to delete product.", "error");
        }
      }).catch(() => {
        showToast("An error occurred while deleting product.", "error");
      });
    }
  }

  function isFormValid() {
    // Check all fields from formData are not empty
    const allFieldsFilled = Object.keys(formData).every(key => {
      // Allow image to be null/empty if in edit mode and no new image is uploaded
      if (key === "image" && currentEditedId !== null) {
        return true;
      }
      return formData[key] !== "" && formData[key] !== null;
    });

    // For add mode, ensure an image is uploaded
    const isImageUploaded = currentEditedId !== null || (uploadedImageUrl !== "" && uploadedImageUrl !== null);

    return allFieldsFilled && isImageUploaded;
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  // Effect to set image URL when editing an existing product
  useEffect(() => {
    if (currentEditedId !== null && formData?.image) {
      setUploadedImageUrl(formData.image);
    } else {
      setUploadedImageUrl(""); // Clear image URL when adding a new product
    }
  }, [currentEditedId, formData]);


  return (
    <Fragment>
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm font-roboto">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <Button
          onClick={() => {
            setopenCreateProductsDialog(true);
            setCurrentEditedId(null); // Ensure no ID is set for new product
            setFormData(initialFormData); // Reset form for new product
            setImageFile(null);
            setUploadedImageUrl(""); // Clear image for new product
          }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Product
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="ml-3 text-lg text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md text-red-500 text-lg">
          <p>Error: {error.message || "Failed to fetch products."}</p>
        </div>
      ) : productList && productList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-white rounded-lg shadow-md">
          {productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id} // Added key prop
              setFormData={setFormData}
              setopenCreateProductsDialog={setopenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md text-gray-600 text-lg">
          <p>No products found. Add a new product to get started!</p>
        </div>
      )}

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setopenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setImageFile(null); // Clear image file on close
          setUploadedImageUrl(""); // Clear uploaded image URL on close
        }}
      >
        <SheetContent className="overflow-auto bg-white w-full sm:max-w-md md:max-w-lg lg:max-w-xl" side="right">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="text-2xl font-bold text-gray-800">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <ProductImageUploade
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Save Changes" : "Add Product"}
              isBtnDisabled={!isFormValid() || imageLoadingState || isLoading} // Disable if form is invalid or loading
            />
          </div>
        </SheetContent>
      </Sheet>

      <CustomToast
        className="z-50"
        message={toastState.message}
        type={toastState.type}
        isVisible={toastState.isVisible}
        onClose={() => setToastState({ ...toastState, isVisible: false })}
      />
    </Fragment>
  );
};

export default AdminProducts;