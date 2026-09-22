
export default function Footer() {
    return (
        <footer className="w-full bg-[#f8fafd] dark:bg-[#131314] py-4 px-6 mt-12 flex flex-col md:flex-row items-center justify-between text-[12px] text-[#5f6368] dark:text-[#9aa0a6] font-roboto border-t border-[#e1e3e1] dark:border-[#444746]">
            <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-4 md:mb-0 w-full md:w-auto">
                <li><a href="https://about.google" target="_blank" rel="noopener noreferrer" className="hover:text-[#1f1f1f] dark:hover:text-[#e3e3e3] transition-colors">About Google</a></li>
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#1f1f1f] dark:hover:text-[#e3e3e3] transition-colors">Privacy</a></li>
                <li><a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-[#1f1f1f] dark:hover:text-[#e3e3e3] transition-colors">Site terms</a></li>
                <li><a href="https://cloud.google.com/product-terms" target="_blank" rel="noopener noreferrer" className="hover:text-[#1f1f1f] dark:hover:text-[#e3e3e3] transition-colors">Google Cloud terms</a></li>
            </ul>

            <div className="flex items-center gap-2 cursor-pointer hover:text-[#1f1f1f] dark:hover:text-[#e3e3e3] transition-colors bg-transparent px-3 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                <span className="material-symbols-outlined text-[18px]">language</span>
                <span className="font-medium">English</span>
                <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
            </div>
        </footer>
    );
}