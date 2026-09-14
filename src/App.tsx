import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, Search, HelpCircle, Settings, Grid,
  Home, User, Shield, Briefcase, Code, Mail,
  Moon, Sun, ChevronRight, X
} from 'lucide-react';

// Google Fonts import added directly to the component
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@400;500&display=swap');
  
  .font-google-sans { font-family: 'Google Sans', sans-serif; }
  .font-roboto { font-family: 'Roboto', sans-serif; }
  
  /* Custom scrollbar for webkit */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 4px; }
  .dark ::-webkit-scrollbar-thumb { background: #5f6368; }
`;

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef(null);

  // Check system preference on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'about', label: 'Personal info', icon: User },
    { id: 'projects', label: 'Projects & work', icon: Briefcase },
    { id: 'skills', label: 'Skills & tools', icon: Code },
    { id: 'contact', label: 'Contact & links', icon: Mail },
  ];

  return (
      <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-roboto`}>
        <style>{fontStyles}</style>

        {/* App Container */}
        <div className="flex flex-col h-screen bg-[#f8fafd] dark:bg-[#131314] text-[#1f1f1f] dark:text-[#e3e3e3] transition-colors duration-300 overflow-hidden">

          {/* Top App Bar */}
          <header className="h-16 flex items-center justify-between px-2 md:px-6 bg-white dark:bg-[#1e1f20] md:bg-transparent md:dark:bg-transparent shrink-0 z-20 border-b md:border-none border-[#e1e3e1] dark:border-[#444746] transition-colors duration-300">
            <div className="flex items-center">
              <button
                  onClick={() => setIsMobileMenuOpen(true)}
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

            {/* Search Bar - Hidden on small mobile, expands on larger screens */}
            <div className="hidden sm:flex flex-1 max-w-[720px] mx-6">
              <div className="w-full flex items-center bg-[#edf2fc] dark:bg-[#282a2c] rounded-full px-4 py-2.5 focus-within:bg-white dark:focus-within:bg-[#303134] focus-within:shadow-md transition-all border border-transparent focus-within:border-transparent">
                <Search size={20} className="text-[#5f6368] dark:text-[#c4c7c5] mr-3 shrink-0" />
                <input
                    type="text"
                    placeholder="Search my portfolio"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-[16px] text-[#1f1f1f] dark:text-[#e3e3e3] placeholder-[#5f6368] dark:placeholder-[#c4c7c5] font-roboto"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2 shrink-0">
              <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors sm:hidden">
                <Search size={24} className="text-[#5f6368] dark:text-[#c4c7c5]" />
              </button>
              <button onClick={toggleDarkMode} className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block">
                {isDarkMode ? <Sun size={24} className="text-[#e3e3e3]" /> : <Moon size={24} className="text-[#5f6368]" />}
              </button>
              <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block">
                <HelpCircle size={24} className="text-[#5f6368] dark:text-[#c4c7c5]" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors hidden sm:block mr-2">
                <Grid size={24} className="text-[#5f6368] dark:text-[#c4c7c5]" />
              </button>

              {/* Profile Avatar */}
              <div className="p-1">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#041e49] flex items-center justify-center font-google-sans font-medium text-sm md:text-lg cursor-pointer ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700 transition-all">
                  {/* [REPLACE WITH YOUR IMAGE TAG] -> <img src="your-image.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" /> */}
                  DD
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area with Sidebar */}
          <div className="flex flex-1 overflow-hidden relative">

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-30 md:hidden" />
            )}

            {/* Sidebar Drawer */}
            <aside
                ref={sidebarRef}
                className={`
              absolute md:static top-0 left-0 h-full bg-white dark:bg-[#1e1f20] md:bg-transparent md:dark:bg-transparent
              w-[280px] shrink-0 z-40 transform transition-transform duration-300 ease-in-out flex flex-col
              ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
            `}
            >
              <div className="p-4 flex items-center md:hidden border-b border-[#e1e3e1] dark:border-[#444746]">
                <span className="text-xl font-google-sans font-medium text-[#5f6368] dark:text-[#e3e3e3] ml-2">Portfolio</span>
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="ml-auto p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="p-3 space-y-1 overflow-y-auto flex-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                      <button
                          key={item.id}
                          onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                          className={`
                      w-full flex items-center gap-4 px-4 py-3.5 rounded-full text-sm font-medium transition-all duration-200
                      ${isActive
                              ? 'bg-[#c2e7ff] text-[#001d35] dark:bg-[#004a77] dark:text-[#c2e7ff]'
                              : 'text-[#444746] dark:text-[#c4c7c5] hover:bg-[#f0f4f9] dark:hover:bg-[#303134]'
                          }
                    `}
                      >
                        <Icon size={22} className={isActive ? 'text-[#001d35] dark:text-[#c2e7ff]' : 'text-[#444746] dark:text-[#c4c7c5]'} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="font-google-sans">{item.label}</span>
                      </button>
                  );
                })}

                {/* Mobile-only theme toggle */}
                <div className="md:hidden mt-4 pt-4 border-t border-[#e1e3e1] dark:border-[#444746]">
                  <button
                      onClick={toggleDarkMode}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-full text-sm font-medium text-[#444746] dark:text-[#c4c7c5] hover:bg-[#f0f4f9] dark:hover:bg-[#303134] transition-all"
                  >
                    {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
                    <span className="font-google-sans">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
                  </button>
                </div>
              </nav>
            </aside>

            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-auto w-full">
              <div className="max-w-[840px] mx-auto px-4 py-6 md:py-10 pb-24">

                {/* Google Account Welcome Header Style */}
                {activeTab === 'home' && (
                    <div className="flex flex-col items-center text-center mb-10 animation-fade-in">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#041e49] flex items-center justify-center font-google-sans font-medium text-3xl md:text-4xl shadow-sm ring-4 ring-white dark:ring-[#131314]">
                          {/* [REPLACE WITH YOUR IMAGE] -> <img src="your-avatar.png" className="w-full h-full rounded-full object-cover"/> */}
                          DD
                        </div>
                      </div>
                      <h1 className="text-[28px] md:text-[36px] font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-1 tracking-tight">
                        Welcome, Dulith
                      </h1>
                      <p className="text-[14px] text-[#444746] dark:text-[#c4c7c5]">
                        dulithmdivisekara@gmail.com
                      </p>
                    </div>
                )}

                {/* Content Switching based on Tab */}
                <div className="space-y-6">

                  {/* Reusable Google-style Card Component
                  Uses Material 3 styling: 24px border radius, 1px border, surface colors
                */}
                  {activeTab === 'home' && (
                      <>
                        <Card title="Personal info" description="Manage your contact info, location, and professional summary to make it easier for people to reach out." icon={<User className="text-[#0b57d0] dark:text-[#a8c7fa]" size={28}/>}>
                          <ListItem title="Full Name" value="Dulith Divisekara" />
                          <ListItem title="Role" value="Software Engineer / Designer" />
                          <ListItem title="Location" value="Sri Lanka" border={false} />
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card title="Projects & work" description="Review my latest web applications, UI designs, and cloud infrastructure projects." icon={<Briefcase className="text-[#9a4600] dark:text-[#ffb683]" size={28}/>} onClick={() => setActiveTab('projects')}>
                            <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">View portfolio</div>
                          </Card>

                          <Card title="Skills & tools" description="Check out the languages, frameworks, and tools I use on a daily basis." icon={<Code className="text-[#00639b] dark:text-[#7fcfff]" size={28}/>} onClick={() => setActiveTab('skills')}>
                            <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">View tech stack</div>
                          </Card>
                        </div>

                        <Card title="Contact & links" description="Reach out via email, connect on LinkedIn, or review my code on GitHub." icon={<Mail className="text-[#146c2e] dark:text-[#6dd58c]" size={28}/>} onClick={() => setActiveTab('contact')}>
                          <ListItem title="Email" value="dulithmdivisekara@gmail.com" />
                          <ListItem title="LinkedIn" value="linkedin.com/in/dulith" border={false} />
                        </Card>
                      </>
                  )}

                  {activeTab === 'projects' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2">Projects & work</h2>
                        <p className="text-[#444746] dark:text-[#c4c7c5] px-2 mb-6">Here are some of the key projects I've built. Click on any to view more details.</p>

                        <Card title="E-Commerce Dashboard" icon={<Grid className="text-[#0b57d0] dark:text-[#a8c7fa]" size={24}/>}>
                          <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">A full-stack admin dashboard for managing inventory, sales, and analytics with real-time updates.</p>
                          <div className="flex gap-2 pb-2">
                            <Badge text="React" /><Badge text="Node.js" /><Badge text="MongoDB" />
                          </div>
                        </Card>

                        <Card title="Fintech Mobile App" icon={<Grid className="text-[#0b57d0] dark:text-[#a8c7fa]" size={24}/>}>
                          <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">Cross-platform mobile application facilitating peer-to-peer payments and budget tracking.</p>
                          <div className="flex gap-2 pb-2">
                            <Badge text="React Native" /><Badge text="Firebase" />
                          </div>
                        </Card>
                      </div>
                  )}

                  {activeTab === 'skills' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2">Skills & tools</h2>
                        <Card title="Frontend Development" description="Technologies I use to build interactive user interfaces." icon={<Code className="text-[#00639b] dark:text-[#7fcfff]" size={24}/>}>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Badge text="React.js" /><Badge text="Next.js" /><Badge text="Tailwind CSS" /><Badge text="TypeScript" /><Badge text="Figma" />
                          </div>
                        </Card>
                        <Card title="Backend & Cloud" description="Server-side technologies and cloud platforms." icon={<Shield className="text-[#146c2e] dark:text-[#6dd58c]" size={24}/>}>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Badge text="Node.js" /><Badge text="Express" /><Badge text="Python" /><Badge text="Google Cloud" /><Badge text="Cloudflare Pages" />
                          </div>
                        </Card>
                      </div>
                  )}

                  {activeTab === 'contact' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2">Contact info</h2>
                        <Card title="Get in touch" icon={<Mail className="text-[#9a4600] dark:text-[#ffb683]" size={24}/>}>
                          <ListItem title="Email" value="dulithmdivisekara@gmail.com" />
                          <ListItem title="GitHub" value="github.com/dulith" />
                          <ListItem title="Location" value="Sri Lanka" border={false} />
                        </Card>
                      </div>
                  )}

                  {/* Footer Notes (Google Style) */}
                  <div className="text-center text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-12 pt-8">
                    <p>Only you can see your settings. You might also want to review your settings for Maps, Search, or whichever Google services you use most.</p>
                    <div className="flex justify-center gap-6 mt-4">
                      <a href="#" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">Privacy</a>
                      <a href="#" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">Terms</a>
                      <a href="#" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">Help</a>
                    </div>
                  </div>

                </div>
              </div>
            </main>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
        .animation-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      </div>
  );
}

