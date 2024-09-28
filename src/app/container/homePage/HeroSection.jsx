"use client";
import React, { useState } from "react";
import questions from "../../../data/questions.json";

export default function HeroSection() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false); // Track quiz completion
  const questionIndex = questions[currentQIndex];

  const selectOption = (selectedOptionIndex) => {
    setSelectedOption(selectedOptionIndex);
  };

  const onSubmit = () => {
    if (selectedOption === null) return; // Only submit if an option is selected

    // Get the selected answer based on the selected option index
    const selectedAnswer = [
      questionIndex.A,
      questionIndex.B,
      questionIndex.C,
      questionIndex.D,
    ][selectedOption];
    console.log("Selected Answer:", selectedAnswer);
    console.log("Correct Answer:", questionIndex[questionIndex.answer]);

    if (selectedAnswer === questionIndex[questionIndex.answer]) {
      setCorrectAnswers(correctAnswers + 1); // Increment correct answers if the answer is correct
    }

    // Move to the next question or complete the quiz
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null); // Reset the selected option for the next question
    } else {
      setQuizCompleted(true); // Mark the quiz as completed
    }
  };

  if (quizCompleted) {
    const totalQuestions = questions.length;

    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">
              Quiz Completed!
            </h2>
            <p className="text-gray-500">Here are your results:</p>
          </div>

          {/* Circular Progress Display */}
          <div className="flex justify-center items-center my-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-indigo-500 flex justify-center items-center">
                <span className="text-3xl font-bold text-indigo-600">
                  {correctAnswers}/{totalQuestions}
                </span>
              </div>
              <p className="text-center text-lg font-semibold text-gray-700 mt-4">
                Correct Answers
              </p>
            </div>
          </div>

          {/* Restart Quiz Button */}
          <div className="mt-6 text-center">
            <button
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              onClick={() => {
                setCurrentQIndex(0);
                setCorrectAnswers(0);
                setSelectedOption(null);
                setQuizCompleted(false);
              }}
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        {/* Card Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">Quiz Time!</h2>
          <p className="text-gray-500">Test your knowledge with this quiz.</p>
        </div>

        {/* Question */}
        <div className="mb-4">
          <p className="text-lg text-gray-700 font-semibold">
            {questionIndex.question}
          </p>
        </div>

        {/* Options */}
        {[
          questionIndex.A,
          questionIndex.B,
          questionIndex.C,
          questionIndex.D,
        ].map((option, index) => (
          <div key={index} className="space-y-4">
            <button
              className={`w-full py-4 my-2 font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 
                ${
                  selectedOption === index
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-indigo-500"
                }
              `}
              onClick={() => selectOption(index)}
            >
              {option}
            </button>
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            disabled={selectedOption === null} // Disable if no option is selected
            className={`w-full py-3 font-semibold rounded-lg shadow-md focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
              ${
                selectedOption !== null
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            onClick={onSubmit}
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
