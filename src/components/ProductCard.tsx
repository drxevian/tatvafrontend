import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "src/components/ui/card";
import { Badge } from "src/components/ui/badge";
import { Button } from "src/components/ui/button";
import { Eye, ImageOff } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { getGoogleDriveDirectUrl, getGoogleDriveThumbnail, getGoogleDriveFileId } from "src/utils/imageUtils";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ id, title, description, imageUrl, category, isNew = false }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Process the URL immediately using useMemo
  const processedImageUrl = useMemo(() => {
    if (!imageUrl) return "";
    
    console.log('Processing image URL:', {
      original: imageUrl,
      productId: id,
      productTitle: title
    });

    const fileId = getGoogleDriveFileId(imageUrl);
    if (fileId) {
      const thumbnailUrl = getGoogleDriveThumbnail(fileId, 800);
      console.log('Generated thumbnail URL:', {
        fileId,
        thumbnailUrl,
        productId: id
      });
      return thumbnailUrl;
    }
    
    return imageUrl;
  }, [imageUrl, id, title]);

  // Reset error state when URL changes
  useEffect(() => {
    setImageError(false);
  }, [processedImageUrl]);

  const handleImageError = () => {
    console.error('Image failed to load:', {
      processedUrl: processedImageUrl,
      originalUrl: imageUrl,
      productId: id,
      productTitle: title,
      fileId: getGoogleDriveFileId(imageUrl)
    });
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', {
      processedUrl: processedImageUrl,
      productId: id,
      productTitle: title
    });
    setImageError(false);
  };

  // Don't render anything if we don't have a URL
  if (!imageUrl) {
    console.warn('No image URL provided for product:', {
      productId: id,
      productTitle: title
    });
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-white to-tatva-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 border-tatva-blue/10 group">
      <div className="relative h-60 bg-gradient-to-br from-tatva-blue/5 to-tatva-teal/5 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
            <ImageOff className="h-12 w-12 text-tatva-gray mb-2" />
            <div className="text-xs text-tatva-gray text-center">
              Image not accessible. Please check sharing settings in Google Drive.
              <br />
              Make sure the image is set to "Anyone with the link can view".
            </div>
          </div>
        ) : (
          <img 
            key={processedImageUrl}
            src={processedImageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
            referrerPolicy="no-referrer"
          />
        )}
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-tatva-teal to-tatva-blue text-white border-0">New</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300">{title}</CardTitle>
          <Badge variant="outline" className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 border-tatva-blue/20">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription className="text-tatva-gray dark:text-tatva-light/80">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        <Button asChild variant="outline" className="w-full bg-gradient-to-r from-tatva-blue/10 to-tatva-teal/10 hover:from-tatva-blue hover:to-tatva-teal hover:text-white border-tatva-blue/20 transition-all duration-300">
          <Link to={`/products/${id}`} className="flex items-center justify-center">
            <Eye className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
