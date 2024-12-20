import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({ addressInfo, handleEdit, handleDelete }) => {
  console.log(addressInfo, "");

  return (
    <div>
      <Card>
        <CardContent className="grid gap-4 p-4">
          <Label>Address :{addressInfo?.address}</Label>
          <Label>City : {addressInfo?.city}</Label>
          <Label>Pincode :{addressInfo?.pincode}</Label>
          <Label>Phone : {addressInfo?.phone}</Label>
          <Label> Note :{addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <button onClick={() => handleEdit(addressInfo)} className="btn">
            Edit
          </button>
          <button onClick={() => handleDelete(addressInfo)} className="btn">
            delete
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddressCard;
