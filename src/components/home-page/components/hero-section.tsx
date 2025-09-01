import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import TestimonialBanner from "./testimonial-banner";
import GridPattern from "./grid-pattern";

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Background Pattern - Positioned absolutely */}
      <div className="absolute inset-0">
        <GridPattern />
      </div>

      {/* Content - Positioned relatively to appear above background */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6 w-3/4 pt-32">
              Smart Internship Matching for PM Internship Schemes
            </h1>

            <p className="text-xl text-gray-600 mb-8 block w-3/5">
              Find your perfect internship match with AI-powered recommendations
              tailored for the PM Internship Scheme. No more overwhelming
              choices - just the right opportunities for you.
            </p>

            {/* Two-column layout for Students and Companies */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto mb-8">
              {/* Students/Applicants Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-charcoal mb-4 text-center">
                  For Students
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">Smart AI Matching</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">
                      Personalized Recommendations
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">
                      Profile Building Tools
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">Application Tracking</span>
                  </div>
                </div>

                <Link
                  href="/build-profile"
                  className="w-full text-center block text-black bg-peach px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 shadow-lg transition-all"
                >
                  Build Your Profile & Find Internships
                </Link>
              </div>

              {/* Companies Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-charcoal mb-4 text-center">
                  For Companies
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">
                      Quality Candidate Pool
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">
                      Multi-Language Support
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">Easy Job Posting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-melon mr-3" />
                    <span className="text-gray-700">Automated Screening</span>
                  </div>
                </div>

                <Link
                  href="/post-job"
                  className="w-full text-center block text-white bg-charcoal px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 shadow-lg transition-all"
                >
                  Post Internship Opportunities
                </Link>
              </div>
            </div>

            <div className="mb-4">
              <TestimonialBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
