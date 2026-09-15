'use client';

import { useState } from 'react';
import AppLauncher from './AppLauncher';
import HelpModal from './HelpModal';
import Link from 'next/link';

export interface HeaderProps {
    isDarkMode: boolean;
    searchQuery: string;
    onToggleDarkMode: () => void;
    onOpenMobileMenu: () => void;
    onSearchChange: (query: string) => void;
}

export default function Header({
                                   isDarkMode,
                                   searchQuery,
                                   onToggleDarkMode,
                                   onOpenMobileMenu,
                                   onSearchChange,
                               }: HeaderProps) {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <>
            <header className="h-16 flex items-center justify-between px-2 md:px-6 bg-white dark:bg-[#1e1f20] md:bg-transparent md:dark:bg-transparent shrink-0 z-20 border-b md:border-none border-[#e1e3e1] dark:border-[#444746] transition-colors duration-300">

                {/* Left — hamburger + branding */}
                <div className="flex items-center">
                    <button
                        id="mobile-menu-btn"
                        onClick={onOpenMobileMenu}
                        aria-label="Open navigation menu"
                        className="p-3 mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 md:hidden transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
                    >
                        <span className="material-symbols-outlined text-[#5f6368] dark:text-[#c4c7c5]">menu</span>
                    </button>
                    <Link href="/" className="flex items-center gap-2 pl-2 md:pl-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-md">
                        <span className="text-xl font-google-sans font-medium text-[#5f6368] dark:text-[#e3e3e3]">
                          Portfolio
                        </span>
                    </Link>
                </div>

                {/* Centre — full search bar */}
                <div className="hidden sm:flex flex-1 max-w-[720px] mx-6">
                    <div className="w-full flex items-center bg-[#edf2fc] dark:bg-[#303134] rounded-full px-4 py-2.5 focus-within:bg-white dark:focus-within:bg-[#303134] focus-within:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] transition-all border border-transparent group focus-within:ring-2 focus-within:ring-[#0b57d0]">
                        <span className="material-symbols-outlined text-[#5f6368] dark:text-[#c4c7c5] mr-3 shrink-0 text-[20px]">search</span>
                        <input
                            id="portfolio-search"
                            type="text"
                            placeholder="Search my portfolio"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-[16px] text-[#1f1f1f] dark:text-[#e3e3e3] placeholder-[#5f6368] dark:placeholder-[#c4c7c5] font-roboto"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#5f6368] dark:text-[#c4c7c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Right — icon buttons + App Launcher + avatar */}
                <div className="flex items-center gap-1 md:gap-2 shrink-0">
                    <button
                        id="theme-toggle-btn"
                        onClick={onToggleDarkMode}
                        aria-label="Toggle colour scheme"
                        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
                    >
                        <span className="material-symbols-outlined text-[#5f6368] dark:text-[#e3e3e3]">
                          {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <button
                        id="help-btn"
                        onClick={() => setIsHelpOpen(true)}
                        aria-label="Help & Feedback"
                        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
                        title="Help"
                    >
                        <span className="material-symbols-outlined text-[#5f6368] dark:text-[#c4c7c5]">help</span>
                    </button>

                    <div className="hidden sm:block">
                        <AppLauncher onSearchSelect={() => {}} />
                    </div>

                    <div className="p-1">
                        <div
                            id="profile-avatar"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden cursor-pointer shadow-sm ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700 transition-all"
                        >
                            <img src="/profile.jpg" alt="Dulith Divisekara" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </header>

            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        </>
    );
}