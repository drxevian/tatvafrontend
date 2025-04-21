
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-tatva-blue to-tatva-teal text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Contact us today to discuss how our engineering services can help you achieve your project goals.
        </p>
        <Button asChild size="lg" variant="outline" className="text-white hover:text-white border-white hover:border-white bg-white/10 hover:bg-white/20">
          <Link to="/contact">Contact Our Team</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
