import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send } from "lucide-react";
import { addContactSubmission, type ContactSubmission } from "@/utils/contactSubmissions";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  subject: z.string().min(2, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message is too short" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      // Ensure all required fields are present and non-optional before passing to addContactSubmission
      const submission: Omit<ContactSubmission, "id" | "status" | "date"> = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message
      };
      
      // Store the submission in our mock database
      addContactSubmission(submission);
      
      // In a real application, you'd submit to an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Form submitted with data:", data);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
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
        className="space-y-6 p-6 rounded-lg bg-gradient-to-br from-white via-white to-background dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tatva-dark dark:text-tatva-light">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="" 
                    {...field} 
                    className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tatva-dark dark:text-tatva-light">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="" 
                    {...field} 
                    className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tatva-dark dark:text-tatva-light">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="" 
                    {...field} 
                    className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tatva-dark dark:text-tatva-light">Subject</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="" 
                    {...field} 
                    className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20 transition-all duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-tatva-dark dark:text-tatva-light">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe your inquiry in detail..."
                  className="min-h-32 bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20 transition-all duration-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full md:w-auto bg-gradient-to-r from-tatva-blue to-tatva-teal hover:from-tatva-blue/90 hover:to-tatva-teal/90 transition-all duration-300 group" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
