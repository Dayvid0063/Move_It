"use client";
import { useState, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  Package,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronDown,
  UserRoundPen,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState("");
  const router = useRouter();

  const navigation = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Cars",
      icon: Car,
      href: "/dashboard/cars",
      submenu: [
        { title: "All Cars", href: "/dashboard/cars" },
        { title: "Add New Car", href: "/dashboard/cars/new" },
        { title: "Brands", href: "/dashboard/cars/brands" },
      ],
    },
    {
      title: "Profile",
      icon: UserRoundPen,
      href: "/dashboard/profile",
    },
  ];

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown("");
    } else {
      setActiveDropdown(title);
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href); // Navigate to the href
  };

  const handleLogout = async () => {
    localStorage.removeItem('user');
    // Redirect to the login page
    router.push("/login");
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-40 h-screen 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 w-64 bg-white border-r
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <Image
            src="/images/Logo.png"
            alt="Moveit Logo"
            className="mr-2 h-6 w-auto"
            width={50}
            height={50}
          />
          <h1 className="text-xl font-bold">MoveIt Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.title}>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => {
                  if (item.submenu) {
                    toggleDropdown(item.title);
                  } else {
                    // Navigate directly if no submenu
                    handleNavigation(item.href);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                {item.submenu && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 
                      ${activeDropdown === item.title ? "rotate-180" : ""}`}
                  />
                )}
              </Button>

              {/* Submenu */}
              {item.submenu && activeDropdown === item.title && (
                <div className="ml-6 mt-2 space-y-2">
                  {item.submenu.map((subitem) => (
                    <Button
                      key={subitem.title}
                      variant="ghost"
                      className="w-full justify-start pl-7"
                      // Navigate on submenu click
                      onClick={() => handleNavigation(subitem.href)}
                    >
                      {subitem.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 w-full px-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "lg:ml-64" : "ml-0"}
        min-h-screen bg-gray-100 p-4
      `}
      >
        <Card className="p-6">{children}</Card>
      </main>
    </div>
  );
};

export default DashboardLayout;
