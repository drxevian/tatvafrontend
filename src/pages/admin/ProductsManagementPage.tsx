import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, PlusCircle, Search, AlertCircle, Box } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product, getAllProducts, deleteProduct } from "@/utils/products";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const ProductsManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
      toast({
        title: "Failed to load products",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        setIsDeleting(true);
        const success = await deleteProduct(productToDelete);
        if (success) {
          setProducts(products.filter((product) => product.id !== productToDelete));
          toast({
            title: "Product deleted",
            description: "The product has been successfully deleted.",
          });
        } else {
          toast({
            title: "Error",
            description: "Could not delete the product.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Error",
          description: "Failed to delete product.",
          variant: "destructive",
        });
      } finally {
        setIsDeleting(false);
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      }
    }
  };

  const openDeleteDialog = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const renderEmptyState = () => (
    <Card className="w-full py-12 text-center">
      <CardContent className="flex flex-col items-center pt-6">
        <Box className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle className="text-xl mb-2">No Products Found</CardTitle>
        <p className="text-muted-foreground mb-6">There are no products in the database yet.</p>
        <Button asChild>
          <Link to="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Product
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Button asChild>
          <Link to="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>

      {!loading && products.length > 0 && (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      )}

      <div className="rounded-md border">
        {!loading && products.length === 0 ? (
          renderEmptyState()
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-full" />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-red-500">
                    <div className="flex flex-col items-center">
                      <AlertCircle className="h-6 w-6 mb-2" />
                      <p>{error}</p>
                      <Button onClick={fetchProducts} className="mt-4">
                        Try Again
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No products match your search term: "{searchTerm}"
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <Link to={`/admin/products/${product.id}`} className="hover:underline">
                        {product.title}
                      </Link>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.isNew ? (
                        <Badge className="bg-tatva-teal">New</Badge>
                      ) : (
                        <Badge variant="outline">Standard</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/products/edit/${product.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsManagementPage;
