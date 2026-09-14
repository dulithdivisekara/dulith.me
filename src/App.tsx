import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header        from './components/Header';
import Sidebar       from './components/Sidebar';
import Card          from './components/Card';
import ListItem      from './components/ListItem';
import Footer        from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import QuizWidget    from './components/QuizWidget'; // <-- Added import

import { certificationsData, educationData, experienceData, quizData } from './data/portfolio';

/* ─── localStorage key ───────────────────────────────────────────────────── */
const THEME_KEY   = 'dulith-portfolio-theme';
const CURL_CMD    = 'curl whoami.dulithdivisekara.workers.dev';

/* ─── Dynamic SEO map ────────────────────────────────────────────────────── */
const SEO_MAP: Record<string, { title: string; description: string }> = {
  home:      { title: 'Google Account - Dulith Divisekara', description: 'Personal portfolio and developer profile of Dulith Divisekara — IT Undergraduate & Developer.' },
  about:     { title: 'Personal Info — Dulith Divisekara',  description: 'Education, communities, certifications, and background.' },
  projects:  { title: 'Projects & Work — Dulith Divisekara', description: 'Academic projects, open-source tools, and personal builds.' },
  skills:    { title: 'Skills & Tools — Dulith Divisekara', description: 'Technology stack, frameworks, languages, and tools.' },
  resources: { title: 'Resources & Quizzes — Dulith Divisekara', description: 'Interactive quizzes and educational IT resources.' }, // <-- New Tab
  contact:   { title: 'Contact — Dulith Divisekara',        description: 'Reach out to Dulith Divisekara via email, GitHub, or LinkedIn.' },
};

/* ─── MD3 store download button ─────────────────────────────────────────── */
interface StoreButtonProps {
  icon: string;
  label: string;
  href: string;
}

