'use client';

import { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/data/portfolio';

const ALPHABET = ['A', 'B', 'C', 'D', 'E'];

interface QuizWidgetProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export default function QuizWidget({ title, description, questions }: QuizWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  // To trigger fade-in animation consistently on question change
  const [fadeKey, setFadeKey] = useState(0);
  const triggerFade = () => setFadeKey(prev => prev + 1);

  const correctCount = Object.entries(userAnswers).filter(
    ([qIdx, selectedOptIdx]) => questions[Number(qIdx)].options[selectedOptIdx].isCorrect
  ).length;
  
  const wrongCount = Object.keys(userAnswers).length - correctCount;

  const handleOptionClick = (optIndex: number) => {
    if (userAnswers.hasOwnProperty(currentIndex) || isReviewMode) return;
    
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      triggerFade();
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      triggerFade();
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsReviewMode(false);
    setShowSummary(false);
    triggerFade();
  };

  const handleReview = () => {
    setIsReviewMode(true);
    setCurrentIndex(0);
    setShowSummary(false);
    triggerFade();
  };

  // ─── Gauge Chart Animation State ───
  const [gaugeOffset, setGaugeOffset] = useState(110);
  useEffect(() => {
    if (showSummary) {
      const percentage = correctCount / questions.length;
      // Slight delay to allow CSS transition to catch the initial 110 value
      const timer = setTimeout(() => {
        setGaugeOffset(110 - (110 * percentage));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setGaugeOffset(110);
    }
  }, [showSummary, correctCount, questions.length]);

  return (
    <div className="bg-white dark:bg-[#1e1f20] border border-[#e1e3e1] dark:border-[#444746] rounded-[24px] overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] transition-all duration-300 w-full relative">
      
      {/* ─── Header Toolbar (Mock) ─── */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#e1e3e1] dark:border-[#444746]">
        <div className="text-[1.125rem] font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">{title}</div>
        <div className="flex gap-2">
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-[#444746] dark:text-[#c4c7c5] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]" aria-label="Share">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-[#444746] dark:text-[#c4c7c5] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]" aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {!showSummary ? (
          /* ─── QUIZ ENGINE VIEW ─── */
          <div className="flex flex-col gap-6">
            
            {/* Progress Section */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-1 w-full">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[6px] rounded-full flex-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      idx === currentIndex
                        ? 'bg-[#0b57d0] dark:bg-[#a8c7fa] flex-[2.5]'
                        : idx < currentIndex
                        ? 'bg-[#0b57d0] dark:bg-[#a8c7fa]'
                        : 'bg-[#e3e3e3] dark:bg-[#444746]'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[0.875rem] font-medium text-[#444746] dark:text-[#c4c7c5]">
                <div>{currentIndex + 1} / {questions.length}</div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[#b3261e] dark:text-[#f2b8b5]">close</span> <span>{wrongCount}</span></div>
                  <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[#146c2e] dark:text-[#c4eed0]">check</span> <span>{correctCount}</span></div>
                </div>
              </div>
            </div>

            {/* Question Content (with fade key) */}
            <div key={fadeKey} className="animation-fade-in flex flex-col gap-6">
              <div>
                <h2 className="text-[0.875rem] font-semibold text-[#444746] dark:text-[#c4c7c5] uppercase tracking-wide mb-2">
                  Question {currentIndex + 1}
                </h2>
                <div className="text-[1.25rem] leading-relaxed text-[#1f1f1f] dark:text-[#e3e3e3]">
                  {questions[currentIndex].question}
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3" role="list">
                {questions[currentIndex].options.map((option, optIdx) => {
                  const hasAnswered = userAnswers.hasOwnProperty(currentIndex);
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  const showExplanation = (hasAnswered && isSelected) || (hasAnswered && option.isCorrect) || (isReviewMode && option.isCorrect);
                  
                  let tileClasses = "bg-transparent border-[#e1e3e1] dark:border-[#444746] text-[#1f1f1f] dark:text-[#e3e3e3] ";
                  let indicator = null;

                  if (hasAnswered || isReviewMode) {
                    if (isSelected) {
                      if (option.isCorrect) {
                        tileClasses = "bg-[#e6f4ea] dark:bg-[#0f5223] border-[#c4eed0] dark:border-[#146c2e] ";
                        indicator = (
                          <div className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium px-3 py-1 rounded-full shrink-0 mt-0.5 bg-[#c4eed0] dark:bg-[#146c2e] text-[#146c2e] dark:text-[#c4eed0]">
                            <span className="material-symbols-outlined text-[18px]">check</span><span className="hidden sm:inline">Correct answer</span>
                          </div>
                        );
                      } else {
                        tileClasses = "bg-[#f9dedc] dark:bg-[#8c1d18] border-[#f2b8b5] dark:border-[#b3261e] ";
                        indicator = (
                          <div className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium px-3 py-1 rounded-full shrink-0 mt-0.5 bg-[#f2b8b5] dark:bg-[#b3261e] text-[#b3261e] dark:text-[#f2b8b5]">
                            <span className="material-symbols-outlined text-[18px]">close</span><span className="hidden sm:inline">Incorrect</span>
                          </div>
                        );
                      }
                    } else if (option.isCorrect) {
                      // Missed correct option
                      tileClasses = "bg-[#e6f4ea] dark:bg-[#0f5223] border-[#c4eed0] dark:border-[#146c2e] ";
                      indicator = (
                        <div className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium px-3 py-1 rounded-full shrink-0 mt-0.5 bg-[#c4eed0] dark:bg-[#146c2e] text-[#146c2e] dark:text-[#c4eed0]">
                          <span className="material-symbols-outlined text-[18px]">check</span><span className="hidden sm:inline">Correct answer</span>
                        </div>
                      );
                    }
                  } else {
                    tileClasses = "bg-transparent border-[#e1e3e1] dark:border-[#444746] hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer ";
                  }

                  return (
                    <button
                      key={optIdx}
                      role="listitem"
                      disabled={hasAnswered || isReviewMode}
                      onClick={() => handleOptionClick(optIdx)}
                      className={`flex flex-col border rounded-[16px] p-4 md:p-5 text-left transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] ${tileClasses} ${hasAnswered || isReviewMode ? 'cursor-default' : ''}`}
                    >
                      <div className="flex justify-between items-start gap-3 w-full">
                        <div className={`flex gap-3 text-[1rem] leading-relaxed flex-1 ${option.isCorrect && (isSelected || hasAnswered) ? 'font-medium' : ''}`}>
                          <span className="font-medium text-[#444746] dark:text-[#c4c7c5] shrink-0">{ALPHABET[optIdx]}.</span>
                          <span>
                            {option.text}
                            {hasAnswered && isSelected && (
                              <span className="inline-block bg-black/5 dark:bg-white/10 text-[0.75rem] px-2 py-1 rounded-full ml-2 font-medium">
                                (Your answer)
                              </span>
                            )}
                          </span>
                        </div>
                        {indicator}
                      </div>

                      {/* Explanation Expandable Row */}
                      <div className={`w-full text-[0.95rem] leading-relaxed text-[#444746] dark:text-[#c4c7c5] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${showExplanation ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-black/10 dark:border-white/10' : 'max-h-0 opacity-0'}`}>
                        {option.explanation}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className="px-6 py-2.5 rounded-full font-medium text-[0.875rem] transition-all bg-[#e1e3e1] dark:bg-[#444746] text-[#1f1f1f] dark:text-[#e3e3e3] hover:bg-black/10 dark:hover:bg-white/20 disabled:bg-[#e3e3e3] dark:disabled:bg-[#303030] disabled:text-[#8e8e8e] dark:disabled:text-[#757575] disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full font-medium text-[0.875rem] transition-all bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#131314] hover:bg-[#1b6ef3] dark:hover:bg-[#9bbbf0] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
              >
                {currentIndex === questions.length - 1 ? (isReviewMode ? 'View Results' : 'Finish') : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          /* ─── SUMMARY DASHBOARD VIEW ─── */
          <div className="animation-fade-in flex flex-col gap-6">
            
            {/* Header & Gauge */}
            <div className="flex flex-col items-center text-center gap-2 mb-4">
              <div className="font-medium mb-2 text-[#1f1f1f] dark:text-[#e3e3e3]">Score</div>
              
              <div className="relative w-[220px] h-[120px] mx-auto overflow-hidden">
                <svg viewBox="0 0 100 55" className="w-full h-full overflow-visible">
                  <path d="M 15 50 A 35 35 0 0 1 85 50" fill="none" className="stroke-[#e3e3e3] dark:stroke-[#444746]" strokeLinecap="round" strokeWidth="4" />
                  <path 
                    d="M 15 50 A 35 35 0 0 1 85 50" 
                    fill="none" 
                    className="stroke-[#0b57d0] dark:stroke-[#a8c7fa]" 
                    strokeLinecap="round" 
                    strokeWidth="4"
                    style={{
                      strokeDasharray: 110,
                      strokeDashoffset: gaugeOffset,
                      transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </svg>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-2">
                  <span className="text-[2rem] font-semibold text-[#1f1f1f] dark:text-[#e3e3e3] leading-none mb-1">{correctCount}/{questions.length}</span>
                  <span className="text-[0.875rem] font-medium text-[#444746] dark:text-[#c4c7c5] uppercase tracking-wide">Correct</span>
                </div>
              </div>
              
              <div className="text-[0.875rem] text-[#444746] dark:text-[#c4c7c5] mt-2">
                {questions.length - (correctCount + wrongCount)} skipped • {wrongCount} incorrect
              </div>
              <h2 className="text-[1.5rem] font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mt-4">
                {(correctCount / questions.length) >= 0.8 ? "Excellent! You have mastered these concepts." : (correctCount / questions.length) >= 0.5 ? "Solid progress! Keep up the good work." : "Keep practicing! Review the materials and try again."}
              </h2>
            </div>

            {/* Strengths & Focus Areas */}
            <div className="flex flex-col gap-4 mb-4">
              {(() => {
                const strengths: React.ReactNode[] = [];
                const focusAreas: React.ReactNode[] = [];

                questions.forEach((q, index) => {
                  const selectedOpt = userAnswers[index];
                  if (selectedOpt !== undefined && q.options[selectedOpt].isCorrect) {
                    strengths.push(<li key={index} className="text-[0.95rem] leading-relaxed text-[#444746] dark:text-[#c4c7c5]"><strong className="block mb-1 text-[#1f1f1f] dark:text-[#e3e3e3] font-semibold">{q.topic}</strong>{q.topicDesc}</li>);
                  } else {
                    focusAreas.push(<li key={index} className="text-[0.95rem] leading-relaxed text-[#444746] dark:text-[#c4c7c5]"><strong className="block mb-1 text-[#1f1f1f] dark:text-[#e3e3e3] font-semibold">{q.topic}</strong>{q.topicFocus}</li>);
                  }
                });

                return (
                  <>
                    {strengths.length > 0 && (
                      <div className="bg-[#f0f4f9] dark:bg-[#282a2c] rounded-[16px] p-5">
                        <h3 className="text-[1.125rem] font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-4">Strengths</h3>
                        <ul className="flex flex-col gap-4 list-none m-0 p-0">{strengths}</ul>
                      </div>
                    )}
                    {focusAreas.length > 0 && (
                      <div className="bg-[#f0f4f9] dark:bg-[#282a2c] rounded-[16px] p-5">
                        <h3 className="text-[1.125rem] font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-4">Focus areas</h3>
                        <ul className="flex flex-col gap-4 list-none m-0 p-0">{focusAreas}</ul>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            <div className="h-[1px] w-full bg-black/10 dark:bg-white/10 my-2" />

            {/* Keep Learning Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[1.125rem] font-medium text-[#1f1f1f] dark:text-[#e3e3e3] m-0">Keep Learning</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border border-[#e1e3e1] dark:border-[#444746] rounded-[16px] p-5 flex flex-col gap-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 hover:border-transparent transition-all">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[1.5rem]">headphones</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[1rem] text-[#1f1f1f] dark:text-[#e3e3e3]">Listen</span>
                      <span className="text-[0.75rem] text-[#444746] dark:text-[#c4c7c5] uppercase tracking-wide">Audio overview</span>
                    </div>
                  </div>
                  <div className="text-[0.875rem] text-[#444746] dark:text-[#c4c7c5] leading-relaxed mt-2">Get a personalized audio overview covering key concepts to keep learning.</div>
                </div>
                <div className="border border-[#e1e3e1] dark:border-[#444746] rounded-[16px] p-5 flex flex-col gap-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 hover:border-transparent transition-all">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[1.5rem]">style</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[1rem] text-[#1f1f1f] dark:text-[#e3e3e3]">Revise</span>
                      <span className="text-[0.75rem] text-[#444746] dark:text-[#c4c7c5] uppercase tracking-wide">Flashcards</span>
                    </div>
                  </div>
                  <div className="text-[0.875rem] text-[#444746] dark:text-[#c4c7c5] leading-relaxed mt-2">Create a complete set of flashcards from all your quiz material.</div>
                </div>
                <div className="border border-[#e1e3e1] dark:border-[#444746] rounded-[16px] p-5 flex flex-col gap-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 hover:border-transparent transition-all">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[1.5rem]">menu_book</span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[1rem] text-[#1f1f1f] dark:text-[#e3e3e3]">Learn</span>
                      <span className="text-[0.75rem] text-[#444746] dark:text-[#c4c7c5] uppercase tracking-wide">Study guide</span>
                    </div>
                  </div>
                  <div className="text-[0.875rem] text-[#444746] dark:text-[#c4c7c5] leading-relaxed mt-2">Generate a comprehensive study guide based on the materials.</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleReview}
                className="px-6 py-2.5 rounded-full font-medium text-[0.875rem] transition-all bg-[#e1e3e1] dark:bg-[#444746] text-[#1f1f1f] dark:text-[#e3e3e3] hover:bg-black/10 dark:hover:bg-white/20 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
              >
                Review
              </button>
              <button
                onClick={handleRestart}
                className="px-6 py-2.5 rounded-full font-medium text-[0.875rem] transition-all bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#131314] hover:bg-[#1b6ef3] dark:hover:bg-[#9bbbf0] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
              >
                Take another quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}