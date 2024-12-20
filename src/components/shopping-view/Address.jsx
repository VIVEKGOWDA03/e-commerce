import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import CommonForm from "../common/Form";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddress } from "@/store/shop/address-slice";
import AddressCard from "./AddressCard";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  function handleManageAddress(event) {
    event.preventDefault();
    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((data) => {
      // console.log(data, "aggaga");
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        setFormData(initialAddressFormData);
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  // function
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);
  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:frid-cols-3 gap-2 ">
        {addressList && (addressList.length > 0)
          ? addressList.map((singleAddressItem) => (
              <AddressCard addressInfo={singleAddressItem} />
            ))
          : <p>No addresses found</p>}
      </div>
      <CardHeader>
        <CardTitle> Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
