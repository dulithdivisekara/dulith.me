'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/features/LoadingScreen';
import { SearchContext } from '@/context/SearchContext';

const THEME_KEY = 'dulith-portfolio-theme';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored !== null) return stored === 'dark';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }
    return false; // Default to light mode for SSR
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);

  const contextValue = useMemo(() => ({ searchQuery, setSearchQuery }), [searchQuery]);

  if (isLoading) return <LoadingScreen />;

  return (
    <SearchContext.Provider value={contextValue}>
      <div className={`flex flex-col h-screen bg-[#f8fafd] dark:bg-[#131314] text-[#1f1f1f] dark:text-[#e3e3e3] overflow-hidden`}>
        <Header
            isDarkMode={isDarkMode}
            searchQuery={searchQuery}
            onToggleDarkMode={toggleDarkMode}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onSearchChange={setSearchQuery}
        />

        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar
              isOpen={isMobileMenuOpen}
              isDarkMode={isDarkMode}
              onClose={() => setIsMobileMenuOpen(false)}
              onToggleDarkMode={toggleDarkMode}
          />

          <main className="flex-1 overflow-y-auto w-full flex flex-col">
            <div className="max-w-[840px] mx-auto px-4 py-6 md:py-10 flex-1 w-full">
              {searchQuery && (
                  <div className="mb-6 p-4 rounded-2xl bg-[#edf2fc] dark:bg-[#282a2c] flex justify-between items-center animation-fade-in">
                    <p className="text-sm text-[#444746] dark:text-[#c4c7c5]">
                      Search results for: <span className="font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">"{searchQuery}"</span>
                    </p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-[#0b57d0] dark:text-[#a8c7fa] hover:underline font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
                    >
                      Clear search
                    </button>
                  </div>
              )}

              {children}

            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SearchContext.Provider>
  );
}
