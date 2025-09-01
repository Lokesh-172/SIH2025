import React from "react";
import { Brain, Target, Users, Globe, Mic, Smartphone } from "lucide-react";

const AlgorithmShowcase = () => {
  return (
    <div className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Multi-Modal Profile Building */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-charcoal mb-6">
              Multi-Modal Profile Building
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Create your comprehensive profile through multiple intuitive
              methods designed for users of all digital literacy levels.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mic className="h-8 w-8 text-peach" />
                <span className="text-gray-700">Voice Input</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-8 w-8 text-peach" />
                <span className="text-gray-700">Multi-Language</span>
              </div>
              <div className="flex items-center space-x-3">
                <Smartphone className="h-8 w-8 text-peach" />
                <span className="text-gray-700">Mobile-First</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-peach" />
                <span className="text-gray-700">Accessible Design</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-peach to-orange-200 p-8 rounded-2xl">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-charcoal">
                  Basic Information
                </h4>
                <p className="text-sm text-gray-600">
                  Education, field of study, performance
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-charcoal">
                  Skills Assessment
                </h4>
                <p className="text-sm text-gray-600">
                  Interactive quizzes for technical & soft skills
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-charcoal">Preferences</h4>
                <p className="text-sm text-gray-600">
                  Sector interests & location preferences
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-charcoal">Resume Analysis</h4>
                <p className="text-sm text-gray-600">
                  ATS-powered skill extraction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User-Centric Design Features */}
        <div className="bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-3xl font-bold text-charcoal mb-8 text-center">
            Designed for Rural & First-Generation Learners
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-peach p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-charcoal mb-2">
                Top 3-5 Suggestions
              </h4>
              <p className="text-gray-600">
                No overwhelming lists - just the most relevant matches
              </p>
            </div>
            <div className="text-center">
              <div className="bg-peach p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-charcoal mb-2">
                Clear Explanations
              </h4>
              <p className="text-gray-600">
                Understand why each internship is recommended for you
              </p>
            </div>
            <div className="text-center">
              <div className="bg-peach p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-charcoal mb-2">
                One-Click Apply
              </h4>
              <p className="text-gray-600">
                Simple application process with offline capability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmShowcase;
