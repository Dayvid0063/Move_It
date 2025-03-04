type CategoryType = {
  id: string;
  name: string;
  icon: "briefcase" | "star" | "account-group" | "party-popper" | "car-sports";
  description: string;
};
type Brand = {
  id: string;
  name: string;
  image: any;
};

type CarType = {
  id: string;
  name: string;
  plateNumber: string;
  status: "AVAILABLE" | "RENTED" | "MAINTAINANCE";
  pricePerDay: number;
  passengerCapacity: number;
  description: string;
  images: string[];
  features: string[];
  brandId: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
};

type PackageType = {
  id: string;
  title: string;
  description: string;
  price: string;
  priceDetail: string;
  image: any;
  features: string[];
};
