'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home',      label: 'Overview',        icon: 'home',      href: '/' },
  { id: 'about',     label: 'Personal info',   icon: 'person',    href: '/about' },
  { id: 'projects',  label: 'Projects & work', icon: 'work',      href: '/projects' },
  { id: 'resources', label: 'Resources',       icon: 'menu_book', href: '/resources' },
  { id: 'skills',    label: 'Skills & tools',  icon: 'code',      href: '/skills' },
  { id: 'contact',   label: 'Contact & links', icon: 'mail',      href: '/contact' },
];

export interface SidebarProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onClose: () => void;
  onToggleDarkMode: () => void;
}

export default function Sidebar({
  isOpen,
  isDarkMode,
  onClose,
  onToggleDarkMode,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 z-30 md:hidden"
        />
      )}
      <aside
        ref={sidebarRef}
        id="nav-sidebar"
        aria-label="Site navigation"
        className={`
          absolute md:static top-0 left-0 h-full
          bg-white dark:bg-[#1e1f20] md:bg-transparent md:dark:bg-transparent
          w-[280px] shrink-0 z-40
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4 flex items-center md:hidden border-b border-[#e1e3e1] dark:border-[#444746]">
          <span className="text-xl font-google-sans font-medium text-[#5f6368] dark:text-[#e3e3e3] ml-2">
            Portfolio
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="ml-auto p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
          >
            <span className="material-symbols-outlined text-[#444746] dark:text-[#c4c7c5]">close</span>
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-full
                  text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]
                  ${isActive
                    ? 'bg-[#c2e7ff] text-[#001d35] dark:bg-[#004a77] dark:text-[#c2e7ff]'
                    : 'text-[#444746] dark:text-[#c4c7c5] hover:bg-[#f0f4f9] dark:hover:bg-[#303134]'
                  }
                `}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    isActive
                      ? 'text-[#001d35] dark:text-[#c2e7ff] filled'
                      : 'text-[#444746] dark:text-[#c4c7c5]'
                  }`}
                  style={{
                    fontVariationSettings: isActive
                      ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                      : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {item.icon}
                </span>
                <span className="font-google-sans">{item.label}</span>
              </Link>
            );
          })}

          <div className="md:hidden mt-4 pt-4 border-t border-[#e1e3e1] dark:border-[#444746]">
            <button
              id="sidebar-theme-toggle"
              onClick={onToggleDarkMode}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-full text-sm font-medium text-[#444746] dark:text-[#c4c7c5] hover:bg-[#f0f4f9] dark:hover:bg-[#303134] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
              <span className="font-google-sans">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
