import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ProductImageUploade = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);
  const baseUrl = import.meta.env.VITE_SHOP_APP_API_BASE_URL;

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }
  function handleDragOver(event) {
    event.preventDefault();
  }
  function handelDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  // console.log(imageFile);
  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      ` ${baseUrl}/api/admin/products/upload-image`,
      data
    );
    console.log(response.data, "response.data");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  // console.log(isEditMode);

  return (
    <div
      className={`w-full ${isCustomStyling ? " " : "max-w-md mx-auto mt-4"} `}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handelDrop}
        className={`${
          isEditMode ? "opacity-40" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disable={isEditMode}
        ></Input>
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-green-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <button
              varient="ghost"
              size="icon"
              className="text-muted-forground hover-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUploade;
