import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
}

/**
 * Card — an MD3-style elevated surface card.
 * Optionally interactive when an `onClick` handler is provided.
 */
export default function Card({ title, description, icon, children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-[#1e1f20]
        border border-[#e1e3e1] dark:border-[#444746]
        rounded-[24px] overflow-hidden
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:bg-[#f8fafd] dark:hover:bg-[#303134]' : ''}
      `}
    >
      <div className="p-5 md:p-6 flex items-start gap-4">
        {icon && (
          <div className="shrink-0 bg-[#f0f4f9] dark:bg-[#282a2c] p-3 rounded-full">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg md:text-[22px] font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] mb-1">
            {title}
          </h2>
          {description && (
            <p className="text-[14px] leading-relaxed text-[#444746] dark:text-[#c4c7c5] mb-4 pr-4">
              {description}
            </p>
          )}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
