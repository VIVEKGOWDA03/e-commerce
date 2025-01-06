import React from "react";
import accountImage from "../../assets/banners/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/Address";
import ShoppingOrders from "@/components/shopping-view/Orders";

const ShoppingAccountPage = () => {
  return (
    <div className="flex flex-col  overflow-auto mt-14 font-roboto">
      <div className="relative w-full flex items-center justify-center h-[300px] overflow-hidden">
        <img
          width={"1600"}
          height={"300"}
          // style={{ aspectRatio: "1600/300", objectFit: "cover" }}
          className="h-full w-full object-cover object-center"
          src={accountImage}
        ></img>
      </div>
      <div className="containe mx-auto grid grid-cols gap-8 py-8 ">
        <div className="flex w-full  flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="font-cairoPlay text-2xl bg-purple-400">
              <TabsTrigger className="text-2xl" value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccountPage;
