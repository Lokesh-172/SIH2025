const HowItWorks = () => (
  <div
    id="how-it-works"
    className="bg-gray-50 px-4 py-32 pt-20 sm:px-6 lg:px-8"
  >
    <div className="mx-auto max-w-7xl">
      <h2 className="mb-12 text-center text-4xl font-bold text-charcoal">
        Find Your Perfect Internship in 3 Simple Steps
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="bg-peach mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl font-bold text-white">1</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-charcoal">
            Build Your Profile
          </h3>
          <p className="text-gray-600">
            Create a comprehensive profile with your education, skills, and
            preferences. Our system supports multiple languages and voice input
            for easy accessibility.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-peach mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl font-bold text-white">2</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-charcoal">
            Get Smart Recommendations
          </h3>
          <p className="text-gray-600">
            Our AI analyzes your profile and matches you with the top 3-5
            internships that perfectly align with your skills, interests, and
            location preferences.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-peach mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-charcoal">
            Apply with One Click
          </h3>
          <p className="text-gray-600">
            See clear match percentages and explanations for each
            recommendation. Apply to your chosen internships with a simple
            one-click process.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks;
