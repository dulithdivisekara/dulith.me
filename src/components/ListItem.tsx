export interface ListItemProps {
  title: string;
  value: string;
  /** Show a bottom divider. Defaults to true. */
  border?: boolean;
}

/**
 * ListItem — a single information row used inside Cards.
 * Displays a label + value pair with a MD3 hover/ripple effect and a right-chevron.
 * Lucide ChevronRight replaced with Material Symbols 'chevron_right'.
 */
export default function ListItem({ title, value, border = true }: ListItemProps) {
  return (
    <div
      className={`
        md3-ripple
        flex items-center justify-between py-3
        ${border ? 'border-b border-[#e1e3e1] dark:border-[#444746]' : ''}
        -mx-5 px-5 md:-mx-6 md:px-6
        transition-colors cursor-pointer group
        rounded-none
      `}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 flex-1">
        <span className="text-[14px] text-[#444746] dark:text-[#c4c7c5] md:w-32">{title}</span>
        <span className="text-[16px] text-[#1f1f1f] dark:text-[#e3e3e3] font-medium">{value}</span>
      </div>
      <span className="material-symbols-outlined text-[20px] text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-[#1f1f1f] dark:group-hover:text-[#e3e3e3] transition-colors shrink-0">
        chevron_right
      </span>
    </div>
  );
}
