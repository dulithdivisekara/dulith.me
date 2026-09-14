import { useRef, useEffect } from 'react';
import {
  Home, User, Briefcase, Code, Mail,
  Moon, Sun, X,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home',     label: 'Overview',        icon: Home },
  { id: 'about',    label: 'Personal info',   icon: User },
  { id: 'projects', label: 'Projects & work', icon: Briefcase },
  { id: 'skills',   label: 'Skills & tools',  icon: Code },
  { id: 'contact',  label: 'Contact & links', icon: Mail },
];

export interface SidebarProps {
  isOpen: boolean;
  isDarkMode: boolean;
  activeTab: string;
  onClose: () => void;
  onTabChange: (id: string) => void;
  onToggleDarkMode: () => void;
}

/**
 * Sidebar — navigation drawer that is:
 *   • always visible on md+ screens (static, no translate)
 *   • slide-in overlay on mobile with a backdrop
 */
export default function Sidebar({
  isOpen,
  isDarkMode,
  activeTab,
  onClose,
  onTabChange,
  onToggleDarkMode,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);

  // Close when clicking outside on mobile
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
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-black/40 dark:bg-black/60 z-30 md:hidden"
        />
      )}

      {/* Drawer */}
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
        {/* Mobile header row */}
        <div className="p-4 flex items-center md:hidden border-b border-[#e1e3e1] dark:border-[#444746]">
          <span className="text-xl font-google-sans font-medium text-[#5f6368] dark:text-[#e3e3e3] ml-2">
            Portfolio
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="ml-auto p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => { onTabChange(item.id); onClose(); }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-[#c2e7ff] text-[#001d35] dark:bg-[#004a77] dark:text-[#c2e7ff]'
                    : 'text-[#444746] dark:text-[#c4c7c5] hover:bg-[#f0f4f9] dark:hover:bg-[#303134]'
                  }
                `}
              >
                <Icon
                  size={22}
                  className={isActive ? 'text-[#001d35] dark:text-[#c2e7ff]' : 'text-[#444746] dark:text-[#c4c7c5]'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="font-google-sans">{item.label}</span>
              </button>
            );
          })}

          {/* Mobile-only theme toggle */}
          <div className="md:hidden mt-4 pt-4 border-t border-[#e1e3e1] dark:border-[#444746]">
            <button
              id="sidebar-theme-toggle"
              onClick={onToggleDarkMode}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-full text-sm font-medium text-[#444746] dark:text-[#c4c7c5] hover:bg-[#f0f4f9] dark:hover:bg-[#303134] transition-all"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              <span className="font-google-sans">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
