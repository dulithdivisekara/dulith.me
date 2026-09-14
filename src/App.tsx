import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header   from './components/Header';
import Sidebar  from './components/Sidebar';
import Card     from './components/Card';
import ListItem from './components/ListItem';
import Badge    from './components/Badge';

import { projectsData, certificationsData, educationData, experienceData } from './data/portfolio';

/* ─── Helper: Material Symbol span ───────────────────────────────────────── */
function Icon({
  name,
  className = '',
  filled = false,
  size = 24,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: filled
          ? `'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' ${size}`
          : `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
      }}
    >
      {name}
    </span>
  );
}

/* ─── Dynamic SEO map ────────────────────────────────────────────────────── */
const SEO_MAP: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Dulith Divisekara — Portfolio',
    description: 'Personal portfolio of Dulith Divisekara — IT Undergraduate & Developer based in Sri Lanka.',
  },
  about: {
    title: 'Personal Info — Dulith Divisekara',
    description: 'Education, communities, certifications, and background of Dulith Divisekara.',
  },
  projects: {
    title: 'Projects & Work — Dulith Divisekara',
    description: 'Academic projects, open-source tools, and personal builds by Dulith Divisekara.',
  },
  skills: {
    title: 'Skills & Tools — Dulith Divisekara',
    description: 'Technology stack, frameworks, languages, and tools used by Dulith Divisekara.',
  },
  contact: {
    title: 'Contact — Dulith Divisekara',
    description: 'Reach out to Dulith Divisekara via email, GitHub, or LinkedIn.',
  },
};

/* ─── localStorage key ───────────────────────────────────────────────────── */
const THEME_KEY = 'dulith-portfolio-theme';

/* ─── Contact link row component ─────────────────────────────────────────── */
function ContactRow({
  icon,
  label,
  display,
  href,
  external = false,
  border = true,
}: {
  icon: string;
  label: string;
  display: string;
  href: string;
  external?: boolean;
  border?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`
        md3-ripple
        flex items-center gap-4 py-3.5
        -mx-5 px-5 md:-mx-6 md:px-6
        ${border ? 'border-b border-[#e1e3e1] dark:border-[#444746]' : ''}
        transition-colors group rounded-none
      `}
    >
      {/* Icon container */}
      <div className="shrink-0 w-10 h-10 rounded-full bg-[#f0f4f9] dark:bg-[#282a2c] flex items-center justify-center">
        <Icon name={icon} className="text-[#444746] dark:text-[#c4c7c5]" size={20} />
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-[#444746] dark:text-[#c4c7c5] leading-tight">{label}</p>
        <p className="text-[15px] text-[#1f1f1f] dark:text-[#e3e3e3] font-medium truncate">{display}</p>
      </div>
      {/* Right chevron */}
      <span className="material-symbols-outlined text-[20px] text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-[#1f1f1f] dark:group-hover:text-[#e3e3e3] transition-colors shrink-0">
        chevron_right
      </span>
    </a>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab,        setActiveTab]        = useState('home');
  const [searchQuery,      setSearchQuery]      = useState('');

  // ── Task 2: Dark mode initialised from localStorage, persisted on change ──
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) return stored === 'dark';
    // Fall back to OS preference
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // ── Dynamic SEO ───────────────────────────────────────────────────────────
  const seo = SEO_MAP[activeTab] ?? SEO_MAP.home;

  return (
    <HelmetProvider>
      <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-roboto`}>

        {/* ── Task 3: Dynamic SEO per active tab ─────────────────────────── */}
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="theme-color" content={isDarkMode ? '#131314' : '#f8fafd'} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
        </Helmet>

        <div className="flex flex-col h-screen bg-[#f8fafd] dark:bg-[#131314] text-[#1f1f1f] dark:text-[#e3e3e3] transition-colors duration-300 overflow-hidden">

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

            {/* ── Scrollable content ──────────────────────────────────────── */}
            <main className="flex-1 overflow-y-auto w-full">
              <div className="max-w-[840px] mx-auto px-4 py-6 md:py-10 pb-24">

                {/* ══ Home tab ══════════════════════════════════════════════ */}
                {activeTab === 'home' && (
                  <>
                    {/* Welcome hero */}
                    <div className="flex flex-col items-center text-center mb-10 animation-fade-in">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-sm ring-4 ring-white dark:ring-[#131314] overflow-hidden">
                          <img src="/profile.jpg" alt="Dulith Divisekara" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <h1 className="text-[28px] md:text-[36px] font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-1 tracking-tight">
                        Welcome, Dulith
                      </h1>
                      <p className="text-[14px] text-[#444746] dark:text-[#c4c7c5]">
                        contact@dulith.me
                      </p>
                    </div>

                    {/* Summary cards */}
                    <div className="space-y-6 animation-fade-in" style={{ animationDelay: '0.05s' }}>
                      <Card
                        title="Personal info"
                        description="Manage your contact info, location, and professional summary."
                        icon={<Icon name="person" className="text-[#0b57d0] dark:text-[#a8c7fa]" size={28} />}
                      >
                        <ListItem title="Full Name" value="Dulith Divisekara" />
                        <ListItem title="Role"      value="IT Undergraduate / Developer" />
                        <ListItem title="Location"  value="Sri Lanka" border={false} />
                      </Card>

                      <Card
                        title="Download your data"
                        description="Export a copy of my professional resume and academic qualifications."
                        icon={<Icon name="download" className="text-[#00639b] dark:text-[#7fcfff]" size={28} />}
                      >
                        <a
                          href="/Dulith_Divisekara_CV.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="md3-ripple block -mx-5 px-5 py-4 border-t border-[#e1e3e1] dark:border-[#444746] transition-colors rounded-none"
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
                          icon={<Icon name="work" className="text-[#9a4600] dark:text-[#ffb683]" size={28} />}
                          onClick={() => setActiveTab('projects')}
                        >
                          <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">
                            View portfolio
                          </div>
                        </Card>
                        <Card
                          title="Skills & tools"
                          description="Check out the frameworks and languages I use."
                          icon={<Icon name="code" className="text-[#146c2e] dark:text-[#6dd58c]" size={28} />}
                          onClick={() => setActiveTab('skills')}
                        >
                          <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">
                            View tech stack
                          </div>
                        </Card>
                      </div>
                    </div>
                  </>
                )}

                {/* ══ Projects tab ══════════════════════════════════════════ */}
                {activeTab === 'projects' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Projects & work</h2>
                    <p className="text-[#444746] dark:text-[#c4c7c5] px-2 mb-6">
                      Academic projects, open-source tools, and personal builds. Click to view on GitHub.
                    </p>

                    {projectsData.map((project) => (
                      <Card
                        key={project.id}
                        title={project.title}
                        icon={<Icon name={project.icon} className="text-[#0b57d0] dark:text-[#a8c7fa]" size={24} />}
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 pb-2">
                          {project.tags.map((tag) => <Badge key={tag} text={tag} />)}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* ══ Skills tab ════════════════════════════════════════════ */}
                {activeTab === 'skills' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Skills & tools</h2>
                    <Card
                      title="Frontend & UI"
                      icon={<Icon name="web" className="text-[#00639b] dark:text-[#7fcfff]" size={24} />}
                    >
                      <div className="flex flex-wrap gap-2 pt-2 pb-2">
                        <Badge text="React.js" /><Badge text="Next.js" /><Badge text="Tailwind CSS" />
                        <Badge text="TypeScript" /><Badge text="Figma" />
                      </div>
                    </Card>
                    <Card
                      title="Backend & Infrastructure"
                      icon={<Icon name="dns" className="text-[#146c2e] dark:text-[#6dd58c]" size={24} />}
                    >
                      <div className="flex flex-wrap gap-2 pt-2 pb-2">
                        <Badge text="Node.js" /><Badge text="Python" />
                        <Badge text="Cloudflare" /><Badge text="Git" />
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
                      icon={<Icon name="school" className="text-[#0b57d0] dark:text-[#a8c7fa]" size={24} />}
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
                      title="Communities & Extracurriculars"
                      icon={<Icon name="groups" className="text-[#9a4600] dark:text-[#ffb683]" size={24} />}
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
                      icon={<Icon name="workspace_premium" className="text-[#146c2e] dark:text-[#6dd58c]" size={24} />}
                    >
                      {certificationsData.map((cert, index) => (
                        <a
                          key={index}
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
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
                {/* Task 4: MD3 "Contact Info" style rows with icon + ripple  */}
                {activeTab === 'contact' && (
                  <div className="animation-fade-in space-y-6">
                    <h2 className="text-2xl font-google-sans font-medium px-2">Contact info</h2>
                    <Card
                      title="Get in touch"
                      icon={<Icon name="contact_mail" className="text-[#9a4600] dark:text-[#ffb683]" size={24} />}
                    >
                      <ContactRow
                        icon="mail"
                        label="Email"
                        display="contact@dulith.me"
                        href="mailto:contact@dulith.me"
                      />
                      <ContactRow
                        icon="code"
                        label="GitHub"
                        display="github.com/dulith"
                        href="https://github.com/dulith"
                        external
                      />
                      <ContactRow
                        icon="work"
                        label="LinkedIn"
                        display="linkedin.com/in/dulith"
                        href="https://linkedin.com/in/dulith"
                        external
                        border={false}
                      />
                    </Card>

                    {/* Primary CTA button */}
                    <a
                      href="mailto:contact@dulith.me"
                      className="md3-ripple flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-[#0b57d0] dark:bg-[#a8c7fa] text-white dark:text-[#041e49] font-google-sans font-medium text-[15px] transition-all duration-200 hover:shadow-lg"
                    >
                      <Icon name="send" className="text-white dark:text-[#041e49]" size={20} />
                      Send me an email
                    </a>
                  </div>
                )}

                {/* ── Footer ────────────────────────────────────────────── */}
                <footer className="text-center text-xs text-[#5f6368] dark:text-[#9aa0a6] mt-12 pt-8 pb-4">
                  <p>© {new Date().getFullYear()} Dulith Divisekara. Built with React & Tailwind CSS.</p>
                  <p className="mt-1">UI inspired by Google Material Design 3.</p>
                  <div className="flex justify-center gap-6 mt-4">
                    <a href="https://github.com/dulith" target="_blank" rel="noopener noreferrer" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">GitHub</a>
                    <a href="https://linkedin.com/in/dulith" target="_blank" rel="noopener noreferrer" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">LinkedIn</a>
                    <a href="mailto:contact@dulith.me" className="hover:bg-black/5 dark:hover:bg-white/10 px-3 py-2 rounded-md transition-colors">Contact</a>
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