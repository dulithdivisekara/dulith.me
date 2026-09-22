'use client';

import { useState, useEffect, useMemo, useContext } from 'react';
import Card from '@/components/ui/Card';
import QuizWidget from '@/components/features/QuizWidget';
import CertificateCard from '@/components/ui/CertificateCard';
import { quizData } from '@/data/portfolio';
import { SearchContext } from '@/context/SearchContext';

interface D1Certificate {
  id: string;
  title: string;
  issuer: string;
  description?: string;
  date: string;
  certificate_id?: string;
  verification_url?: string;
  image_url?: string;
}

function CertificatesSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-[#f0f4f9] dark:bg-[#1e1f20] border border-[#e1e3e1] dark:border-[#444746] rounded-[24px] h-[140px]"
        />
      ))}
    </>
  );
}

export default function Resources() {
  const { searchQuery } = useContext(SearchContext);
  const [certificates, setCertificates] = useState<D1Certificate[]>([]);
  const [loadingCerts, setLoadingCerts] = useState(true);

  useEffect(() => {
    fetch('/api/certificates')
      .then((r) => r.json())
      .then((data) => setCertificates(Array.isArray(data) ? data : []))
      .catch(() => setCertificates([]))
      .finally(() => setLoadingCerts(false));
  }, []);

  const filteredKnowledgeBase = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return 'sliit knowledge base vault y2s1 notes quizzes'.includes(q);
  }, [searchQuery]);

  const filteredCertificates = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return certificates;
    return certificates.filter((c) =>
      `${c.title} ${c.issuer} ${c.description ?? ''}`.toLowerCase().includes(q)
    );
  }, [searchQuery, certificates]);

  return (
    <div className="animation-fade-in space-y-6">
      <h2 className="text-2xl font-google-sans font-medium px-2 mb-2">Educational Resources</h2>

      <QuizWidget
          title="IT Fundamentals Knowledge Check"
          description="Test your understanding of software engineering basics and React principles."
          questions={quizData}
      />

      {filteredKnowledgeBase && (
          <Card title="SLIIT IT - Knowledge Base" icon={<span className="material-symbols-outlined text-[#FBBC05] text-[24px]">folder_open</span>}>
            <p className="text-sm text-[#444746] dark:text-[#c4c7c5] pb-4">An open-source collection of study notes and active recall quizzes for IT Undergraduates.</p>
            <a href="https://github.com/dulithdivisekara/SLIIT-Y2S1-vault" target="_blank" rel="noopener noreferrer" className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium inline-flex items-center gap-1 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-sm">
              View GitHub Repository <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </Card>
      )}

      {/* ── Dynamic D1 Certificates ──────────────────────────────── */}
      {(loadingCerts || filteredCertificates.length > 0) && (
        <h3 className="text-xl font-google-sans font-medium px-2 pt-2">Certifications</h3>
      )}
      {loadingCerts && <CertificatesSkeleton />}
      {!loadingCerts && filteredCertificates.map((cert) => (
        <CertificateCard
          key={cert.id}
          title={cert.title}
          issuer={cert.issuer}
          date={cert.date}
          description={cert.description}
          verificationUrl={cert.verification_url}
          imageUrl={cert.image_url}
        />
      ))}
    </div>
  );
}
