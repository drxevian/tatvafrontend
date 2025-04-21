import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  avatarUrl,
}: TestimonialCardProps) => {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-tatva-teal mb-4 opacity-50" />
        <p className="text-gray-700 italic">"{quote}"</p>
      </CardContent>
      <CardFooter className="mt-auto flex items-center pt-6">
        {avatarUrl ? (
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-tatva-teal/20">
            <img
              src={avatarUrl}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tatva-blue/20 to-tatva-teal/20 flex items-center justify-center mr-3 ring-2 ring-tatva-teal/20">
            <span className="text-lg font-medium text-tatva-blue">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-medium text-tatva-dark">{author}</p>
          <p className="text-sm text-gray-500">
            {role}, {company}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
