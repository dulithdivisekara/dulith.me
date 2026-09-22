'use client';

import { useState, useRef, useEffect, useCallback, useMemo, useContext } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { SearchContext } from '@/context/SearchContext';

interface D1Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string; // JSON string
  github_url?: string;
  live_url?: string;
  image_url?: string;
}

function DynamicProjectCard({ project }: { project: D1Project }) {
  const tags: string[] = (() => {
    try { return JSON.parse(project.tags); } catch { return []; }
  })();

  return (
    <Card
      title={project.title}
      description={project.description}
      icon={
        <span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[24px]">
          {project.icon || 'work'}
        </span>
      }
    >
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} text={tag} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-sm"
          >
            GitHub
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>open_in_new</span>
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-sm"
          >
            Live Demo
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>open_in_new</span>
          </a>
        )}
      </div>
    </Card>
  );
}

function DynamicProjectsSkeleton() {
  return (
    <>
      {[1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-[#f0f4f9] dark:bg-[#1e1f20] border border-[#e1e3e1] dark:border-[#444746] rounded-[24px] h-[140px]"
        />
      ))}
    </>
  );
}

const CURL_CMD = 'curl whoami.dulithdivisekara.workers.dev';

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

export default function Projects() {
  const { searchQuery } = useContext(SearchContext);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [d1Projects, setD1Projects] = useState<D1Project[]>([]);
  const [loadingD1, setLoadingD1] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => setD1Projects(Array.isArray(data) ? data : []))
      .catch(() => setD1Projects([]))
      .finally(() => setLoadingD1(false));
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(CURL_CMD).then(() => {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }, []);

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

  const filteredD1 = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return d1Projects;
    return d1Projects.filter((p) =>
      `${p.title} ${p.description} ${p.tags}`.toLowerCase().includes(q)
    );
  }, [searchQuery, d1Projects]);

  return (
    <div className="animation-fade-in space-y-6">
      <h2 className="text-2xl font-google-sans font-medium px-2">Projects &amp; work</h2>

      {filteredTerminal && (
          <Card title="Terminal CV Tool" icon={<span className="material-symbols-outlined text-[#34A853] text-[24px]">terminal</span>}>
            <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">An interactive command-line interface for viewing my resume directly in the terminal.</p>
            <div className="relative group rounded-2xl mb-4 overflow-hidden border border-[#30363d]">
              <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ff5f57]" /><span className="w-3 h-3 rounded-full bg-[#febc2e]" /><span className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
                <span className="text-[11px] text-[#8b949e] font-mono tracking-wide">bash</span>
                <button onClick={handleCopy} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-mono transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3fb950] ${copied ? 'text-[#3fb950] bg-[#3fb950]/10' : 'text-[#8b949e] hover:bg-white/5'}`}>
                  <span className="material-symbols-outlined text-[15px]" key={String(copied)}>{copied ? 'check' : 'content_copy'}</span>
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="bg-[#0d1117] px-5 py-4 overflow-x-auto"><code className="font-mono text-sm leading-relaxed whitespace-nowrap"><span className="text-[#79c0ff]">$ </span><span className="text-[#58a6ff]">{CURL_CMD}</span></code></div>
            </div>
          </Card>
      )}

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
                className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline pt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-sm"
            >
              View GitHub Repository
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>open_in_new</span>
            </a>
          </Card>
      )}

      {/* ── Dynamic D1 Projects ─────────────────────────────────── */}
      {loadingD1 && <DynamicProjectsSkeleton />}
      {!loadingD1 && filteredD1.map((project) => (
        <DynamicProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