// MD3 Style Reusable Card Component
function Card({ title, description, icon, children, onClick }) {
  return (
      <div
          onClick={onClick}
          className={`
        bg-white dark:bg-[#1e1f20] border border-[#e1e3e1] dark:border-[#444746] rounded-[24px] 
        overflow-hidden transition-all duration-200
        ${onClick ? 'cursor-pointer hover:bg-[#f8fafd] dark:hover:bg-[#303134]' : ''}
      `}
      >
        <div className="p-5 md:p-6 flex items-start gap-4">
          {icon && <div className="shrink-0 bg-[#f0f4f9] dark:bg-[#282a2c] p-3 rounded-full">{icon}</div>}
          <div className="flex-1">
            <h2 className="text-lg md:text-[22px] font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-1">
              {title}
            </h2>
            {description && (
                <p className="text-[14px] leading-relaxed text-[#444746] dark:text-[#c4c7c5] mb-4 pr-4">
                  {description}
                </p>
            )}
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}

// Reusable List Item for Cards
function ListItem({ title, value, border = true }) {
  return (
      <div className={`flex items-center justify-between py-3 ${border ? 'border-b border-[#e1e3e1] dark:border-[#444746]' : ''} hover:bg-black/5 dark:hover:bg-white/5 -mx-5 px-5 md:-mx-6 md:px-6 transition-colors cursor-pointer group`}>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 flex-1">
          <span className="text-[14px] text-[#444746] dark:text-[#c4c7c5] md:w-32">{title}</span>
          <span className="text-[16px] text-[#1f1f1f] dark:text-[#e3e3e3] font-medium">{value}</span>
        </div>
        <ChevronRight size={20} className="text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-[#1f1f1f] dark:group-hover:text-[#e3e3e3] transition-colors" />
      </div>
  );
}

// Small Badge Component for Tags
function Badge({ text }) {
  return (
      <span className="inline-block px-3 py-1 bg-[#f0f4f9] dark:bg-[#303134] border border-[#e1e3e1] dark:border-[#444746] text-[#1f1f1f] dark:text-[#e3e3e3] text-xs font-medium rounded-lg">
      {text}
    </span>
  );
}