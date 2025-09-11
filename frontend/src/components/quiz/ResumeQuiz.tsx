"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { QuizQuestion } from "@/slice/user-slice";
import Quiz from "./quiz";
import {
  Brain,
  FileText,
  TrendingUp,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface ResumeQuizProps {
  onClose?: () => void;
  onComplete?: (score: number, answers: number[], timeTaken: number) => void;
}

const ResumeQuiz: React.FC<ResumeQuizProps> = ({ onClose, onComplete }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [showQuiz, setShowQuiz] = useState(false);

  const resumeAnalysis = user?.profile?.resumeAnalysis;

  // Convert resume analysis questions to Quiz component format
  const convertToQuizFormat = (questions: QuizQuestion[]) => {
    return questions.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.options.findIndex(
        (opt: string) => opt === q.correct_answer
      ),
      difficulty: (index < 3 ? "easy" : index < 8 ? "medium" : "hard") as
        | "easy"
        | "medium"
        | "hard",
      category: "Resume Skills Assessment",
      explanation: `Correct answer: ${q.correct_answer}`,
    }));
  };

  if (
    !resumeAnalysis?.quiz_questions_with_answers ||
    resumeAnalysis.quiz_questions_with_answers.length === 0
  ) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            No Quiz Available
          </h2>
          <p className="text-gray-600 mb-6">
            {!resumeAnalysis
              ? "Please upload and analyze your resume first to generate a personalized skills assessment quiz."
              : "No quiz questions were generated from your resume analysis. Please try uploading your resume again."}
          </p>
          {onClose && (
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  const quizQuestions = convertToQuizFormat(
    resumeAnalysis.quiz_questions_with_answers
  );

  if (showQuiz) {
    return (
      <Quiz
        title="Resume Skills Assessment"
        description="Test your knowledge based on the skills identified in your resume"
        questions={quizQuestions}
        timeLimit={15} // 15 minutes for 10 questions
        onComplete={(score, answers, timeTaken) => {
          setShowQuiz(false);
          if (onComplete) {
            onComplete(score, answers, timeTaken);
          }
        }}
        onClose={() => {
          setShowQuiz(false);
          if (onClose) {
            onClose();
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Resume Skills Assessment
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Based on your resume analysis, we've created a personalized quiz to
            test your knowledge in the skills you've mentioned.
          </p>
        </div>

        {/* Resume Analysis Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Your Resume Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {resumeAnalysis.score}
              </div>
              <div className="text-sm text-gray-600">ATS Score</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {quizQuestions.length}
              </div>
              <div className="text-sm text-gray-600">Quiz Questions</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
          </div>
        </div>

        {/* Quiz Instructions */}
        <div className="bg-amber-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-600" />
            Quiz Instructions
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              Answer all {quizQuestions.length} questions within 15 minutes
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              Questions are based on skills mentioned in your resume
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              Mix of easy, medium, and hard difficulty levels
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              Your score will help validate your resume claims
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center group"
            >
              <X className="h-5 w-5 mr-2" />
              Close
            </button>
          )}
          <button
            onClick={() => setShowQuiz(true)}
            className="flex-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            <Brain className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Skills Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeQuiz;
