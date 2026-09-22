import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import ListItem from '@/components/ui/ListItem';
import { educationData, experienceData, certificationsData } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Personal Info — Dulith Divisekara',
  description: 'Education, communities, certifications, and background.'
};

export default function About() {
  return (
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
            <a key={index} href={cert.link} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]">
              <ListItem title={cert.issuer} value={`${cert.title} (${cert.date})`} border={index !== certificationsData.length - 1} />
            </a>
        ))}
      </Card>
    </div>
  );
}
