import React, { useState } from "react";
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
import ShoppingOdersDetails from "./oder-details";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDailog] = useState(false);
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Orders History</CardTitle>
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
              <TableRow>
                <TableCell>1234543</TableCell>
                <TableCell>21/08/24024</TableCell>
                <TableCell>Inprocess</TableCell>
                <TableCell>₹500</TableCell>
                <TableCell>
                  {/* <button className="btn">View Details</button> */}
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={setOpenDetailsDailog}
                    className=""
                  >
                    <RippleButton onClick={() => setOpenDetailsDailog(true)}>
                      View Details
                    </RippleButton>
                    <ShoppingOdersDetails />
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingOrders;
