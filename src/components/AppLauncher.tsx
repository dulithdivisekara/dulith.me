import { useState, useRef, useEffect } from 'react';

export default function AppLauncher() {
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

    const apps = [
        { name: 'GitHub', icon: 'code', color: 'text-[#4285F4]' },
        { name: 'LinkedIn', icon: 'work', color: 'text-[#0A66C2]' },
        { name: 'CV Tool', icon: 'terminal', color: 'text-[#34A853]' },
        { name: 'Mail', icon: 'mail', color: 'text-[#EA4335]' },
        { name: 'Portfolio', icon: 'account_circle', color: 'text-[#FBBC05]' },
        { name: 'Search', icon: 'search', color: 'text-[#4285F4]' },
    ];

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors mr-2"
                title="Google apps"
            >
                <span className="material-symbols-outlined text-[#5f6368] dark:text-[#c4c7c5]">apps</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-14 w-[320px] bg-[#e9eef6] dark:bg-[#282a2c] rounded-[24px] shadow-lg p-4 z-50 animation-fade-in">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <h3 className="text-[#1f1f1f] dark:text-[#e3e3e3] font-google-sans font-medium text-[16px]">Your favorites</h3>
                        <button className="w-8 h-8 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-[#444746] dark:text-[#c4c7c5]">edit</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {apps.map((app) => (
                            <a key={app.name} href="#" className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-white dark:hover:bg-[#303134] transition-colors gap-2">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-[#1e1f20] flex items-center justify-center shadow-sm">
                                    <span className={`material-symbols-outlined text-[24px] ${app.color}`}>{app.icon}</span>
                                </div>
                                <span className="text-[13px] text-[#444746] dark:text-[#c4c7c5] font-roboto tracking-wide">{app.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}