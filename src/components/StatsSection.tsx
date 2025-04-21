import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatItemProps {
  value: number;
  label: string;
  duration?: number;
  suffix?: string;
}

const StatsSection = () => {
  const stats = [
    { value: 150, label: "Projects Completed", suffix: "+" },
    { value: 50, label: "Expert Engineers", suffix: "+" },
    { value: 15, label: "Years of Experience", suffix: "+" },
    { value: 98, label: "Client Satisfaction", suffix: "%" },
  ];

  return (
    <div className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, suffix = "", duration = 2000 }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    let timer: number;

    const updateCount = () => {
      start += 1;
      setCount(start);

      if (start < end) {
        timer = window.setTimeout(updateCount, incrementTime);
      }
    };

    updateCount();

    return () => clearTimeout(timer);
  }, [value, duration, isVisible]);

  return (
    <Card ref={ref} className="text-center hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6">
        <p className="text-4xl md:text-5xl font-bold text-tatva-blue mb-2">
          {count}
          {suffix}
        </p>
        <p className="text-gray-600">{label}</p>
      </CardContent>
    </Card>
  );
};

export default StatsSection;
