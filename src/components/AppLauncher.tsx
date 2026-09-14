import { useState, useRef, useEffect } from 'react';

interface AppLauncherProps {
    onSearchSelect?: () => void;
}

type AppItem = {
    name: string;
    icon: string;
    color: string;
} & (
    | { isExternal: true; url: string; action?: never }
    | { isExternal: false; action: () => void; url?: never }
);

export default function AppLauncher({ onSearchSelect }: AppLauncherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const apps: AppItem[] = [
        {
            name: 'GitHub',
            icon: 'code',
            color: 'text-[#4285F4]',
            url: 'https://github.com/dulithdivisekara',
            isExternal: true
        },
        {
            name: 'LinkedIn',
            icon: 'work',
            color: 'text-[#0A66C2]',
            url: 'https://linkedin.com/in/dulithdivisekara',
            isExternal: true
        },
        {
            name: 'CV Tool',
            icon: 'terminal',
            color: 'text-[#34A853]',
            url: 'https://github.com/dulithdivisekara/terminal-cv',
            isExternal: true
        },
        {
            name: 'Mail',
            icon: 'mail',
            color: 'text-[#EA4335]',
            url: 'mailto:contact@dulith.me',
            isExternal: true
        },
        {
            name: 'Instagram',
            icon: 'photo_camera',
            color: 'text-[#E4405F]',
            url: 'https://instagram.com/dulithdivisekara',
            isExternal: true
        },
        {
            name: 'Search',
            icon: 'search',
            color: 'text-[#4285F4]',
            action: () => {
                setIsOpen(false);
                const searchInput = document.getElementById('portfolio-search');
                if (searchInput) searchInput.focus();
                if (onSearchSelect) onSearchSelect();
            },
            isExternal: false
        },
    ];

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                title="Google apps"
                aria-label="Google apps"
            >
                <span className="material-symbols-outlined text-[#5f6368] dark:text-[#c4c7c5]">apps</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-14 w-[calc(100vw-32px)] max-w-[320px] bg-[#e9eef6] dark:bg-[#282a2c] rounded-[24px] shadow-lg p-4 z-50 animation-fade-in border border-[#e1e3e1] dark:border-[#444746]">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="text-[#1f1f1f] dark:text-[#e3e3e3] font-google-sans font-medium text-[16px]">Your favorites</h3>
                        <button className="w-8 h-8 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-[#444746] dark:text-[#c4c7c5]">edit</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {apps.map((app) => (
                            app.isExternal ? (
                                <a
                                    key={app.name}
                                    href={app.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white dark:hover:bg-[#303134] transition-colors gap-2 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1e1f20] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                        <span className={`material-symbols-outlined text-[24px] ${app.color}`}>{app.icon}</span>
                                    </div>
                                    <span className="text-[13px] text-[#444746] dark:text-[#c4c7c5] font-roboto tracking-wide">{app.name}</span>
                                </a>
                            ) : (
                                <button
                                    key={app.name}
                                    onClick={app.action}
                                    className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white dark:hover:bg-[#303134] transition-colors gap-2 group w-full"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1e1f20] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                        <span className={`material-symbols-outlined text-[24px] ${app.color}`}>{app.icon}</span>
                                    </div>
                                    <span className="text-[13px] text-[#444746] dark:text-[#c4c7c5] font-roboto tracking-wide">{app.name}</span>
                                </button>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}