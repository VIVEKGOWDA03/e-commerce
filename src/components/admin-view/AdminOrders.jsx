import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import RippleButton from "../ui/ripple-button";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./oder-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetAdminOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import Spinner from "../ui/Spinner";
const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDailog] = useState(false);
  const { orderList, orderDetails, isLoading } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin({ id: getId }));
  }
  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDailog(true);
  }, [orderDetails]);
  // console.log(orderDetails, "orderList");
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen absolute inset-0 bg-white bg-opacity-50">
        <div className="flex items-center">
          <Spinner size="large" color="red" />
          {/* <p className="ml-4 text-lg font-medium">Loading orders, please wait...</p> */}
        </div>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`px-3 py-1 hover:bg-orange-600 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : "bg-orange-400"
                        }`}
                      >
                        {orderItem?.orderStatus
                          ? orderItem.orderStatus.charAt(0).toUpperCase() +
                            orderItem.orderStatus.slice(1)
                          : ""}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      {/* <button className="btn">View Details</button> */}
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDailog(false);
                          dispatch(resetAdminOrderDetails());
                        }}
                        className=""
                      >
                        <RippleButton
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </RippleButton>
                        <AdminOrderDetailsView isLoading={isLoading} orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
