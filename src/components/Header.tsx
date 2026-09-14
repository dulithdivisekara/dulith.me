import { Search, HelpCircle, Grid, Menu, Moon, Sun } from 'lucide-react';

export interface HeaderProps {
  isDarkMode: boolean;
  searchQuery: string;
  onToggleDarkMode: () => void;
  onOpenMobileMenu: () => void;
  onSearchChange: (query: string) => void;
}

/**
 * Header — top app bar following the MD3 / Google Account style.
 * Contains the hamburger menu (mobile), branding, search bar,
 * utility icon buttons, and the user avatar.
 */
export default function Header({
  isDarkMode,
  searchQuery,
  onToggleDarkMode,
  onOpenMobileMenu,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-2 md:px-6 bg-white dark:bg-[#1e1f20] md:bg-transparent md:dark:bg-transparent shrink-0 z-20 border-b md:border-none border-[#e1e3e1] dark:border-[#444746] transition-colors duration-300">

      {/* Left — hamburger + branding */}
      <div className="flex items-center">
        <button
          id="mobile-menu-btn"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="p-3 mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 md:hidden transition-colors"
        >
          <Menu size={24} className="text-[#5f6368] dark:text-[#c4c7c5]" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer pl-2 md:pl-0">
          <span className="text-xl font-google-sans font-medium text-[#5f6368] dark:text-[#e3e3e3]">
            Portfolio
          </span>
        </div>
      </div>

      {/* Centre — full search bar (hidden on xs) */}
      <div className="hidden sm:flex flex-1 max-w-[720px] mx-6">
        <div className="w-full flex items-center bg-[#edf2fc] dark:bg-[#282a2c] rounded-full px-4 py-2.5 focus-within:bg-white dark:focus-within:bg-[#303134] focus-within:shadow-md transition-all border border-transparent">
          <Search size={20} className="text-[#5f6368] dark:text-[#c4c7c5] mr-3 shrink-0" />
          <input
            id="portfolio-search"
            type="text"
            placeholder="Search my portfolio"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-[16px] text-[#1f1f1f] dark:text-[#e3e3e3] placeholder-[#5f6368] dark:placeholder-[#c4c7c5] font-roboto"
          />
        </div>
      </div>

      {/* Right — icon buttons + avatar */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        {/* Mobile search icon */}
        <button
          id="mobile-search-btn"
          aria-label="Search"
          className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors sm:hidden"
        >
          <Search size={24} className="text-[#5f6368] dark:text-[#c4c7c5]" />
        </button>

        {/* Dark/light toggle */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleDarkMode}
          aria-label="Toggle colour scheme"
          className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block"
        >
          {isDarkMode
            ? <Sun size={24} className="text-[#e3e3e3]" />
            : <Moon size={24} className="text-[#5f6368]" />}
        </button>

        <button
          id="help-btn"
          aria-label="Help"
          className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block"
        >
          <HelpCircle size={24} className="text-[#5f6368] dark:text-[#c4c7c5]" />
        </button>

        <button
          id="apps-btn"
          aria-label="Apps"
          className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block mr-2"
        >
          <Grid size={24} className="text-[#5f6368] dark:text-[#c4c7c5]" />
        </button>

        {/* Profile avatar */}
        <div className="p-1">
          <div
            id="profile-avatar"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#041e49] flex items-center justify-center font-google-sans font-medium text-sm md:text-lg cursor-pointer ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700 transition-all"
          >
            DD
          </div>
        </div>
      </div>
    </header>
  );
}
