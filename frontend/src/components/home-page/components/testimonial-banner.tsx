import {
  Star,
  Users,
} from "lucide-react";
import React from "react";

const TestimonialBanner = () => {
  return (
    <div className="inline-flex items-center gap-4 rounded-2xl bg-card ring-1 ring-border shadow-sm p-4 sm:p-5">
      {/* Decorative background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl">
        <div className="absolute -top-4 -right-4 size-20 rounded-full bg-brand-soft/40 blur-xl opacity-60" aria-hidden="true" />
      </div>
      
      {/* Profile Images Container */}
      <div className="relative flex -space-x-3">
        {/* Profile images overlapped with modern styling */}
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-background bg-secondary">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Student success story"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-background bg-secondary">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Student success story"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-background bg-secondary">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Student success story"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-background bg-secondary">
          <img
            src="/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg"
            alt="Student success story"
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Count badge */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
          <span className="text-xs font-bold">1K+</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-2">
        {/* Stars with modern styling */}
        <div className="flex items-center gap-1" aria-label="5 star rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className="h-4 w-4 fill-current text-chart-2" 
              aria-hidden="true"
            />
          ))}
          <span className="ml-2 text-sm font-medium text-muted-foreground">5.0</span>
        </div>

        {/* Text with improved typography */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">
            1000+ Students found their perfect internships
          </span>
        </div>
      </div>

      {/* Support indicator */}
      <div className="ml-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2 py-1 text-xs font-medium text-foreground ring-1 ring-border">
          <span className="inline-block size-1.5 rounded-full bg-chart-2" aria-hidden="true" />
          Trusted
        </div>
      </div>
    </div>
  );
};

export default TestimonialBanner;