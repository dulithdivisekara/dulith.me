import Card from '../components/Card';
import ListItem from '../components/ListItem';
import Link from 'next/link';

export default function Home() {
  return (
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
          <Link href="/projects" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-[24px]">
            <Card title="Projects & work" description="Review my latest web applications and CLI tools." icon={<span className="material-symbols-outlined text-[#9a4600] dark:text-[#ffb683] text-[28px]">work</span>}>
              <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">View portfolio</div>
            </Card>
          </Link>
          <Link href="/resources" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-[24px]">
            <Card title="Resources" description="Test your IT knowledge and review my study notes." icon={<span className="material-symbols-outlined text-[#673ab7] dark:text-[#d0bcff] text-[28px]">menu_book</span>}>
              <div className="text-sm font-google-sans text-[#0b57d0] dark:text-[#a8c7fa] font-medium pt-2 pb-1">Take a quiz</div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
