import React from "react";
import { TrendingUp, Users, MapPin, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-peach" />,
      number: "5,000+",
      label: "Students Matched",
      description: "Successfully connected with internships",
    },
    {
      icon: <MapPin className="h-8 w-8 text-peach" />,
      number: "28",
      label: "States Covered",
      description: "Including rural and tribal areas",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-peach" />,
      number: "94%",
      label: "Match Success Rate",
      description: "Students satisfied with recommendations",
    },
    {
      icon: <Award className="h-8 w-8 text-peach" />,
      number: "15+",
      label: "Languages Supported",
      description: "Regional language accessibility",
    },
  ];

  return (
    <div className="bg-charcoal text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Empowering India's Future Workforce
          </h2>
          <p className="text-xl text-gray-300">
            Our platform is making a real difference for students across India
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-peach mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <div className="text-gray-300 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800 p-8 rounded-2xl">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Bridging the Digital Divide
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Our mission is to ensure that every student, regardless of their
              background or location, has access to quality internship
              opportunities that can transform their career trajectory.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-peach mb-2">Rural Focus</h4>
                <p className="text-sm text-gray-300">
                  Specially designed features for students in remote areas with
                  limited connectivity
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-peach mb-2">
                  First-Generation Support
                </h4>
                <p className="text-sm text-gray-300">
                  Guided assistance for students who are the first in their
                  families to pursue internships
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-peach mb-2">
                  Cultural Sensitivity
                </h4>
                <p className="text-sm text-gray-300">
                  Understanding of diverse cultural backgrounds and regional
                  differences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
