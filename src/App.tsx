import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { User, Briefcase, Code, Mail, Grid, Shield } from 'lucide-react';

import Header  from './components/Header';
import Sidebar from './components/Sidebar';
import Card    from './components/Card';
import ListItem from './components/ListItem';
import Badge   from './components/Badge';

/* ─── Global font injection ──────────────────────────────────────── */
const FONT_STYLES = `
  /* font-google-sans & font-roboto are defined in index.css via @layer utilities */

  /* Custom scrollbar */
  ::-webkit-scrollbar       { width: 8px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 4px; }
  .dark ::-webkit-scrollbar-thumb { background: #5f6368; }

  /* Fade-in animation for tab content */
  .animation-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ─── App ─────────────────────────────────────────────────────────── */
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode,       setIsDarkMode]       = useState(false);
  const [activeTab,        setActiveTab]        = useState('home');
  const [searchQuery,      setSearchQuery]      = useState('');

  /* Honour OS colour-scheme preference on first load */
  useEffect(() => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <HelmetProvider>
      <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-roboto`}>
        <Helmet>
          <title>Dulith Divisekara — Portfolio</title>
          <meta name="description" content="Personal portfolio of Dulith Divisekara — Software Engineer & Designer based in Sri Lanka." />
          <meta name="theme-color" content={isDarkMode ? '#131314' : '#f8fafd'} />
        </Helmet>

        {/* Inject Google Fonts + custom CSS */}
        <style>{FONT_STYLES}</style>

        {/* ── Root shell ─────────────────────────────────────────── */}
        <div className="flex flex-col h-screen bg-[#f8fafd] dark:bg-[#131314] text-[#1f1f1f] dark:text-[#e3e3e3] transition-colors duration-300 overflow-hidden">

          {/* Top App Bar */}
          <Header
            isDarkMode={isDarkMode}
            searchQuery={searchQuery}
            onToggleDarkMode={toggleDarkMode}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onSearchChange={setSearchQuery}
          />

          {/* ── Body: Sidebar + Main ──────────────────────────────── */}
          <div className="flex flex-1 overflow-hidden relative">

            <Sidebar
              isOpen={isMobileMenuOpen}
              isDarkMode={isDarkMode}
              activeTab={activeTab}
              onClose={() => setIsMobileMenuOpen(false)}
              onTabChange={setActiveTab}
              onToggleDarkMode={toggleDarkMode}
            />

            {/* ── Scrollable content ─────────────────────────────── */}
            <main className="flex-1 overflow-y-auto w-full">
              <div className="max-w-[840px] mx-auto px-4 py-6 md:py-10 pb-24">

                {/* ── Home tab ─────────────────────────────────────── */}
                {activeTab === 'home' && (
                  <>
                    {/* Welcome hero */}
                    <div className="flex flex-col items-center text-center mb-10 animation-fade-in">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#041e49] flex items-center justify-center font-google-sans font-medium text-3xl md:text-4xl shadow-sm ring-4 ring-white dark:ring-[#131314]">
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

                    {/* Summary cards */}
                    <div className="space-y-6 animation-fade-in">
                      <Card
                        title="Personal info"
                        description="Manage your contact info, location, and professional summary to make it easier for people to reach out."
                        icon={<User className="text-[#0b57d0] dark:text-[#a8c7fa]" size={28} />}
                      >
                        <ListItem title="Full Name" value="Dulith Divisekara" />
                        <ListItem title="Role"      value="Software Engineer / Designer" />
                        <ListItem title="Location"  value="Sri Lanka" border={false} />
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card
                          title="Projects & work"
                          description="Review my latest web applications, UI designs, and cloud infrastructure projects."
                          icon={<Briefcase className="text-[#9a4600] dark:text-[#ffb683]" size={28} />}
                          onClick={() => setActiveTab('projects')}
                        >
                          <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">
                            View portfolio
                          </div>
                        </Card>

                        <Card
                          title="Skills & tools"
                          description="Check out the languages, frameworks, and tools I use on a daily basis."
                          icon={<Code className="text-[#00639b] dark:text-[#7fcfff]" size={28} />}
                          onClick={() => setActiveTab('skills')}
                        >
                          <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">
                            View tech stack
                          </div>
                        </Card>
                      </div>

                      <Card
                        title="Contact & links"
                        description="Reach out via email, connect on LinkedIn, or review my code on GitHub."
                        icon={<Mail className="text-[#146c2e] dark:text-[#6dd58c]" size={28} />}
                        onClick={() => setActiveTab('contact')}
                      >
                        <ListItem title="Email"    value="dulithmdivisekara@gmail.com" />
                        <ListItem title="LinkedIn" value="linkedin.com/in/dulith" border={false} />
                      </Card>
                    </div>
                  </>
                )}

                {/* ── Projects tab ─────────────────────────────────── */}
                {activeTab === 'projects' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Projects & work</h2>
                    <p className="text-[#444746] dark:text-[#c4c7c5] px-2 mb-6">
                      Here are some of the key projects I've built. Click on any to view more details.
                    </p>

                    <Card
                      title="E-Commerce Dashboard"
                      icon={<Grid className="text-[#0b57d0] dark:text-[#a8c7fa]" size={24} />}
                    >
                      <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">
                        A full-stack admin dashboard for managing inventory, sales, and analytics with real-time updates.
                      </p>
                      <div className="flex gap-2 pb-2">
                        <Badge text="React" /><Badge text="Node.js" /><Badge text="MongoDB" />
                      </div>
                    </Card>

                    <Card
                      title="Fintech Mobile App"
                      icon={<Grid className="text-[#0b57d0] dark:text-[#a8c7fa]" size={24} />}
                    >
                      <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">
                        Cross-platform mobile application facilitating peer-to-peer payments and budget tracking.
                      </p>
                      <div className="flex gap-2 pb-2">
                        <Badge text="React Native" /><Badge text="Firebase" />
                      </div>
                    </Card>
                  </div>
                )}

                {/* ── Skills tab ───────────────────────────────────── */}
                {activeTab === 'skills' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Skills & tools</h2>

                    <Card
                      title="Frontend Development"
                      description="Technologies I use to build interactive user interfaces."
                      icon={<Code className="text-[#00639b] dark:text-[#7fcfff]" size={24} />}
                    >
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge text="React.js" /><Badge text="Next.js" /><Badge text="Tailwind CSS" />
                        <Badge text="TypeScript" /><Badge text="Figma" />
                      </div>
                    </Card>

                    <Card
                      title="Backend & Cloud"
                      description="Server-side technologies and cloud platforms."
                      icon={<Shield className="text-[#146c2e] dark:text-[#6dd58c]" size={24} />}
                    >
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge text="Node.js" /><Badge text="Express" /><Badge text="Python" />
                        <Badge text="Google Cloud" /><Badge text="Cloudflare Pages" />
                      </div>
                    </Card>
                  </div>
                )}

                {/* ── About tab ────────────────────────────────────── */}
                {activeTab === 'about' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Personal info</h2>
                    <Card
                      title="About me"
                      icon={<User className="text-[#0b57d0] dark:text-[#a8c7fa]" size={24} />}
                    >
                      <ListItem title="Full Name" value="Dulith Divisekara" />
                      <ListItem title="Role"      value="Software Engineer / Designer" />
                      <ListItem title="Location"  value="Sri Lanka" border={false} />
                    </Card>
                  </div>
                )}

                {/* ── Contact tab ──────────────────────────────────── */}
                {activeTab === 'contact' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Contact info</h2>
                    <Card
                      title="Get in touch"
                      icon={<Mail className="text-[#9a4600] dark:text-[#ffb683]" size={24} />}
                    >
                      <ListItem title="Email"    value="dulithmdivisekara@gmail.com" />
                      <ListItem title="GitHub"   value="github.com/dulith" />
                      <ListItem title="Location" value="Sri Lanka" border={false} />
                    </Card>
                  </div>
                )}

                {/* ── Footer ───────────────────────────────────────── */}
                <footer className="text-center text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-12 pt-8">
                  <p>Only you can see your settings. You might also want to review your settings for Maps, Search, or whichever Google services you use most.</p>
                  <div className="flex justify-center gap-6 mt-4">
                    <a href="#" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">Privacy</a>
                    <a href="#" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">Terms</a>
                    <a href="#" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">Help</a>
                  </div>
                </footer>

              </div>
            </main>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}