import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
  // Track which FAQ is open using its index
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the matching algorithm work?",
      answer:
        "Our AI considers skills, education, sector interests, location preferences, ATS scores, and quiz performance to create a personalized matching score and recommend the top 3-5 most suitable internships for you.",
    },
    {
      question: "Is the platform accessible for rural users?",
      answer:
        "Yes! We support multiple Indian languages, voice input, offline capabilities, and have a simple visual interface designed specifically for users with varying digital literacy levels.",
    },
    {
      question: "How quickly do I get internship recommendations?",
      answer:
        "Once you complete your profile, you'll receive personalized internship recommendations instantly. The system updates in real-time as new opportunities become available.",
    },
    {
      question: "Is this only for PM Internship Scheme opportunities?",
      answer:
        "While we specialize in PM Internship Scheme opportunities, our platform also includes other relevant internships suitable for first-generation learners and rural candidates.",
    },
    {
      question: "Do I need technical skills to use the platform?",
      answer:
        "Not at all! Our platform is designed with a mobile-first, card-based interface that's easy to navigate. We also provide step-by-step guidance and voice input options for added convenience.",
    },
  ];

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full group"
              >
                <span className="text-lg font-semibold text-charcoal text-left">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-melon transition-transform duration-200 ease-in-out ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
