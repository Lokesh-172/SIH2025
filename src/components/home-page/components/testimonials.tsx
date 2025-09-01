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
      img: "/people/student1.png",
    },
    {
      quote:
        "The voice input feature was amazing! I could build my profile even without being great at typing. Found my dream marketing internship within days.",
      name: "Arjun Patel",
      title: "Commerce Student, Gujarat",
      img: "/people/student2.png",
    },
    {
      quote:
        "The Hindi language support made all the difference. I understood everything clearly and got matched with an internship in my preferred location.",
      name: "Deepika Singh",
      title: "Engineering Student, Uttar Pradesh",
      img: "/people/student3.png",
    },
    {
      quote:
        "No more scrolling through hundreds of internships! The AI showed me exactly what I needed. Got selected for a PM Internship Scheme opportunity!",
      name: "Rajesh Kumar",
      title: "BBA Student, Bihar",
      img: "/people/student4.png",
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
              className="bg-white p-6 rounded-2xl shadow-lg max-w-xs transition-transform transform hover:scale-105"
            >
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-5 text-left">
                "Aurea helped me identify my skin condition quickly and
                accurately. The recommendations were spot-on!"
                {item.quote}
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                  <img className="rounded-full" src={item.img} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-left">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 text-left">
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
