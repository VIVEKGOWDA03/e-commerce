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
import AdminOrderDetailsView from "./oder-details";
const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
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
            <TableRow>
              <TableCell>1234543</TableCell>
              <TableCell>21/08/24024</TableCell>
              <TableCell>Inprocess</TableCell>
              <TableCell>₹500</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  {/* <button onClick={() => setOpenDetailsDialog(true)} className="btn">View Details</button> */}

                  <RippleButton onClick={() => setOpenDetailsDialog(true)}>
                    View Details
                  </RippleButton>
                  <AdminOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
