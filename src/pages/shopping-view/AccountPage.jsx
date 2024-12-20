import React from "react";
import accountImage from "../../assets/banners/account.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/Address";
import Orders from "@/components/shopping-view/Orders";

const ShoppingAccountPage = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-full flex items-center justify-center h-[300px] overflow-hidden">
        <img
          width={"1600"}
          height={"300"}
          // style={{ aspectRatio: "1600/300", objectFit: "cover" }}
          className="h-full w-full object-cover object-center"
          src={accountImage}
        ></img>
      </div>
      <div className="container mx-auto grid grid-cols gap-8 py-8 ">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
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
