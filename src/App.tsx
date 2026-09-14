import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header       from './components/Header';
import Sidebar      from './components/Sidebar';
import Card         from './components/Card';
import ListItem     from './components/ListItem';
import Badge        from './components/Badge';
import Footer       from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

import { certificationsData, educationData, experienceData } from './data/portfolio';

/* ─── localStorage key ───────────────────────────────────────────────────── */
const THEME_KEY   = 'dulith-portfolio-theme';
const CURL_CMD    = 'curl whoami.dulithdivisekara.workers.dev';

/* ─── Dynamic SEO map ────────────────────────────────────────────────────── */
const SEO_MAP: Record<string, { title: string; description: string }> = {
  home:     { title: 'Google Account - Dulith Divisekara', description: 'Personal portfolio and developer profile of Dulith Divisekara — IT Undergraduate & Developer.' },
  about:    { title: 'Personal Info — Dulith Divisekara',  description: 'Education, communities, certifications, and background of Dulith Divisekara.' },
  projects: { title: 'Projects & Work — Dulith Divisekara', description: 'Academic projects, open-source tools, and personal builds by Dulith Divisekara.' },
  skills:   { title: 'Skills & Tools — Dulith Divisekara', description: 'Technology stack, frameworks, languages, and tools used by Dulith Divisekara.' },
  contact:  { title: 'Contact — Dulith Divisekara',        description: 'Reach out to Dulith Divisekara via email, GitHub, or LinkedIn.' },
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
        md3-ripple
        inline-flex items-center justify-center gap-2
        w-full sm:w-auto
        px-5 py-2.5
        rounded-full
        border border-[#747775] dark:border-[#8e918f]
        bg-[#f0f4f9] dark:bg-[#303134]
        text-[#1f1f1f] dark:text-[#e3e3e3]
        hover:bg-[#e8eef7] dark:hover:bg-[#3c3f42]
        active:bg-[#dde4f0] dark:active:bg-[#44474a]
        text-sm font-google-sans font-medium
        transition-colors duration-150
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]
      `}
    >
      <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
      {label}
    </a>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const [isLoading,       setIsLoading]       = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab,       setActiveTab]       = useState('home');
  const [searchQuery,     setSearchQuery]     = useState('');

  /* Task 2: localStorage-persisted dark mode */
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) return stored === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  /* Loading screen timer — properly cleaned up */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = useCallback(() => setIsDarkMode(prev => !prev), []);

  /* ── Task 1: Copy state with memory-leak-free cleanup ─────────────────── */
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

  /* ── Dynamic SEO ──────────────────────────────────────────────────────── */
  const seo = SEO_MAP[activeTab] ?? SEO_MAP.home;

  if (isLoading) return <LoadingScreen />;

  return (
    <HelmetProvider>
      <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-roboto`}>
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="theme-color" content={isDarkMode ? '#131314' : '#f8fafd'} />
          <meta property="og:title"       content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <link rel="icon" href="https://www.google.com/favicon.ico" />
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

                {/* ══ Home tab ══════════════════════════════════════════════ */}
                {activeTab === 'home' && (
                  <>
                    <div className="flex flex-col items-center text-center mb-10 animation-fade-in">
                      {/*
                        google-pro-outline wrapper: isolation:isolate + no overflow:hidden
                        The img inside gets overflow:hidden via rounded-full + border.
                        We add a transparent 4px border gap so the glow is visible.
                      */}
                      <div className="relative mb-4 p-[3px] google-pro-outline rounded-full">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-white dark:border-[#131314]">
                          <img
                            src="/profile.jpg"
                            alt="Dulith Divisekara"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <h1 className="text-[28px] md:text-[36px] font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-1 tracking-tight">
                        Dulith Divisekara
                      </h1>
                      <p className="text-[14px] text-[#444746] dark:text-[#c4c7c5]">contact@dulith.me</p>
                    </div>

                    <div className="space-y-6 animation-fade-in">
                      <Card
                        title="Personal info"
                        description="Manage your contact info, location, and professional summary."
                        icon={<span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[28px]">person</span>}
                      >
                        <ListItem title="Role"     value="IT Undergraduate / Developer" />
                        <ListItem title="Location" value="Sri Lanka" border={false} />
                      </Card>

                      <Card
                        title="Download your data"
                        description="Export a copy of my professional resume and academic qualifications."
                        icon={<span className="material-symbols-outlined text-[#00639b] dark:text-[#7fcfff] text-[28px]">download</span>}
                      >
                        <a
                          href="/Dulith_Divisekara_CV.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="md3-ripple block hover:bg-black/5 dark:hover:bg-white/5 transition-colors -mx-5 px-5 py-4 border-t border-[#e1e3e1] dark:border-[#444746] rounded-none"
                        >
                          <span className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium">
                            Download Resume (PDF)
                          </span>
                        </a>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card
                          title="Projects & work"
                          description="Review my latest web applications and CLI tools."
                          icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[28px]">work</span>}
                          onClick={() => setActiveTab('projects')}
                        >
                          <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">View portfolio</div>
                        </Card>
                        <Card
                          title="Skills & tools"
                          description="Check out the frameworks and languages I use."
                          icon={<span className="material-symbols-outlined text-[#146c2e] dark:text-[#6dd58c] text-[28px]">code</span>}
                          onClick={() => setActiveTab('skills')}
                        >
                          <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">View tech stack</div>
                        </Card>
                      </div>
                    </div>
                  </>
                )}

                {/* ══ Projects tab ══════════════════════════════════════════ */}
                {activeTab === 'projects' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Projects & work</h2>

                    {/* ── Task 1: Terminal CV Card ──────────────────────── */}
                    <Card
                      title="Terminal CV Tool"
                      icon={<span className="material-symbols-outlined text-[#34A853] text-[24px]">terminal</span>}
                    >
                      <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">
                        An interactive command-line interface for viewing my resume, skills, and background
                        directly in the terminal. Available for Linux and macOS.
                      </p>

                      {/*
                        Google Cloud Console–style code block.
                        Dark surface always (#0d1117), monospaced blue text, animated copy button.
                        We keep this dark in both themes intentionally — mirrors GCC's dark editor.
                      */}
                      <div className="relative group rounded-2xl mb-4 overflow-hidden border border-[#30363d]">
                        {/* Title bar */}
                        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                          </div>
                          <span className="text-[11px] text-[#8b949e] font-mono tracking-wide select-none">bash</span>
                          {/* Copy button — animated transition from copy_all → check */}
                          <button
                            onClick={handleCopy}
                            aria-label={copied ? 'Copied!' : 'Copy command'}
                            title={copied ? 'Copied!' : 'Copy to clipboard'}
                            className={`
                              flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-mono
                              transition-all duration-200
                              ${copied
                                ? 'text-[#3fb950] bg-[#3fb950]/10'
                                : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-white/5 active:bg-white/10'
                              }
                            `}
                          >
                            <span
                              className="material-symbols-outlined text-[15px] copy-icon-enter"
                              key={String(copied)}    /* re-mount to retrigger animation */
                              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}
                            >
                              {copied ? 'check' : 'content_copy'}
                            </span>
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Code body */}
                        <div className="bg-[#0d1117] px-5 py-4 overflow-x-auto">
                          <code className="font-mono text-sm leading-relaxed whitespace-nowrap">
                            <span className="text-[#79c0ff] select-none">$ </span>
                            <span className="text-[#58a6ff]">{CURL_CMD}</span>
                          </code>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pb-4">
                        <Badge text="Node.js" /><Badge text="CLI" /><Badge text="Cloudflare Workers" />
                      </div>

                      <a
                        href="https://github.com/dulithdivisekara/terminal-cv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline"
                      >
                        View GitHub Repository
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>open_in_new</span>
                      </a>
                    </Card>

                    {/* ── Task 2: SLIIT Extension Card ─────────────────── */}
                    <Card
                      title="SLIIT Courseweb Module Cleaner"
                      icon={
                        <img
                          src="/extension-logo.png"
                          alt="Extension Logo"
                          className="w-6 h-6 rounded shadow-sm object-contain"
                          onError={(e) => {
                            /* Graceful fallback if logo is missing */
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

                      {/*
                        MD3 Tonal Button row.
                        Mobile: flex-col, full-width buttons.
                        sm+:   flex-row, auto-width.
                      */}
                      <div className="flex flex-col sm:flex-row gap-3 mb-5">
                        <StoreButton icon="shop"           label="Chrome Web Store" href="#" />
                        <StoreButton icon="extension"      label="Edge Add-ons"     href="#" />
                        <StoreButton icon="travel_explore" label="Firefox Add-ons"  href="#" />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge text="JavaScript" /><Badge text="Browser API" /><Badge text="CSS" />
                      </div>
                    </Card>
                  </div>
                )}

                {/* ══ Skills tab ════════════════════════════════════════════ */}
                {activeTab === 'skills' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Skills & tools</h2>
                    <Card
                      title="Frontend & UI"
                      icon={<span className="material-symbols-outlined text-[#00639b] dark:text-[#7fcfff] text-[24px]">code</span>}
                    >
                      <div className="flex flex-wrap gap-2 pt-2 pb-2">
                        <Badge text="React.js" /><Badge text="Next.js" /><Badge text="Tailwind CSS" />
                        <Badge text="TypeScript" /><Badge text="Figma" />
                      </div>
                    </Card>
                    <Card
                      title="Backend & Infrastructure"
                      icon={<span className="material-symbols-outlined text-[#146c2e] dark:text-[#6dd58c] text-[24px]">dns</span>}
                    >
                      <div className="flex flex-wrap gap-2 pt-2 pb-2">
                        <Badge text="Node.js" /><Badge text="Python" /><Badge text="Cloudflare" /><Badge text="Git" />
                      </div>
                    </Card>
                  </div>
                )}

                {/* ══ About tab ═════════════════════════════════════════════ */}
                {activeTab === 'about' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Personal info & History</h2>
                    <Card
                      title="Education"
                      icon={<span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[24px]">school</span>}
                    >
                      {educationData.map((edu, index) => (
                        <div key={index}>
                          <ListItem title="Degree"      value={edu.degree} />
                          <ListItem title="Institution" value={edu.institution} />
                          <ListItem title="Status"      value={`${edu.status} (${edu.duration})`} border={false} />
                        </div>
                      ))}
                    </Card>
                    <Card
                      title="Communities"
                      icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[24px]">groups</span>}
                    >
                      {experienceData.map((exp, index) => (
                        <ListItem
                          key={index}
                          title={exp.organization}
                          value={exp.role}
                          border={index !== experienceData.length - 1}
                        />
                      ))}
                    </Card>
                    <Card
                      title="Certifications"
                      icon={<span className="material-symbols-outlined text-[#146c2e] dark:text-[#6dd58c] text-[24px]">workspace_premium</span>}
                    >
                      {certificationsData.map((cert, index) => (
                        <a key={index} href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                          <ListItem
                            title={cert.issuer}
                            value={`${cert.title} (${cert.date})`}
                            border={index !== certificationsData.length - 1}
                          />
                        </a>
                      ))}
                    </Card>
                  </div>
                )}

                {/* ══ Contact tab ═══════════════════════════════════════════ */}
                {activeTab === 'contact' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Contact info</h2>

                    <Card
                      title="Get in touch"
                      icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[24px]">mail</span>}
                    >
                      <a href="mailto:contact@dulith.me" className="block">
                        <ListItem title="Email" value="contact@dulith.me" border={false} />
                      </a>
                    </Card>

                    <Card
                      title="Social profiles"
                      icon={<span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[24px]">public</span>}
                    >
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