import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleEdit,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  const isSelected = selectedId === addressInfo?._id;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        className={`border-2 rounded-lg shadow-md ${
          isSelected
            ? "border-green-500 bg-green-50"
            : "border-gray-300 bg-white"
        } cursor-pointer transition-all duration-200 hover:shadow-lg`}
        onClick={() =>
          setCurrentSelectedAddress
            ? setCurrentSelectedAddress(addressInfo)
            : null
        }
      >
        <CardContent className="grid gap-4 p-4">
          <Label className="font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Address:</span>{" "}
            {addressInfo?.address}
          </Label>
          <Label className="font-medium text-gray-700">
            <span className="font-semibold text-gray-900">City:</span>{" "}
            {addressInfo?.city}
          </Label>
          <Label className="font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Pincode:</span>{" "}
            {addressInfo?.pincode}
          </Label>
          <Label className="font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Phone:</span>{" "}
            {addressInfo?.phone}
          </Label>
          <Label className="font-medium text-gray-700">
            <span className="font-semibold text-gray-900">Note:</span>{" "}
            {addressInfo?.notes}
          </Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <button
            onClick={() => handleEditAddress(addressInfo)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteAddress(addressInfo)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Delete
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;
