import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";
const initialFormData = {
  satus: "",
};
const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);
  function handleUpdateStatus(event) {
    event.preventDefault();
  }
  return (
    <div>
      <DialogContent className="sm:max-w-[600px] bg-yellow-50">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex mt-6  items-center justify-between">
              <p className="font-medium "> Order Id </p>
              <Label>123456</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Order Date </p>
              <Label>02/08/2024</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Order Price </p>
              <Label>₹ 500</Label>
            </div>
            <div className="flex mt-2  items-center justify-between">
              <p className="font-medium "> Order Status </p>
              <Label>Inpro</Label>
            </div>
          </div>
          <Separator />
          <hr></hr>
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3 ">
                <li className="flex items-center justify-between">
                  <span>product one</span>
                  <span> ₹ 500</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <div className="font-medium">Shipping info</div>
              <div className="grid gap-0.5 text-muted">
                <span className="text-black">vivek</span>
                <span className="text-black">Address</span>
                <span className="text-black">city</span>
                <span className="text-black">pincode</span>
                <span className="text-black">phone</span>
                <span className="text-black">notes</span>
              </div>
            </div>
          </div>
          <div className="">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
              formControls={[
                {
                  label: "Order Status",
                  name: "Status",
                  componenttype: "select",
                  options: [
                    {
                      id: "pending",
                      label: "Pending",
                    },
                    {
                      id: "inProcess",
                      label: "In Process",
                    },
                    {
                      id: "inShipping",
                      label: "In Shipping",
                    },
                    {
                      id: "deliverd",
                      label: "Deliverd",
                    },
                    {
                      id: "rejected",
                      label: "Rejected",
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default AdminOrderDetailsView;
