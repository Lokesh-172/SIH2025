import Link from "next/link";
import GridPattern from "./grid-pattern";

const CallToAction: React.FC = () => {
  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-32">
      <div className="absolute inset-0 overflow-hidden">
        <GridPattern /> {/* Adds opacity to make text clearer */}
      </div>
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h2 className="text-3xl font-bold text-charcoal mb-6">
          Ready to Find Your Perfect Internship?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of students who have found their ideal internships
          through our smart matching platform. Start your journey today!
        </p>
        <Link
          href="/build-profile"
          className="bg-peach text-black px-12 py-6 rounded-lg text-xl font-semibold hover:bg-opacity-90 shadow-lg inline-block"
        >
          Start Building Your Profile
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
