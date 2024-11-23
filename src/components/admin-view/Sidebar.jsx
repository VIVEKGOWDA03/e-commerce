import { ChartArea } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebarMenuItems } from "@/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  function MenuItems({ setOpen }) {
    return (
      <nav className="mt-8 flex-col gap-2">
        {AdminSidebarMenuItems.map((menuItem) => (
          <div
            key={menuItem.path}
            onClick={() => {
              navigate(menuItem.path); 
              if (setOpen) {
                setOpen(false);
              }
            }}
            className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-gray-200 hover:text-foreground"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  }

  return (
    <Fragment>
      <Sheet className="" open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartArea absoluteStrokeWidth size={30} />
                <h1 className="text-3xl font-extrabold">Admin panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r p-6 lg:flex bg-white">
        <div
          onClick={() => navigate("admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartArea absoluteStrokeWidth size={30} />
          <h1 className="text-3xl font-extrabold">Admin panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
