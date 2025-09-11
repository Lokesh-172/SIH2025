import React from "react";
import {
  CheckCircle,
  LayoutTemplate,
  Columns3,
  PanelLeft,
  PanelRight,
  AlignLeft,
  Users,
  Building2,
} from "lucide-react";
import Link from "next/link";
import TestimonialBanner from "./testimonial-banner";
import GridPattern from "./grid-pattern";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gray-100 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <GridPattern />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 lg:grid-cols-2 min-h-[80vh]">
          {/* Left: Content */}
          <div className="flex flex-col justify-center lg:pr-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 w-fit mb-6">
              <span className="inline-block size-1.5 rounded-full bg-green-500" />
              Smarter matches. Faster starts.
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-gray-900 leading-tight mb-6">
              AI-powered internship recommendations
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              We analyze your skills, interests, and goals to match you with the
              internships where you'll thrive. Discover roles tailored to your
              strengths and start building your career with confidence.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <Link
                href="/login"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Users className="size-5" />
                Start your recommendations
              </Link>
              <Link
                href="/login?type=company"
                className="bg-white text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-lg inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Building2 className="size-5" />
                For Companies
              </Link>
            </div>
            {/* Support bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-green-500" />
                <span className="text-gray-700">
                  Personalized role fit based on your profile
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-blue-500" />
                <span className="text-gray-700">
                  Real-time market insights and trends
                </span>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Main Dashboard Container */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                {/* Header Bar */}
                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="inline-block size-2.5 rounded-full bg-red-500" />
                      <span className="inline-block size-2.5 rounded-full bg-yellow-500" />
                      <span className="inline-block size-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      Candidate Profile
                    </span>
                  </div>
                  <AlignLeft className="size-4 text-gray-400" />
                </div>

                {/* Profile + AI Matching Section */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Your Inputs */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <PanelLeft className="size-4 text-gray-500" />
                      Your Inputs
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="inline-block size-1 rounded-full bg-blue-500" />
                        <span className="text-gray-600">Data Science</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block size-1 rounded-full bg-green-500" />
                        <span className="text-gray-600">Python, SQL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block size-1 rounded-full bg-purple-500" />
                        <span className="text-gray-600">Summer 2025</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Matching */}
                  <div className="col-span-2 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                      <LayoutTemplate className="size-4 text-gray-500" />
                      AI Matching
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Role Fit */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">
                          Role Fit
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-2">
                          92%
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full">
                          <div
                            className="h-1.5 bg-green-500 rounded-full"
                            style={{ width: "92%" }}
                          />
                        </div>
                      </div>
                      {/* Growth */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Growth</div>
                        <div className="text-lg font-bold text-gray-900 mb-2">
                          High
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full">
                          <div
                            className="h-1.5 bg-blue-500 rounded-full"
                            style={{ width: "80%" }}
                          />
                        </div>
                      </div>
                      {/* Culture */}
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">
                          Culture
                        </div>
                        <div className="text-lg font-bold text-gray-900 mb-2">
                          Strong
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full">
                          <div
                            className="h-1.5 bg-purple-500 rounded-full"
                            style={{ width: "75%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Internships */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Columns3 className="size-4 text-gray-500" />
                      Recommended Internships
                    </div>
                    <PanelRight className="size-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { title: "Data Analyst Intern", tag: "FinTech" },
                      { title: "ML Engineer Intern", tag: "HealthTech" },
                      { title: "Product Intern", tag: "SaaS" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-3 shadow-sm hover:-translate-y-0.5 transition-transform group"
                      >
                        <div className="flex flex-col gap-1 mb-2">
                          <div className="text-xs font-medium text-gray-800 truncate">
                            {item.title}
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full w-fit">
                            {item.tag}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full">
                          <div
                            className="h-1.5 bg-green-500 rounded-full group-hover:w-[92%] transition-all duration-300"
                            style={{ width: "88%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Banner */}
        <div className="mt-16 flex justify-center">
          <TestimonialBanner />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
