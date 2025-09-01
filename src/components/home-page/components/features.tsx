import {
  Menu,
  X,
  CheckCircle,
  Users,
  Brain,
  Globe,
  Star,
  ChevronDown,
} from "lucide-react";

const Features = () => (
  <div id="features" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl p-16 rounded-3xl border-[3px] my-20 border-charcoal">
      <h2 className="mb-12 text-center text-4xl font-bold text-charcoal">
        Advanced Matching Technology for Better Opportunities
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-lg bg-white p-6">
          <Brain className="mb-4 h-12 w-12 text-peach" />
          <h3 className="mb-2 text-lg font-semibold text-charcoal">
            AI-Powered Smart Matching
          </h3>
          <p className="text-gray-600 text-center">
            Our intelligent algorithm considers your skills, academic
            background, sector interests, and location preferences to deliver
            personalized internship recommendations with high match accuracy.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-white p-6">
          <Users className="mb-4 h-12 w-12 text-peach" />
          <h3 className="mb-2 text-lg font-semibold text-charcoal">
            First-Generation Learner Focus
          </h3>
          <p className="text-gray-600 text-center">
            Specially designed for rural and tribal candidates with features
            like regional language support, voice input, visual interface
            design, and progressive profiling to avoid overwhelming new users.
          </p>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-white p-6 ">
          <Globe className="mb-4 h-12 w-12 text-peach" />
          <h3 className="mb-2 text-lg font-semibold text-charcoal">
            Mobile-First Accessibility
          </h3>
          <p className="text-gray-600 text-center">
            Complete mobile-first design with offline capabilities, simple
            card-based interface, and support for multiple Indian languages to
            ensure accessibility for users in areas with poor connectivity.
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default Features;
