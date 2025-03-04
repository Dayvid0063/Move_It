"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Car, Upload, Loader2 } from "lucide-react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { CldUploadWidget } from 'next-cloudinary';
import CarFeaturesInput from "./features-input";
import { getCarBrands } from "@/app/api/brand";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCar } from "@/app/api/cars";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const carFormSchema = z.object({
  name: z.string().min(3, "Car name must be at least 3 characters"),
  brandId: z.string().uuid("Please select a valid brand"),
  plateNumber: z.string().min(3, "Please enter a valid plate number"),
  carStatus: z.enum(["Available", "Rented", "Maintenance"]),
  pricePerDay: z.string().transform(val => Number(val)),
  passengerCapacity: z.string().transform(val => Number(val)),
  features: z.array(z.string()),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type CarFormData = z.infer<typeof carFormSchema>;

interface Brand {
  id: string;
  name: string;
}

const AddNewCar = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const methods = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      name: "",
      brandId: "",
      plateNumber: "",
      carStatus: "Available",
      pricePerDay: 0,
      passengerCapacity: 0,
      features: [],
      description: "",
    }
  });

  // Fetch car brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getCarBrands();
        setBrands(brandsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch car brands",
          variant: "destructive",
        });
      }
    };
    fetchBrands();
  }, [toast]);

  const carStatusOptions = [
    "Available",
    "Rented",
    "Maintenance"
  ];

  const handleImageUploadSuccess = (result: any) => {
    setUploadedImages(prev => [...prev, result.info.secure_url]);
  };

  const onSubmit = async (data: CarFormData) => {
    if (uploadedImages.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const carData = {
        ...data,
        images: uploadedImages,
        pricePerDay: Number(data.pricePerDay),
        passengerCapacity: Number(data.passengerCapacity),
      };

      await createCar(carData);
      toast({
        title: "Success",
        description: "Car added successfully",
      });
      methods.reset();
      setUploadedImages([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create car",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Add New Car</h1>
              <p className="text-gray-500 mt-2">Fill in the details for a new rental vehicle</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Car Details</CardTitle>
                <CardDescription>
                  Provide comprehensive information about the vehicle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={methods.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Toyota Camry 2024"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={methods.control}
                      name="brandId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car Brand</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select car brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {brands.map((brand) => (
                                <SelectItem
                                  key={brand.id}
                                  value={brand.id}
                                >
                                  {brand.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={methods.control}
                      name="plateNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plate Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., LAG 234 XY"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={methods.control}
                      name="carStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {carStatusOptions.map((status) => (
                                <SelectItem
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={methods.control}
                      name="pricePerDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per Day</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter price in Naira"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={methods.control}
                      name="passengerCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passenger Capacity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Number of passengers"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={methods.control}
                      name="features"
                      render={({ field }) => (
                        <CarFeaturesInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={methods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of the car"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Car Images</FormLabel>
                  <CldUploadWidget
                    uploadPreset="move-it"
                    onSuccess={handleImageUploadSuccess}
                  >
                    {({ open }) => (
                      <div className="space-y-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => open()}
                          className="w-full h-64"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="w-10 h-10 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-500">
                              Click to upload images (PNG, JPG, WEBP)
                            </p>
                          </div>
                        </Button>

                        {uploadedImages.length > 0 && (
                          <div className="grid grid-cols-3 gap-4">
                            {uploadedImages.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                className="h-24 w-full object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CldUploadWidget>
                </FormItem>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      methods.reset();
                      setUploadedImages([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Car className="mr-2 h-4 w-4" />
                    )}
                    Add Car
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default AddNewCar;
