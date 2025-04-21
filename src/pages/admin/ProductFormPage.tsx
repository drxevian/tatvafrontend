// src/pages/admin/ProductFormPage.tsx
import { useState, useEffect } from "react";
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

export default function ProductFormPage() {
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

  const [subproducts, setSubproducts] = useState<
    { name: string; imageUrl: string }[]
  >([{ name: "", imageUrl: "" }]);

  // Fetch existing product once
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setIsLoading(true);
      try {
        const prod = await getProductById(productId);
        if (prod) {
          setFormData({
            id: prod.id,
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
            .map((n) => n.trim())
            .filter((n) => n);
          setSubproducts(
            names.length > 0
              ? names.map((n) => ({
                  name: n,
                  imageUrl: prod.subproductImages?.[n] || "",
                }))
              : [{ name: "", imageUrl: "" }]
          );
        }
      } catch (e) {
        console.error("Error fetching product:", e);
        toast({
          title: "Error",
          description: "Failed to load product data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) =>
    setFormData((p) => ({ ...p, isNew: checked }));

  const handleImageChange = (idx: number, val: string) => {
    const imgs = [...formData.images];
    imgs[idx] = val;
    setFormData((p) => ({ ...p, images: imgs }));
  };

  const handleSubproductChange = (
    idx: number,
    field: "name" | "imageUrl",
    val: string
  ) => {
    const s = [...subproducts];
    s[idx][field] = val;
    setSubproducts(s);
  };

  const addSubproduct = () =>
    setSubproducts((p) => [...p, { name: "", imageUrl: "" }]);

  const removeSubproduct = (idx: number) => {
    if (subproducts.length > 1) {
      setSubproducts((p) => p.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // build description & images
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
      await updateProduct(finalProduct.id, finalProduct);
      toast({
        title: "Product updated",
        description: `"${finalProduct.title}" has been updated successfully.`,
      });
      navigate("/admin/products");
    } catch (e) {
      console.error("Error updating product:", e);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
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
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Update the core details about your product
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

        {/* Images Card */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Update product images</CardDescription>
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

        {/* Subproducts Card */}
        <Card>
          <CardHeader>
            <CardTitle>Subproducts</CardTitle>
            <CardDescription>Update subproducts & their images</CardDescription>
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
