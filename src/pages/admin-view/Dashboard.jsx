import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductImageUploade from "@/components/admin-view/image-uploade";
import { Button } from "@/components/ui/button";
import { addFeatureImages, deleteFeatureImage, getFeatureImages } from "@/store/common-slice";

const AdminDashboard = () => {
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { featureImageList, isLoading } = useSelector((state) => state.commonfeature);
  const dispatch = useDispatch();

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImages({ image: uploadedImageUrl })).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  const handleDeleteImage = (id) => {
    dispatch(deleteFeatureImage(id)).then(() => {
      dispatch(getFeatureImages());
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-16">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ProductImageUploade
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button
          onClick={handleUploadFeatureImage}
          className={`mt-5 w-full py-2 ${
            imageLoadingState || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={imageLoadingState || isLoading}
        >
          {imageLoadingState || isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Uploaded Feature Images
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((imgItem, index) => (
              <div
                key={imgItem._id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={imgItem?.image}
                  alt={`Feature Image ${index + 1}`}
                  className="w-full h-[200px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 text-white text-center py-2">
                  Feature Image {index + 1}
                  <button
                    className="ml-2 text-red-400 hover:text-red-600"
                    onClick={() => handleDeleteImage(imgItem._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No feature images uploaded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
