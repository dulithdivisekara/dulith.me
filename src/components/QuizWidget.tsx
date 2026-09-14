import { useState } from 'react';
import type { QuizQuestion } from '../data/portfolio';

interface QuizWidgetProps {
    title: string;
    description: string;
    questions: QuizQuestion[];
}

export default function QuizWidget({ title, description, questions }: QuizWidgetProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleNext = () => {
        if (selectedOption === currentQuestion.correctAnswerIndex) {
            setScore(score + 1);
        }
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelectedOption(null);
        setScore(0);
        setShowResults(false);
    };

    return (
        <div className="bg-white dark:bg-[#1e1f20] border border-[#e1e3e1] dark:border-[#444746] rounded-[24px] overflow-hidden border-t-8 border-t-[#673ab7] shadow-sm transition-all duration-300">
            {showResults ? (
                <div className="p-6 md:p-8 animation-fade-in">
                    <h2 className="text-2xl font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-2">{title} - Results</h2>
                    <p className="text-[#444746] dark:text-[#c4c7c5] mb-6 font-medium">You scored {score} out of {questions.length} points.</p>

                    <div className="w-full bg-[#f0f4f9] dark:bg-[#303134] rounded-full h-3 mb-8 overflow-hidden">
                        <div
                            className="bg-[#673ab7] h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(score / questions.length) * 100}%` }}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleRestart}
                            className="px-6 py-2.5 rounded-full text-[#673ab7] hover:bg-[#673ab7]/10 active:bg-[#673ab7]/20 transition-colors font-google-sans font-medium text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#673ab7]"
                        >
                            Retake Quiz
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-6 md:p-8 animation-fade-in">
                    <div className="mb-6">
                        <h2 className="text-2xl font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-2">{title}</h2>
                        <p className="text-sm text-[#444746] dark:text-[#c4c7c5] mb-4">{description}</p>
                        <div className="text-xs font-medium text-[#673ab7] tracking-wider uppercase">
                            Question {currentIndex + 1} of {questions.length}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-[16px] text-[#1f1f1f] dark:text-[#e3e3e3] mb-5 font-medium leading-relaxed">
                            {currentQuestion.question}
                        </h3>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, idx) => (
                                <label
                                    key={idx}
                                    className={`relative flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-colors border ${selectedOption === idx ? 'border-[#673ab7] bg-[#673ab7]/5' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/20'} focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#673ab7] group`}
                                >
                                    <input
                                        type="radio"
                                        name="quiz-option"
                                        className="opacity-0 absolute w-px h-px"
                                        checked={selectedOption === idx}
                                        onChange={() => setSelectedOption(idx)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') setSelectedOption(idx);
                                        }}
                                    />
                                    <span className={`material-symbols-outlined text-[22px] ${selectedOption === idx ? 'text-[#673ab7]' : 'text-[#5f6368] dark:text-[#9aa0a6]'}`}>
                                      {selectedOption === idx ? 'radio_button_checked' : 'radio_button_unchecked'}
                                    </span>
                                    <span className="text-[#444746] dark:text-[#c4c7c5] text-[15px]">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-[#e1e3e1] dark:border-[#444746] pt-5 -mx-6 px-6 md:-mx-8 md:px-8">
                        <button
                            onClick={() => setSelectedOption(null)}
                            disabled={selectedOption === null}
                            className="px-4 py-2 rounded-full text-[#5f6368] dark:text-[#c4c7c5] hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/20 disabled:opacity-40 disabled:hover:bg-transparent transition-colors font-google-sans text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5f6368]"
                        >
                            Clear selection
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={selectedOption === null}
                            className="px-6 py-2.5 rounded-full bg-[#673ab7] text-white hover:bg-[#5e35b1] disabled:opacity-50 disabled:hover:bg-[#673ab7] transition-colors font-google-sans text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#673ab7]"
                        >
                            {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}