import {
  Menu,
  X,
  CheckCircle,
  Camera,
  Upload,
  Shield,
  Star,
  ChevronDown,
} from "lucide-react";
import React from "react";

const TestimonialBanner = () => {
  return (
    <div className="text-coal mb-4 flex items-center gap-4 p-4">
      {/* Profile Images Container */}
      <div className="flex -space-x-4">
        {/* Profile images overlapped */}
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-300">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Founder 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-300">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Founder 2"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-300">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Founder 3"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-300">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Founder 4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Stars and Text Container */}
      <div className="flex flex-col">
        {/* Stars */}
        <div className="mb-1 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-5 w-5 fill-current text-yellow-500" />
          ))}
        </div>

        {/* Text */}
        <div className="text-sm font-medium text-charcoal">
          1000+ Students found their perfect internships
        </div>
      </div>
    </div>
  );
};

export default TestimonialBanner;
