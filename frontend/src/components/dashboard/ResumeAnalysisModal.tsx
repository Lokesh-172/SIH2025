"use client";

import React from "react";
import {
  X,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Clock,
} from "lucide-react";
import { ResumeAnalysis } from "@/slice/user-slice";

interface ResumeAnalysisModalProps {
  analysis: ResumeAnalysis;
  onClose: () => void;
}

const ResumeAnalysisModal: React.FC<ResumeAnalysisModalProps> = ({
  analysis,
  onClose,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Resume Analysis Report
              </h2>
              <p className="text-sm text-gray-600">
                Analyzed on {new Date(analysis.analyzedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Score Overview */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="text-center mb-6">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBg(
                analysis.score
              )} mb-4`}
            >
              <span
                className={`text-2xl font-bold ${getScoreColor(
                  analysis.score
                )}`}
              >
                {analysis.score}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ATS Compatibility Score: {getScoreText(analysis.score)}
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  analysis.score >= 80
                    ? "bg-green-500"
                    : analysis.score >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              Overall Feedback
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {analysis.overall_feedback}
            </p>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Detailed Analysis
          </h3>

          <div className="space-y-6">
            {analysis.detailed_feedback.map((feedback, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                    <CheckCircle2 className="h-3 w-3 text-blue-600" />
                  </div>
                  {feedback.section}
                </h4>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {feedback.feedback}
                </p>

                {feedback.suggestions && feedback.suggestions.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                      Improvement Suggestions
                    </h5>
                    <ul className="space-y-2">
                      {feedback.suggestions.map(
                        (suggestion, suggestionIndex) => (
                          <li
                            key={suggestionIndex}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <div className="w-4 h-4 bg-yellow-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                            </div>
                            {suggestion}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Information */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-purple-600" />
            Skills Assessment Available
          </h3>
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 mb-1">
                  We've generated {analysis.quiz_questions_with_answers.length}{" "}
                  personalized quiz questions based on your resume to help
                  validate your skills.
                </p>
                <p className="text-sm text-gray-600">
                  Taking the quiz can help improve your job match accuracy.
                </p>
              </div>
              <div className="text-center ml-4">
                <div className="text-2xl font-bold text-purple-600">
                  {analysis.quiz_questions_with_answers.length}
                </div>
                <div className="text-xs text-gray-600">Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              Analysis completed on{" "}
              {new Date(analysis.analyzedAt).toLocaleString()}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisModal;
