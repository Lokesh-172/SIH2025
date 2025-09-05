import { Star } from "lucide-react";
import { cn } from "../../../lib/utils";
import React, { useEffect, useState } from "react";

interface TestimonialsProps {
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  const items = [
    {
      quote:
        "InternMatch helped me find an internship that perfectly matched my skills. As a first-generation college student, I was overwhelmed by the options, but this platform made it so simple!",
      name: "Priya Sharma",
      title: "Computer Science Student, Rural Maharashtra",
      img: "/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg",
    },
    {
      quote:
        "The voice input feature was amazing! I could build my profile even without being great at typing. Found my dream marketing internship within days.",
      name: "Arjun Patel",
      title: "Commerce Student, Gujarat",
      img: "/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg",
    },
    {
      quote:
        "The Hindi language support made all the difference. I understood everything clearly and got matched with an internship in my preferred location.",
      name: "Deepika Singh",
      title: "Engineering Student, Uttar Pradesh",
      img: "/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg",
    },
    {
      quote:
        "No more scrolling through hundreds of internships! The AI showed me exactly what I needed. Got selected for a PM Internship Scheme opportunity!",
      name: "Rajesh Kumar",
      title: "BBA Student, Bihar",
      img: "/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg",
    },
  ];

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 text-center py-20">
      <h2 className="text-4xl font-bold text-charcoal mb-12">
        Success Stories from Students Like You
      </h2>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-6 py-6 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg w-80 h-64 flex flex-col transition-transform transform hover:scale-105"
            >
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 text-left flex-1 mb-4 text-sm leading-relaxed overflow-hidden">
                {item.quote}
              </p>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex-shrink-0 overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={item.img}
                    alt={item.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-left text-sm truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 text-left truncate">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
