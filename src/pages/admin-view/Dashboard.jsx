import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeatureImages,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common-slice";

import ProductImageUploade from "@/components/admin-view/image-uploade";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { featureImageList, isLoading } = useSelector(
    (state) => state.commonfeature
  );

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const handleUploadFeatureImage = () => {
    if (!uploadedImageUrl) return;
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
    <motion.div
      className="min-h-screen bg-gray-100 py-8 px-4 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Upload Panel */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Upload Feature Image
        </h2>
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
          disabled={imageLoadingState || isLoading}
          className={`mt-5 w-full py-2 text-white ${
            imageLoadingState || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {imageLoadingState || isLoading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>

      {/* Image List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Uploaded Feature Images
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {featureImageList?.length > 0 ? (
            featureImageList.map((imgItem, index) => (
              <motion.div
                key={imgItem._id}
                className="relative rounded-lg overflow-hidden shadow-lg bg-white group"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <img
                  src={imgItem.image}
                  alt={`Feature ${index + 1}`}
                  className="w-full h-[200px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white px-3 py-2 flex items-center justify-between text-sm">
                  <span>Feature {index + 1}</span>
                  <button
                    onClick={() => handleDeleteImage(imgItem._id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No feature images uploaded yet.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
