import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Hero from "@/src/frontend/components/Hero";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useToast } from "@/src/hooks/use-toast";
import ProductInquiryForm, { InquiryFormValues } from "@/src/frontend/components/ProductInquiryForm";
import { addInquiry } from "@/src/utils/inquiries";
import { Product, getProductById, getAllProducts } from "@/src/utils/products";

const ProductCategory = () => {
  const { categoryId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSubproduct, setSelectedSubproduct] = useState<string | null>(null);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProductData = async () => {
      if (!categoryId) return;
      
      try {
        setLoading(true);
        
        // Fetch the current product
        const productData = await getProductById(categoryId);
        setProduct(productData);
        
        // Fetch related products
        const allProducts = await getAllProducts();
        const related = allProducts
          .filter(p => p.id !== categoryId)
          .slice(0, 3);
        
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast({
          title: "Failed to load product",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [categoryId, toast]);
  
  if (loading) {
    return (
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <Skeleton className="h-[400px] w-full mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full lg:col-span-2" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p>Sorry, the requested product category could not be found.</p>
        </div>
      </div>
    );
  }

  const subproducts = product.description
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const subproductImages = product.subproductImages || {};

  const handleSubproductClick = (subproduct: string) => {
    setSelectedSubproduct(subproduct);
    setInquiryDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setInquiryDialogOpen(false);
    setSelectedSubproduct(null);
  };
  
  const handleSubmitInquiry = async (data: InquiryFormValues) => {
    try {
      await addInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        productRequirement: data.productRequirement,
        additionalInfo: data.additionalInfo,
        productId: product.id,
        subproductName: selectedSubproduct || undefined
      });
      
      toast({
        title: "Inquiry submitted",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Failed to submit inquiry",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Hero
        title={product.title}
        subtitle="Quality Industrial Products"
        imageUrl={product.imageUrl}
        imageAlt={product.title}
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <a href="/" className="hover:text-tatva-blue">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/products" className="hover:text-tatva-blue">Products</a>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-tatva-blue">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <Carousel className="w-full mb-6">
                    <CarouselContent>
                      {product.images && product.images.length > 0 ? (
                        product.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="h-64 w-full overflow-hidden">
                              <img 
                                src={image} 
                                alt={`${product.title} - Image ${index + 1}`}
                                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                              />
                            </div>
                          </CarouselItem>
                        ))
                      ) : (
                        <CarouselItem>
                          <div className="h-64 w-full overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.title}
                              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                            />
                          </div>
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
                      <div className="pointer-events-auto">
                        <CarouselPrevious className="relative left-0 bg-white/50 hover:bg-white" />
                      </div>
                      <div className="pointer-events-auto">
                        <CarouselNext className="relative right-0 bg-white/50 hover:bg-white" />
                      </div>
                    </div>
                  </Carousel>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  {product.isNew && (
                    <Badge className="bg-tatva-teal">New Product Line</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Available Products</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subproducts.map((subproduct, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleSubproductClick(subproduct)}
                      >
                        <div className="h-40 overflow-hidden bg-gray-100">
                          {subproductImages[subproduct] ? (
                            <img 
                              src={subproductImages[subproduct]} 
                              alt={subproduct}
                              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              {subproduct}
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <span className="font-medium">{subproduct}</span>
                          <Badge variant="outline" className="ml-2 cursor-pointer">Inquire</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Request Quote</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4">
                      Interested in our {product.title.toLowerCase()}? Contact our sales team for custom quotes and bulk orders.
                    </p>
                    <div className="flex items-center space-x-4">
                      <a 
                        href="/contact" 
                        className="bg-tatva-blue text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Contact Sales
                      </a>
                      <a 
                        href="tel:+911234567890" 
                        className="text-tatva-blue hover:underline"
                      >
                        +91 123-456-7890
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Related Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Card key={relatedProduct.id} className="overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={relatedProduct.imageUrl} 
                    alt={relatedProduct.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{relatedProduct.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {relatedProduct.description}
                  </p>
                  <a 
                    href={`/products/${relatedProduct.id}`}
                    className="text-tatva-blue hover:underline flex items-center"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={inquiryDialogOpen} onOpenChange={setInquiryDialogOpen}>
        <DialogContent className="max-w-md sm:max-w-lg bg-white p-6 rounded-lg shadow-lg border-0">
          <ProductInquiryForm 
            productId={product.id}
            productName={product.title}
            subproductName={selectedSubproduct || undefined}
            onSubmitSuccess={handleCloseDialog}
            onSubmitInquiry={handleSubmitInquiry}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCategory;
