"use client";
import React, { useState } from "react";
import questions from "../../../data/questions.json";

export default function HeroSection() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkAnswer, setCheckAnswer] = useState(0);
  const questionIndex = questions[currentQIndex];

  const selectOption = (selectedOptionIndex) => {
    setSelectedOption(selectedOptionIndex);
  };
  const onSubmit = () => {
    if (selectedOption === null) return;

    if (selectedOption === questionIndex.answer) {
      setCheckAnswer(checkAnswer + 1);
    }

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
    } else {
      alert(`Quiz completed! You got ${checkAnswer + 1} correct answers.`);
    }
  };

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
            disabled={selectedOption === null}
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
