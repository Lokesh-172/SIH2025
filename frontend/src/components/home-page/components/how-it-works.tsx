"use client";

import React from "react";
import {
  User,
  Brain,
  MousePointer,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: React.ElementType;
  number: number;
};

export interface HowItWorksProps {
  className?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Build Your Profile",
    description:
      "Create a comprehensive profile with your education, skills, and preferences. Our system supports multiple languages and voice input for easy accessibility.",
    icon: User,
  },
  {
    number: 2,
    title: "Get Smart Recommendations",
    description:
      "Our AI analyzes your profile and matches you with the top 3-5 internships that perfectly align with your skills, interests, and location preferences.",
    icon: Brain,
  },
  {
    number: 3,
    title: "Apply with One Click",
    description:
      "See clear match percentages and explanations for each recommendation. Apply to your chosen internships with a simple one-click process.",
    icon: MousePointer,
  },
];

const HowItWorks = ({ className, steps = defaultSteps }: HowItWorksProps) => {
  return (
    <section
      id="how-it-works"
      className={`w-full bg-gray-50 py-20 ${className || ""}`}
      aria-labelledby="how-it-works-heading"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Find Your Perfect Internship in 3 Simple Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A streamlined journey designed to match you with the right opportunities quickly and efficiently.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="text-center">
                {/* Icon Container */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 shadow-lg">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;