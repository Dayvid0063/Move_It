"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ExternalLink,
  CalendarDays,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatsCardProps } from "@/lib/types/dashboard";

type Status = "Confirmed" | "Pending" | "Completed" | "Cancelled";

const DashboardHome = () => {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<"weekly" | "monthly">("weekly");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [bookingView, setBookingView] = useState<"upcoming" | "recent">(
    "upcoming"
  );
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const recentCars = [
    {
      id: 1,
      name: "Toyota Camry 2024",
      status: "Available",
      price: "₦45,000",
      bookings: 12,
    },
    {
      id: 2,
      name: "Honda Accord 2023",
      status: "Rented",
      price: "₦40,000",
      bookings: 8,
    },
    {
      id: 3,
      name: "Lexus RX 350",
      status: "Available",
      price: "₦65,000",
      bookings: 15,
    },
    {
      id: 4,
      name: "Mercedes C300",
      status: "Maintenance",
      price: "₦75,000",
      bookings: 6,
    },
  ];

  const bookings = {
    upcoming: [
      {
        id: 1,
        customer: "John Doe",
        car: "Toyota Camry 2024",
        startDate: "2024-03-10",
        endDate: "2024-03-15",
        status: "Confirmed",
        amount: "₦225,000",
      },
      {
        id: 2,
        customer: "Jane Smith",
        car: "Lexus RX 350",
        startDate: "2024-03-12",
        endDate: "2024-03-14",
        status: "Pending",
        amount: "₦130,000",
      },
      {
        id: 3,
        customer: "Mike Johnson",
        car: "Honda Accord 2023",
        startDate: "2024-03-15",
        endDate: "2024-03-18",
        status: "Confirmed",
        amount: "₦160,000",
      },
    ],
    recent: [
      {
        id: 4,
        customer: "Sarah Wilson",
        car: "Mercedes C300",
        startDate: "2024-03-01",
        endDate: "2024-03-05",
        status: "Completed",
        amount: "₦375,000",
      },
      {
        id: 5,
        customer: "Robert Brown",
        car: "Toyota Camry 2024",
        startDate: "2024-03-03",
        endDate: "2024-03-08",
        status: "Completed",
        amount: "₦225,000",
      },
      {
        id: 6,
        customer: "Lisa Davis",
        car: "Lexus RX 350",
        startDate: "2024-03-05",
        endDate: "2024-03-07",
        status: "Cancelled",
        amount: "₦130,000",
      },
    ],
  };

  const quickActions = [
    {
      icon: Car,
      title: "Add New Car",
      desc: "List a new rental vehicle",
      color: "blue",
      route: "/dashboard/cars/new",
    },
    {
      icon: Car,
      title: "Manage Brands",
      desc: "Add or edit car brands",
      color: "purple",
      route: "/dashboard/cars/brands",
    },
  ];

  const filteredCars =
    selectedStatus === "all"
      ? recentCars
      : recentCars.filter(
        (car) => car.status.toLowerCase() === selectedStatus.toLowerCase()
      );

  const StatsCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    subtitle,
  }: StatsCardProps) => (
    <Card
      className={`transition-all duration-200 ${hoveredCard === title ? "transform scale-105 shadow-lg" : ""
        }`}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={`h-4 w-4 ${hoveredCard === title ? "text-blue-500" : "text-gray-500"
            }`}
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div
            className={`flex items-center ${trend === "up" ? "text-green-500" : "text-red-500"
              }`}
          >
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            <span className="text-sm">{trendValue}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );

  const colors: Record<Status, string> = {
    Confirmed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const getStatusColor = (status: string) =>
    colors[status as Status] || "bg-gray-100 text-gray-800";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Car Rental Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Manage your fleet and bookings efficiently
          </p>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as "weekly" | "monthly")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly View</SelectItem>
            <SelectItem value="monthly">Monthly View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Cars"
          value="24"
          icon={Car}
          trend="up"
          trendValue="12%"
          subtitle="4 cars added this month"
        />
        <StatsCard
          title="Active Rentals"
          value="18"
          icon={CalendarDays}
          trend="up"
          trendValue="8%"
          subtitle="3 new rentals today"
        />
        <StatsCard
          title="Upcoming Bookings"
          value="12"
          icon={Clock}
          trend="up"
          trendValue="20%"
          subtitle="For next 7 days"
        />
        <StatsCard
          title="Total Revenue"
          value="₦2.4M"
          icon={TrendingUp}
          trend="up"
          trendValue="15%"
          subtitle="This month"
        />
      </div>

      {/* Bookings Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bookings Overview</CardTitle>
          <div className="flex gap-2">
            <button
              onClick={() => setBookingView("upcoming")}
              className={`px-3 py-1 rounded-md text-sm ${bookingView === "upcoming"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
                }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setBookingView("recent")}
              className={`px-3 py-1 rounded-md text-sm ${bookingView === "recent"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
                }`}
            >
              Recent
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Car</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings[bookingView].map((booking) => (
                <TableRow
                  key={booking.id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium">
                    {booking.customer}
                  </TableCell>
                  <TableCell>{booking.car}</TableCell>
                  <TableCell>
                    {new Date(booking.startDate).toLocaleDateString()} -{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{booking.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Fleet Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fleet Overview</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
              Filter Status <ChevronDown className="ml-2 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("available")}>
                Available
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus("rented")}>
                Rented
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedStatus("maintenance")}
              >
                Maintenance
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Total Bookings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow
                  key={car.id}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{car.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${car.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : car.status === "Rented"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {car.status}
                    </span>
                  </TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell>{car.bookings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => router.push(action.route)}
          >
            <CardContent className="flex items-center gap-4 pt-6">
              <div className={`p-2 bg-${action.color}-100 rounded-lg`}>
                <action.icon className={`h-6 w-6 text-${action.color}-600`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.desc}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
