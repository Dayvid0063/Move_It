"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Car, Upload, Loader2, X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { CldUploadWidget } from 'next-cloudinary';
import CarFeaturesInput from "./features-input";
import { getCarBrands } from "@/app/api/brand";
import { getCarById, updateCar } from "@/app/api/cars";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const carFormSchema = z.object({
  name: z.string().min(3, "Car name must be at least 3 characters"),
  brandId: z.string().uuid("Please select a valid brand"),
  plateNumber: z.string().min(3, "Please enter a valid plate number"),
  carStatus: z.enum(["AVAILABLE", "RENTED", "MAINTENANCE"]),
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

const EditCar = () => {
  const params = useParams();
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { toast } = useToast();
  const carId = params.id as string;

  const methods = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      name: "",
      brandId: "",
      plateNumber: "",
      carStatus: "AVAILABLE",
      pricePerDay: 0,
      passengerCapacity: 0,
      features: [],
      description: "",
    }
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        const [brandsData, carData] = await Promise.all([
          getCarBrands(),
          getCarById(carId)
        ]);

        setBrands(brandsData);
        setUploadedImages(carData.images || []);

        methods.reset({
          name: carData.name,
          brandId: carData.brand.id,
          plateNumber: carData.plateNumber,
          carStatus: carData.status,
          pricePerDay: carData.pricePerDay.toString(),
          passengerCapacity: carData.passengerCapacity.toString(),
          features: carData.features || [],
          description: carData.description,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load car data",
          variant: "destructive",
        });
        router.push("/dashboard/cars");
      } finally {
        setInitialLoading(false);
      }
    };

    initialize();
  }, [carId, methods, router, toast]);

  const handleImageUploadSuccess = (result: any) => {
    setUploadedImages(prev => [...prev, result.info.secure_url]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
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

      await updateCar(carId, carData);
      toast({
        title: "Success",
        description: "Car updated successfully",
      });
      router.push("/dashboard/cars");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update car",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Edit Car</h1>
              <p className="text-gray-500 mt-2">Update the car's information</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Car Details</CardTitle>
                <CardDescription>
                  Modify the vehicle information as needed
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
                              {["AVAILABLE", "RENTED", "MAINTENANCE"].map((status) => (
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
                  <div className="space-y-4">
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {uploadedImages.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Car ${index + 1}`}
                              className="h-24 w-full object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              aria-label="cancel"
                              className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <CldUploadWidget
                      uploadPreset="move-it"
                      onSuccess={handleImageUploadSuccess}
                    >
                      {({ open }) => (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => open()}
                          className="w-full h-24"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Add More Images
                        </Button>
                      )}
                    </CldUploadWidget>
                  </div>
                </FormItem>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/cars")}
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
                    Update Car
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

export default EditCar;
