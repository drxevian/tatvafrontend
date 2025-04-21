import { useState, useEffect } from "react";
import Hero from "src/components/Hero";
import ProductCard from "src/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/components/ui/tabs";
import { Input } from "src/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "src/components/ui/checkbox";
import { Label } from "src/components/ui/label";
import { getAllProducts } from "src/utils/products";
import { Product } from "src/types";
import { useToast } from "src/hooks/use-toast";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map(product => product.category))
        ) as string[];
        setCategories(["all", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Failed to load products",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [toast]);

  // Filter products based on category, search term, and new products flag
  const filterProducts = (category: string, term: string) => {
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category.toLowerCase() === category.toLowerCase();
      const matchesSearch = product.title.toLowerCase().includes(term.toLowerCase()) ||
                          product.description.toLowerCase().includes(term.toLowerCase());
      const matchesNew = showNew ? product.isNew : true;
      return matchesCategory && matchesSearch && matchesNew;
    });
  };

  return (
    <>
      <Hero
        title="Our Products"
        subtitle="Quality Materials for Industrial Applications"
        imageUrl="/products.jpg"
        imageAlt="Engineering products"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive range of industrial products designed to meet the highest standards of quality and performance.
            </p>
          </div>

          <div className="mb-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* <div className="flex items-center gap-2">
              <Checkbox 
                id="showNew" 
                checked={showNew} 
                onCheckedChange={() => setShowNew(!showNew)} 
              />
              <Label htmlFor="showNew" className="text-sm cursor-pointer">
                Show only new products
              </Label>
            </div> */}
            
            {!loading && categories.length > 1 && (
              <Tabs defaultValue="all" className="w-full md:w-auto">
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : (
            <div className="mt-8">
              <Tabs defaultValue="all">
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filterProducts("all", searchTerm).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        imageUrl={product.imageUrl}
                        category={product.category}
                        isNew={product.isNew}
                      />
                    ))}
                  </div>
                </TabsContent>

                {categories.slice(1).map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filterProducts(category, searchTerm).map((product) => (
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          title={product.title}
                          description={product.description}
                          imageUrl={product.imageUrl}
                          category={product.category}
                          isNew={product.isNew}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </section>

      {/* Product Development Process */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Trading Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a rigorous process to ensure all our products meet the highest standards of quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Quality Sourcing",
                description: "We carefully source products from trusted manufacturers and suppliers to ensure quality and reliability.",
                imageUrl: "/source.jpg",
              },
              {
                step: "02",
                title: "Quality Assurance",
                description: "Each product undergoes thorough quality checks to meet our high standards before being offered to clients.",
                imageUrl: "/qualityassurance.avif",
              },
              {
                step: "03",
                title: "Timely Delivery",
                description: "We ensure prompt delivery of products to meet your project timelines and operational needs.",
                imageUrl: "/delivery.avif",
              },
            ].map((process, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 overflow-hidden">
                  <img
                    src={process.imageUrl}
                    alt={process.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-tatva-blue text-white text-sm font-semibold rounded-full mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
