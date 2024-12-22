import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleEdit,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) => {
  // console.log(addressInfo, "");

  return (
    <div>
      <Card
        onClick={() =>
          setCurrentSelectedAddress
            ? setCurrentSelectedAddress(addressInfo)
            : null
        }
      >
        <CardContent className="grid gap-4 p-4">
          <Label>Address :{addressInfo?.address}</Label>
          <Label>City : {addressInfo?.city}</Label>
          <Label>Pincode :{addressInfo?.pincode}</Label>
          <Label>Phone : {addressInfo?.phone}</Label>
          <Label> Note :{addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <button
            onClick={() => handleEditAddress(addressInfo)}
            className="btn"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteAddress(addressInfo)}
            className="btn"
          >
            delete
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;
