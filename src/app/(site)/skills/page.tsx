import type { Metadata } from 'next';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Skills & Tools — Dulith Divisekara',
  description: 'Technology stack, frameworks, languages, and tools.'
};

export default function Skills() {
  return (
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
  );
}
