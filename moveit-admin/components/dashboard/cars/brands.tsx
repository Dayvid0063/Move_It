"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Trash2, Edit, Loader2, Upload } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  createCarBrand,
  getCarBrands,
  updateCarBrand,
  deleteCarBrand
} from '@/app/api/brand';
import { useToast } from '@/hooks/use-toast';

type Brand = {
  id: string;
  name: string;
  image: string;
};

const CarBrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newBrand, setNewBrand] = useState<Partial<Brand>>({ name: '', image: '' });
  const [editBrand, setEditBrand] = useState<Partial<Brand> | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const data = await getCarBrands();
      setBrands(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch brands",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleImageUpload = (result: any, isEdit: boolean = false) => {
    const imageUrl = result.info.secure_url;
    if (isEdit && editBrand) {
      setEditBrand({ ...editBrand, image: imageUrl });
    } else {
      setNewBrand({ ...newBrand, image: imageUrl });
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand.name || !newBrand.image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await createCarBrand(newBrand as Brand);
      await fetchBrands();
      setNewBrand({ name: '', image: '' });
      toast({
        title: "Success",
        description: "Brand added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add brand",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBrand = async () => {
    if (!editBrand || !editBrand.name || !editBrand.image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await updateCarBrand(editBrand.id!, {
        name: editBrand.name,
        image: editBrand.image
      } as Brand);
      await fetchBrands();
      setEditBrand(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Brand updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update brand",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteCarBrand(id);
      await fetchBrands();
      toast({
        title: "Success",
        description: "Brand deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete brand",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Car Brands Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2">Brand Name</label>
            <Input
              value={newBrand.name}
              onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
              placeholder="Enter brand name"
            />
          </div>
          <div>
            <label className="block mb-2">Brand Image</label>
            <CldUploadWidget
              uploadPreset="move-it"
              onSuccess={(result) => handleImageUpload(result)}
            >
              {({ open }) => (
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => open()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  {newBrand.image && (
                    <img
                      src={newBrand.image}
                      alt="New brand"
                      className="h-20 w-20 object-cover rounded"
                    />
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>
        </div>
        <Button
          onClick={handleAddBrand}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Add New Brand
        </Button>

        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog modal={false}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditBrand(brand)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        className="sm:max-w-md"
                        onInteractOutside={(event) => event.preventDefault()}
                      >
                        <DialogHeader>
                          <DialogTitle>Edit Brand</DialogTitle>
                        </DialogHeader>
                        {editBrand && (
                          <div className="space-y-4">
                            <div>
                              <label className="block mb-2">Brand Name</label>
                              <Input
                                value={editBrand.name}
                                onChange={(e) => setEditBrand({
                                  ...editBrand,
                                  name: e.target.value
                                })}
                              />
                            </div>
                            <div>
                              <label className="block mb-2">Brand Image</label>
                              <div className="mt-2 flex flex-col items-center gap-4">
                                <CldUploadWidget
                                  uploadPreset="move-it"
                                  onSuccess={(result) => handleImageUpload(result, true)}
                                >
                                  {({ open }) => (
                                    <div className="space-y-2 w-full">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => open()}
                                        className="w-full"
                                      >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Change Image
                                      </Button>
                                      {editBrand.image && (
                                        <img
                                          src={editBrand.image}
                                          alt="Brand"
                                          className="h-20 w-20 object-cover rounded mx-auto"
                                        />
                                      )}
                                    </div>
                                  )}
                                </CldUploadWidget>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            onClick={handleUpdateBrand}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteBrand(brand.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
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

export default CarBrandsPage;
