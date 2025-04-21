// src/pages/admin/AddProductPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { addProduct } from "@/utils/products";

interface ProductFormData {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isNew: boolean;
  images: string[];
  subproductImages?: Record<string, string>;
}

export default function AddProductPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    isNew: false,
    images: ["", "", ""],
    subproductImages: {},
  });

  const [subproducts, setSubproducts] = useState<
    { name: string; imageUrl: string }[]
  >([{ name: "", imageUrl: "" }]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isNew: checked }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleSubproductChange = (
    index: number,
    field: "name" | "imageUrl",
    value: string
  ) => {
    const updated = [...subproducts];
    updated[index][field] = value;
    setSubproducts(updated);
  };

  const addSubproduct = () =>
    setSubproducts((prev) => [...prev, { name: "", imageUrl: "" }]);

  const removeSubproduct = (index: number) => {
    if (subproducts.length > 1) {
      setSubproducts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Build description & subproductImages
    const description = subproducts
      .filter((s) => s.name.trim())
      .map((s) => s.name.trim())
      .join(", ");
    const subproductImages: Record<string, string> = {};
    subproducts.forEach((s) => {
      if (s.name.trim() && s.imageUrl.trim()) {
        subproductImages[s.name.trim()] = s.imageUrl.trim();
      }
    });
    const filteredImages = formData.images.filter((i) => i.trim());

    // Assemble final payload (server will generate `id`)
    const finalProduct = {
      ...formData,
      description,
      images: filteredImages.length ? filteredImages : [formData.imageUrl],
      subproductImages:
        Object.keys(subproductImages).length > 0
          ? subproductImages
          : undefined,
    };

    try {
      // strip out any id (in case)
      // @ts-ignore
      const { id, ...toCreate } = finalProduct;
      await addProduct(toCreate);
      toast({
        title: "Product created",
        description: `"${finalProduct.title}" has been created successfully.`,
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "Failed to create product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the core details about your product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">Product Name</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Enter category name"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNew"
                checked={formData.isNew}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="isNew">Mark as New Product</Label>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Add images for your product</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="imageUrl">Main Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
                placeholder="Enter main image URL"
              />
            </div>
            <div className="grid w-full items-center gap-4">
              <Label>Additional Images (Optional)</Label>
              {formData.images.map((img, idx) => (
                <Input
                  key={idx}
                  value={img}
                  onChange={(e) => handleImageChange(idx, e.target.value)}
                  placeholder={`Additional image URL ${idx + 1}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subproducts */}
        <Card>
          <CardHeader>
            <CardTitle>Subproducts</CardTitle>
            <CardDescription>Add subproducts and their images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subproducts.map((sub, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-3 pb-4 border-b"
              >
                <div className="flex-1">
                  <Label htmlFor={`sub-${idx}`}>Subproduct Name</Label>
                  <Input
                    id={`sub-${idx}`}
                    value={sub.name}
                    onChange={(e) =>
                      handleSubproductChange(idx, "name", e.target.value)
                    }
                    placeholder="Enter subproduct name"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`sub-img-${idx}`}>
                    Image URL (Optional)
                  </Label>
                  <Input
                    id={`sub-img-${idx}`}
                    value={sub.imageUrl}
                    onChange={(e) =>
                      handleSubproductChange(idx, "imageUrl", e.target.value)
                    }
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="flex items-end mt-2 md:mt-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSubproduct(idx)}
                    disabled={subproducts.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSubproduct}>
              Add Subproduct
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link to="/admin/products">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
