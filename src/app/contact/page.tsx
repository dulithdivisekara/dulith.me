import type { Metadata } from 'next';
import Card from '../../components/Card';
import ListItem from '../../components/ListItem';

export const metadata: Metadata = {
  title: 'Contact — Dulith Divisekara',
  description: 'Reach out to Dulith Divisekara via email, GitHub, or LinkedIn.'
};

export default function Contact() {
  return (
    <div className="animation-fade-in space-y-6">
      <h2 className="text-2xl font-google-sans font-medium px-2">Contact info</h2>
      <Card title="Get in touch" icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[24px]">mail</span>}>
        <a href="mailto:contact@dulith.me" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]">
          <ListItem title="Email" value="contact@dulith.me" border={false} />
        </a>
      </Card>
      <Card title="Social profiles" icon={<span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[24px]">public</span>}>
        <a href="https://linkedin.com/in/dulithdivisekara" target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]">
          <ListItem title="LinkedIn" value="linkedin.com/in/dulithdivisekara" />
        </a>
        <a href="https://github.com/dulithdivisekara" target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]">
          <ListItem title="GitHub" value="github.com/dulithdivisekara" />
        </a>
        <a href="https://youtube.com/@dulithdivisekara" target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]">
          <ListItem title="YouTube" value="youtube.com/@dulithdivisekara" border={false} />
        </a>
      </Card>
    </div>
  );
}
