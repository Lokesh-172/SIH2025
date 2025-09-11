"use client";

import React, { useState, useEffect } from "react";
import {
  Brain,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Target,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Star,
  BookOpen,
  Zap,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

interface QuizProps {
  title?: string;
  description?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  onComplete?: (score: number, answers: number[], timeTaken: number) => void;
  onClose?: () => void;
}

const Quiz: React.FC<QuizProps> = ({
  title = "Skills Assessment Quiz",
  description = "Test your knowledge and skills with this interactive quiz",
  questions,
  timeLimit = 30,
  onComplete,
  onClose,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setIsActive(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitQuiz = () => {
    setIsActive(false);
    setShowResults(true);
    const score = calculateScore();
    const timeTaken = timeLimit * 60 - timeLeft;
    if (onComplete) {
      onComplete(score, selectedAnswers, timeTaken);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setTimeLeft(timeLimit * 60);
    setIsActive(false);
    setShowExplanation(false);
    setQuizStarted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { message: "Outstanding! 🏆", color: "text-green-600" };
    if (score >= 80) return { message: "Great job! ⭐", color: "text-blue-600" };
    if (score >= 70) return { message: "Good work! 👍", color: "text-yellow-600" };
    if (score >= 60) return { message: "Not bad! 📚", color: "text-orange-600" };
    return { message: "Keep studying! 💪", color: "text-red-600" };
  };

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{questions.length}</p>
              <p className="text-sm font-medium text-gray-600">Questions</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{timeLimit}</p>
              <p className="text-sm font-medium text-gray-600">Minutes</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">100</p>
              <p className="text-sm font-medium text-gray-600">Max Score</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
              Quiz Instructions
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Answer all {questions.length} questions within {timeLimit} minutes
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                You can navigate between questions before submitting
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Your progress will be automatically saved
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Review your answers before final submission
              </li>
            </ul>
          </div>

          <div className="flex space-x-4">
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            )}
            <button
              onClick={startQuiz}
              className="flex-1 px-6 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (showResults) {
    const score = calculateScore();
    const { message, color } = getScoreMessage(score);
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Quiz Complete!</h1>
            <p className={`text-2xl font-semibold mb-2 ${color}`}>{message}</p>
            <p className="text-gray-600">You've successfully completed the assessment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-1">{score}%</p>
              <p className="text-sm font-medium text-gray-600">Final Score</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-1">{correctAnswers}</p>
              <p className="text-sm font-medium text-gray-600">Correct</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center border border-red-200">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-6 w-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-red-600 mb-1">
                {questions.length - correctAnswers}
              </p>
              <p className="text-sm font-medium text-gray-600">Incorrect</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-1">
                {formatTime(timeLimit * 60 - timeLeft)}
              </p>
              <p className="text-sm font-medium text-gray-600">Time Taken</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Performance Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["easy", "medium", "hard"].map((difficulty) => {
                const difficultyQuestions = questions.filter(q => q.difficulty === difficulty);
                const difficultyCorrect = difficultyQuestions.filter((q, index) => {
                  const originalIndex = questions.findIndex(question => question.id === q.id);
                  return selectedAnswers[originalIndex] === q.correctAnswer;
                }).length;
                const percentage = difficultyQuestions.length > 0 
                  ? Math.round((difficultyCorrect / difficultyQuestions.length) * 100) 
                  : 0;

                return (
                  <div key={difficulty} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize ${getDifficultyColor(difficulty)} border`}>
                        {difficulty}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          difficulty === 'easy' ? 'bg-green-500' : 
                          difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {difficultyCorrect}/{difficultyQuestions.length} questions
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartQuiz}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Retake Quiz
            </button>
            <button
              onClick={() => setShowExplanation(true)}
              className="flex-1 px-6 py-4 bg-blue-100 text-blue-700 rounded-2xl font-semibold hover:bg-blue-200 transition-all duration-200 flex items-center justify-center"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Review Answers
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Quiz Interface
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600 text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center px-4 py-2 rounded-2xl font-semibold ${
                timeLeft < 300 ? 'bg-red-100 text-red-700 border border-red-200' : 
                'bg-gray-100 text-gray-700 border border-gray-200'
              }`}>
                <Clock className="h-4 w-4 mr-2" />
                {formatTime(timeLeft)}
              </div>

            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-gray-900 to-gray-700 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{Math.round(progress)}% Complete</span>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-xl font-semibold capitalize ${getDifficultyColor(currentQ.difficulty)} border text-xs`}>
                {currentQ.difficulty}
              </span>
              <span className="px-3 py-1 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 text-xs font-medium">
                {currentQ.category}
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "border-gray-900 bg-gray-50 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-gray-900 bg-gray-900"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                currentQuestion === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    index === currentQuestion
                      ? "bg-gray-900 text-white shadow-lg"
                      : selectedAnswers[index] !== -1
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={selectedAnswers.includes(-1)}
                className={`flex items-center px-6 py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                  selectedAnswers.includes(-1)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Submit Quiz
                <Trophy className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-green-600">
                {selectedAnswers.filter(answer => answer !== -1).length}
              </span>{" "}
              of {questions.length} questions answered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample usage component
const QuizPage: React.FC = () => {
  const sampleQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary purpose of React Hooks?",
      options: [
        "To replace class components entirely",
        "To manage state and lifecycle in functional components",
        "To improve performance of React applications",
        "To handle routing in React applications"
      ],
      correctAnswer: 1,
      difficulty: "medium",
      category: "React",
      explanation: "React Hooks allow you to use state and other React features in functional components, making them more powerful and eliminating the need for class components in many cases."
    },
    {
      id: 2,
      question: "Which of the following is NOT a valid JavaScript data type?",
      options: [
        "undefined",
        "boolean",
        "float",
        "symbol"
      ],
      correctAnswer: 2,
      difficulty: "easy",
      category: "JavaScript",
      explanation: "JavaScript doesn't have a specific 'float' data type. Numbers in JavaScript are all of type 'number', whether they are integers or floating-point numbers."
    },
    {
      id: 3,
      question: "What is the time complexity of binary search in the worst case?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswer: 1,
      difficulty: "hard",
      category: "Data Structures",
      explanation: "Binary search has O(log n) time complexity because it divides the search space in half with each comparison, leading to a logarithmic number of operations."
    }
  ];

  const handleQuizComplete = (score: number, answers: number[], timeTaken: number) => {
    console.log("Quiz completed!", { score, answers, timeTaken });
    // Handle quiz completion logic here
  };

  const handleQuizClose = () => {
    console.log("Quiz closed");
    // Handle quiz close logic here
  };

  return (
    <Quiz
      title="Technical Skills Assessment"
      description="Evaluate your programming knowledge with this comprehensive quiz"
      questions={sampleQuestions}
      timeLimit={15}
      onComplete={handleQuizComplete}
      onClose={handleQuizClose}
    />
  );
};

export default Quiz;
export { QuizPage };
