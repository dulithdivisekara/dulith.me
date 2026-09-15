'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-[#1e1f20] border border-[#e1e3e1] dark:border-[#444746] rounded-[24px] shadow-sm max-w-xl mx-auto my-12">
      <div className="w-16 h-16 bg-[#fce8e6] dark:bg-[#3f191b] rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#c5221f] dark:text-[#f28b82] text-3xl">error</span>
      </div>
      <h2 className="text-2xl font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-3">Something went wrong</h2>
      <p className="text-[#444746] dark:text-[#c4c7c5] mb-8 font-medium">An unexpected error occurred while loading this section.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#0b57d0] hover:bg-[#0842a0] dark:hover:bg-[#d3e3fd] transition-colors font-google-sans font-medium text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b57d0]"
      >
        Try again
      </button>
    </div>
  );
}
