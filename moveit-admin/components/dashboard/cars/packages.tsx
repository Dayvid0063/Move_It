"use client";
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Trash2, Edit, Car } from 'lucide-react';

type CarType = {
  id: number;
  name: string;
  category: string;
  pricePerDay: number;
};

type Package = {
  id: number;
  name: string;
  description: string;
  duration: string;
  included: string[];
  price: number;
  cars: CarType[];
};

const PackagesPage = () => {
  // Sample car data
  const [availableCars] = useState<CarType[]>([
    {
      id: 1,
      name: 'Toyota Camry 2024',
      category: 'Sedan',
      pricePerDay: 25000
    },
    {
      id: 2,
      name: 'Honda CR-V',
      category: 'SUV',
      pricePerDay: 35000
    },
    {
      id: 3,
      name: 'Mercedes S-Class',
      category: 'Luxury',
      pricePerDay: 75000
    }
  ]);

  const [packages, setPackages] = useState<Package[]>([
    {
      id: 1,
      name: 'Weekend Getaway',
      description: 'Perfect for short weekend trips',
      duration: '2 days',
      included: ['Unlimited KM', 'Full Insurance', 'GPS'],
      price: 80000,
      cars: [availableCars[0], availableCars[1]]
    },
    {
      id: 2,
      name: 'Corporate Package',
      description: 'Ideal for business travelers',
      duration: '5 days',
      included: ['Airport Pickup', 'Business Class Cars', 'Unlimited KM'],
      price: 150000,
      cars: [availableCars[2]]
    }
  ]);

  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    duration: '',
    included: '',
    price: 0,
    selectedCars: [] as number[]
  });

  const handleAddPackage = () => {
    if (newPackage.name && newPackage.description) {
      const selectedCars = availableCars.filter(car =>
        newPackage.selectedCars.includes(car.id)
      );

      const packageItem = {
        id: packages.length + 1,
        name: newPackage.name,
        description: newPackage.description,
        duration: newPackage.duration,
        included: newPackage.included.split(',').map(item => item.trim()),
        price: newPackage.price,
        cars: selectedCars
      };

      setPackages([...packages, packageItem]);
      setNewPackage({
        name: '',
        description: '',
        duration: '',
        included: '',
        price: 0,
        selectedCars: []
      });
    }
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const handleCarSelection = (carId: string) => {
    const id = parseInt(carId);
    setNewPackage(prev => ({
      ...prev,
      selectedCars: prev.selectedCars.includes(id)
        ? prev.selectedCars.filter(cid => cid !== id)
        : [...prev.selectedCars, id]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rental Packages Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2">Package Name</label>
            <Input
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
              placeholder="Enter package name"
            />
          </div>
          <div>
            <label className="block mb-2">Duration</label>
            <Input
              value={newPackage.duration}
              onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
              placeholder="e.g., 2 days"
            />
          </div>
          <div>
            <label className="block mb-2">Price (₦)</label>
            <Input
              type="number"
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
              placeholder="Enter package price"
            />
          </div>
          <div>
            <label className="block mb-2">What's Included (comma-separated)</label>
            <Input
              value={newPackage.included}
              onChange={(e) => setNewPackage({ ...newPackage, included: e.target.value })}
              placeholder="e.g., Unlimited KM, Insurance"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Description</label>
            <Textarea
              value={newPackage.description}
              onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              placeholder="Enter package description"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Available Cars</label>
            <div className="grid md:grid-cols-3 gap-4">
              {availableCars.map((car) => (
                <div
                  key={car.id}
                  className={`p-4 border rounded-lg cursor-pointer ${newPackage.selectedCars.includes(car.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                    }`}
                  onClick={() => handleCarSelection(car.id.toString())}
                >
                  <div className="flex items-center space-x-2">
                    <Car className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{car.name}</p>
                      <p className="text-sm text-gray-500">{car.category}</p>
                      <p className="text-sm">₦{car.pricePerDay.toLocaleString()}/day</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button onClick={handleAddPackage}>Add New Package</Button>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Included</TableHead>
              <TableHead>Available Cars</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>{pkg.name}</TableCell>
                <TableCell>{pkg.description}</TableCell>
                <TableCell>{pkg.duration}</TableCell>
                <TableCell>₦{pkg.price.toLocaleString()}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-4">
                    {pkg.included.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    {pkg.cars.map((car) => (
                      <div key={car.id} className="flex items-center space-x-2">
                        <Car className="h-4 w-4" />
                        <span>{car.name}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeletePackage(pkg.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PackagesPage;
