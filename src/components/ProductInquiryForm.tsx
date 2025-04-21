import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { useToast } from "src/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Function to add an inquiry (to be imported in the component that uses this form)
const inquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  productRequirement: z.string().min(10, { message: "Please provide more details about your requirements" }),
  additionalInfo: z.string().optional(),
});

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

interface ProductInquiryFormProps {
  productId: string;
  productName: string;
  subproductName?: string;
  onSubmitSuccess: () => void;
  onSubmitInquiry: (data: InquiryFormValues & { productId: string, subproductName?: string }) => Promise<void>;
}

const ProductInquiryForm = ({ 
  productId, 
  productName,
  subproductName,
  onSubmitSuccess,
  onSubmitInquiry
}: ProductInquiryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productRequirement: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);

    try {
      await onSubmitInquiry({
        ...data,
        productId,
        subproductName
      });
      
      toast({
        title: "Inquiry sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            {subproductName 
              ? `Inquiry for ${productName} - ${subproductName}`
              : `Inquiry for ${productName}`
            }
          </h3>
          <p className="text-sm text-muted-foreground">
            Please fill in your details and we'll get back to you shortly.
          </p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+91 98765 43210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="productRequirement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Requirement</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe your specific requirements..."
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional details that might help us understand your needs better..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Inquiry...
            </>
          ) : (
            "Submit Inquiry"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductInquiryForm;
