import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { getProductById, updateProduct } from "@/utils/products";

interface ProductFormData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isNew: boolean;
  images: string[];
  subproductImages?: Record<string, string>;
}

export default function EditProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    isNew: false,
    images: ["", "", ""],
    subproductImages: {},
  });

  const [subproducts, setSubproducts] = useState<{ name: string; imageUrl: string }[]>([
    { name: "", imageUrl: "" },
  ]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setIsLoading(true);
      try {
        console.log("🔍 Fetching product by ID:", productId);
        const prod = await getProductById(productId);
        console.log("✅ Product fetched:", prod);
        setFormData({
          id: prod.id || prod._id,
          title: prod.title,
          description: prod.description,
          imageUrl: prod.imageUrl,
          category: prod.category,
          isNew: prod.isNew || false,
          images: [...(prod.images || []), "", "", ""].slice(0, 3),
          subproductImages: prod.subproductImages || {},
        });
        const names = prod.description
          .split(",")
          .map((n: string) => n.trim())
          .filter(Boolean);
        setSubproducts(
          names.length
            ? names.map((n: string) => ({
                name: n,
                imageUrl: prod.subproductImages?.[n] || "",
              }))
            : [{ name: "", imageUrl: "" }]
        );
      } catch (e) {
        console.error("❌ Error fetching product:", e);
        toast({
          title: "Error",
          description: "Failed to load product data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const filteredImages = formData.images.filter((img) => img.trim());
    const finalProduct = {
      ...formData,
      description,
      images: filteredImages.length ? filteredImages : [formData.imageUrl],
      subproductImages:
        Object.keys(subproductImages).length > 0 ? subproductImages : undefined,
    };

    try {
      console.log("📤 Submitting updated product:", finalProduct);
      const updated = await updateProduct(finalProduct.id, finalProduct);
      console.log("✅ Product updated successfully:", updated);
      toast({
        title: "Success",
        description: "Product updated successfully.",
      });
      navigate("/admin/products");
    } catch (e) {
      console.error("❌ Update failed:", e);
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading product data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update product details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Product Name</Label>
            <Input name="title" value={formData.title} onChange={handleInputChange} required />

            <Label>Category</Label>
            <Input name="category" value={formData.category} onChange={handleInputChange} required />

            <div className="flex items-center space-x-2">
              <Checkbox id="isNew" checked={formData.isNew} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="isNew">Mark as New Product</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Manage product images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Main Image URL</Label>
            <Input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />

            <Label>Additional Images</Label>
            {formData.images.map((img, idx) => (
              <Input
                key={idx}
                value={img}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                placeholder={`Image URL ${idx + 1}`}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subproducts</CardTitle>
            <CardDescription>Update subproducts and images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subproducts.map((sub, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 border-b pb-4">
                <div className="flex-1">
                  <Label>Subproduct Name</Label>
                  <Input
                    value={sub.name}
                    onChange={(e) => handleSubproductChange(idx, "name", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label>Image URL</Label>
                  <Input
                    value={sub.imageUrl}
                    onChange={(e) => handleSubproductChange(idx, "imageUrl", e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeSubproduct(idx)}
                  disabled={subproducts.length <= 1}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSubproduct}>
              Add Subproduct
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
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