function StoreButton({ icon, label, href }: StoreButtonProps) {
  return (
      <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
        md3-ripple inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full
        border border-[#747775] dark:border-[#8e918f] bg-[#f0f4f9] dark:bg-[#303134] text-[#1f1f1f] dark:text-[#e3e3e3]
        hover:bg-[#e8eef7] dark:hover:bg-[#3c3f42] active:bg-[#dde4f0] dark:active:bg-[#44474a]
        text-sm font-google-sans font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]
      `}
      >
        <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
        {label}
      </a>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const [isLoading,        setIsLoading]        = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab,        setActiveTab]        = useState('home');
  const [searchQuery,      setSearchQuery]      = useState('');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) return stored === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);

  const [copied,    setCopied]    = useState(false);
  const copyTimerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef              = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(CURL_CMD).then(() => {
      if (!isMountedRef.current) return;
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) setCopied(false);
      }, 2000);
    });
  }, []);

  /* Search Filters */
  const filteredTerminal = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return 'terminal cv tool curl cli macos linux'.includes(q);
  }, [searchQuery]);

  const filteredExtension = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return 'sliit courseweb module cleaner browser extension chrome'.includes(q);
  }, [searchQuery]);

  const filteredKnowledgeBase = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return 'sliit knowledge base vault y2s1 notes quizzes'.includes(q);
  }, [searchQuery]);

  const seo = SEO_MAP[activeTab] ?? SEO_MAP.home;

  if (isLoading) return <LoadingScreen />;

  return (
      <HelmetProvider>
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-roboto`}>
          <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="theme-color" content={isDarkMode ? '#131314' : '#f8fafd'} />
          </Helmet>

          <div className="flex flex-col h-screen bg-[#f8fafd] dark:bg-[#131314] text-[#1f1f1f] dark:text-[#e3e3e3] overflow-hidden">
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
                  activeTab={activeTab}
                  onClose={() => setIsMobileMenuOpen(false)}
                  onTabChange={setActiveTab}
                  onToggleDarkMode={toggleDarkMode}
              />

              <main className="flex-1 overflow-y-auto w-full flex flex-col">
                <div className="max-w-[840px] mx-auto px-4 py-6 md:py-10 flex-1 w-full">

                  {/* Active Search Overlay */}
                  {searchQuery && (
                      <div className="mb-6 p-4 rounded-2xl bg-[#edf2fc] dark:bg-[#282a2c] flex justify-between items-center animation-fade-in">
                        <p className="text-sm text-[#444746] dark:text-[#c4c7c5]">
                          Search results for: <span className="font-medium text-[#1f1f1f] dark:text-[#e3e3e3]">"{searchQuery}"</span>
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-xs text-[#0b57d0] dark:text-[#a8c7fa] hover:underline font-medium"
                        >
                          Clear search
                        </button>
                      </div>
                  )}

                  {/* ══ Home tab ══════════════════════════════════════════════ */}
                  {activeTab === 'home' && (
                      <>
                        <div className="flex flex-col items-center text-center mb-10 animation-fade-in">
                          <div className="relative mb-4 p-[3px] google-pro-outline rounded-full">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-white dark:border-[#131314]">
                              <img src="/profile.jpg" alt="Dulith Divisekara" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <h1 className="text-[28px] md:text-[36px] font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-1 tracking-tight">Dulith Divisekara</h1>
                          <p className="text-[14px] text-[#444746] dark:text-[#c4c7c5]">contact@dulith.me</p>
                        </div>

                        <div className="space-y-6 animation-fade-in">
                          <Card title="Personal info" description="Manage your contact info, location, and professional summary." icon={<span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[28px]">person</span>}>
                            <ListItem title="Role" value="IT Undergraduate / Developer" />
                            <ListItem title="Location" value="Sri Lanka" border={false} />
                          </Card>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card title="Projects & work" description="Review my latest web applications and CLI tools." icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[28px]">work</span>} onClick={() => setActiveTab('projects')}>
                              <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">View portfolio</div>
                            </Card>
                            <Card title="Resources" description="Test your IT knowledge and review my study notes." icon={<span className="material-symbols-outlined text-[#673ab7] dark:text-[#d0bcff] text-[28px]">menu_book</span>} onClick={() => setActiveTab('resources')}>
                              <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">Take a quiz</div>
                            </Card>
                          </div>
                        </div>
                      </>
                  )}

                  {/* ══ Projects tab ══════════════════════════════════════════ */}
                  {activeTab === 'projects' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2">Projects & work</h2>

                        {filteredTerminal && (
                            <Card title="Terminal CV Tool" icon={<span className="material-symbols-outlined text-[#34A853] text-[24px]">terminal</span>}>
                              <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">An interactive command-line interface for viewing my resume directly in the terminal.</p>
                              <div className="relative group rounded-2xl mb-4 overflow-hidden border border-[#30363d]">
                                <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ff5f57]" /><span className="w-3 h-3 rounded-full bg-[#febc2e]" /><span className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
                                  <span className="text-[11px] text-[#8b949e] font-mono tracking-wide">bash</span>
                                  <button onClick={handleCopy} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-mono transition-all duration-200 ${copied ? 'text-[#3fb950] bg-[#3fb950]/10' : 'text-[#8b949e] hover:bg-white/5'}`}>
                                    <span className="material-symbols-outlined text-[15px]" key={String(copied)}>{copied ? 'check' : 'content_copy'}</span>
                                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                                  </button>
                                </div>
                                <div className="bg-[#0d1117] px-5 py-4 overflow-x-auto"><code className="font-mono text-sm leading-relaxed whitespace-nowrap"><span className="text-[#79c0ff]">$ </span><span className="text-[#58a6ff]">{CURL_CMD}</span></code></div>
                              </div>
                            </Card>
                        )}
                        {/* SLIIT Extension Card */}
                        {filteredExtension && (
                            <Card
                                title="SLIIT Courseweb Module Cleaner"
                                icon={
                                  <img
                                      src="/extension-logo.png"
                                      alt="Extension Logo"
                                      className="w-6 h-6 rounded shadow-sm object-contain"
                                      onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                                      }}
                                  />
                                }
                            >
                              <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-5">
                                A professional, context-aware browser extension designed to optimise the SLIIT Moodle
                                interface. It automatically filters irrelevant modules and announcements, providing a
                                clutter-free learning environment.
                              </p>

                              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <StoreButton icon="shop"           label="Chrome Web Store" href="#" />
                                <StoreButton icon="extension"      label="Edge Add-ons"     href="#" />
                                <StoreButton icon="travel_explore" label="Firefox Add-ons"  href="#" />
                              </div>

                              <a
                                  href="https://github.com/dulithdivisekara/sliit-courseweb-cleaner"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline pt-1"
                              >
                                View GitHub Repository
                                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>open_in_new</span>
                              </a>
                            </Card>
                        )}
                      </div>
                  )}

                  {/* ══ Resources / Quiz tab ════════════════════════════════════ */}
                  {activeTab === 'resources' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2 mb-2">Educational Resources</h2>

                        {/* The new Google Forms style quiz widget */}
                        <QuizWidget
                            title="IT Fundamentals Knowledge Check"
                            description="Test your understanding of software engineering basics and React principles."
                            questions={quizData}
                        />

                        {filteredKnowledgeBase && (
                            <Card title="SLIIT IT - Knowledge Base" icon={<span className="material-symbols-outlined text-[#FBBC05] text-[24px]">folder_open</span>}>
                              <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">An open-source collection of study notes and active recall quizzes for IT Undergraduates.</p>
                              <a href="https://github.com/dulithdivisekara/SLIIT-Y2S1-vault" target="_blank" rel="noopener noreferrer" className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline">View GitHub Repository <span className="material-symbols-outlined text-[16px]">open_in_new</span></a>
                            </Card>
                        )}
                      </div>
                  )}

                  {/* ══ Skills tab ════════════════════════════════════════════ */}
                  {activeTab === 'skills' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2">Skills & tools</h2>
                        <Card title="Frontend & UI" icon={<span className="material-symbols-outlined text-[#00639b] dark:text-[#7fcfff] text-[24px]">code</span>}>
                          <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pt-1">
                            React.js, Next.js, TypeScript, Tailwind CSS, Figma
                          </p>
                        </Card>
                        <Card title="Backend & Infrastructure" icon={<span className="material-symbols-outlined text-[#146c2e] dark:text-[#6dd58c] text-[24px]">dns</span>}>
                          <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pt-1">
                            Node.js, Python, Cloudflare Workers, Git
                          </p>
                        </Card>
                      </div>
                  )}

                  {/* ══ About tab ═════════════════════════════════════════════ */}
                  {activeTab === 'about' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2">Personal info & History</h2>
                        <Card title="Education" icon={<span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[24px]">school</span>}>
                          {educationData.map((edu, index) => (
                              <div key={index}>
                                <ListItem title="Degree" value={edu.degree} />
                                <ListItem title="Institution" value={edu.institution} />
                                <ListItem title="Status" value={`${edu.status} (${edu.duration})`} border={false} />
                              </div>
                          ))}
                        </Card>
                        <Card title="Communities" icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[24px]">groups</span>}>
                          {experienceData.map((exp, index) => (
                              <ListItem key={index} title={exp.organization} value={exp.role} border={index !== experienceData.length - 1} />
                          ))}
                        </Card>
                        <Card title="Certifications" icon={<span className="material-symbols-outlined text-[#146c2e] dark:text-[#6dd58c] text-[24px]">workspace_premium</span>}>
                          {certificationsData.map((cert, index) => (
                              <a key={index} href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                                <ListItem title={cert.issuer} value={`${cert.title} (${cert.date})`} border={index !== certificationsData.length - 1} />
                              </a>
                          ))}
                        </Card>
                      </div>
                  )}

                  {/* ══ Contact tab ═══════════════════════════════════════════ */}
                  {activeTab === 'contact' && (
                      <div className="animation-fade-in space-y-6">
                        <h2 className="text-2xl font-google-sans font-medium px-2">Contact info</h2>
                        <Card title="Get in touch" icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[24px]">mail</span>}>
                          <a href="mailto:contact@dulith.me" className="block"><ListItem title="Email" value="contact@dulith.me" border={false} /></a>
                        </Card>
                        <Card title="Social profiles" icon={<span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[24px]">public</span>}>
                          <a href="https://linkedin.com/in/dulithdivisekara" target="_blank" rel="noopener noreferrer" className="block">
                            <ListItem title="LinkedIn" value="linkedin.com/in/dulithdivisekara" />
                          </a>
                          <a href="https://github.com/dulithdivisekara" target="_blank" rel="noopener noreferrer" className="block">
                            <ListItem title="GitHub" value="github.com/dulithdivisekara" />
                          </a>
                          <a href="https://youtube.com/@dulithdivisekara" target="_blank" rel="noopener noreferrer" className="block">
                            <ListItem title="YouTube" value="youtube.com/@dulithdivisekara" border={false} />
                          </a>
                        </Card>
                      </div>
                  )}

                </div>
                <Footer />
              </main>
            </div>
          </div>
        </div>
      </HelmetProvider>
  );
}