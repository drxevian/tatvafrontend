import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { useState } from "react";
import { useToast } from "src/hooks/use-toast";
import { submitServiceInquiry } from "src/utils/serviceInquiries";

interface ServiceInquiryFormProps {
  serviceName: string;
  trigger: React.ReactNode;
}

const ServiceInquiryForm = ({ serviceName, trigger }: ServiceInquiryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceDetails: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitServiceInquiry({
        ...formData,
        serviceName,
      });

      toast({
        title: "Inquiry Submitted",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceDetails: "",
        message: "",
      });

      // Close the dialog by clicking the trigger button
      const dialogTrigger = document.querySelector('[data-state="open"]') as HTMLButtonElement;
      if (dialogTrigger) {
        dialogTrigger.click();
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-white to-white/90 dark:from-tatva-dark dark:to-tatva-dark/90">
        <DialogHeader>
          <DialogTitle className="text-tatva-dark dark:text-tatva-light">Inquire about {serviceName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-tatva-dark dark:text-tatva-light">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-tatva-dark dark:text-tatva-light">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-tatva-dark dark:text-tatva-light">
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="serviceDetails" className="text-sm font-medium text-tatva-dark dark:text-tatva-light">
              Service Requirements
            </label>
            <Textarea
              id="serviceDetails"
              value={formData.serviceDetails}
              onChange={(e) => setFormData({ ...formData, serviceDetails: e.target.value })}
              placeholder="Please describe your specific requirements for this service..."
              required
              className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-tatva-dark dark:text-tatva-light">
              Additional Message
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any additional information you'd like to share..."
              className="bg-white/50 dark:bg-tatva-dark/50 border-tatva-blue/20 focus:border-tatva-blue/40 focus:ring-tatva-blue/20"
              disabled={isSubmitting}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-tatva-blue to-tatva-teal hover:from-tatva-blue/90 hover:to-tatva-teal/90 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceInquiryForm; 