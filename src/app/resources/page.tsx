'use client';

import { useMemo, useContext } from 'react';
import Card from '../../components/Card';
import QuizWidget from '../../components/QuizWidget';
import { quizData } from '../../data/portfolio';
import { SearchContext } from '../../context/SearchContext';

export default function Resources() {
  const { searchQuery } = useContext(SearchContext);

  const filteredKnowledgeBase = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return 'sliit knowledge base vault y2s1 notes quizzes'.includes(q);
  }, [searchQuery]);

  return (
    <div className="animation-fade-in space-y-6">
      <h2 className="text-2xl font-google-sans font-medium px-2 mb-2">Educational Resources</h2>

      <QuizWidget
          title="IT Fundamentals Knowledge Check"
          description="Test your understanding of software engineering basics and React principles."
          questions={quizData}
      />

      {filteredKnowledgeBase && (
          <Card title="SLIIT IT - Knowledge Base" icon={<span className="material-symbols-outlined text-[#FBBC05] text-[24px]">folder_open</span>}>
            <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">An open-source collection of study notes and active recall quizzes for IT Undergraduates.</p>
            <a href="https://github.com/dulithdivisekara/SLIIT-Y2S1-vault" target="_blank" rel="noopener noreferrer" className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-sm">
              View GitHub Repository <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </Card>
      )}
    </div>
  );
}
