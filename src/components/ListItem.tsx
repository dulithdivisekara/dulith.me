export interface ListItemProps {
  title: string;
  value: string;
  /** Show a bottom divider. Defaults to true. */
  border?: boolean;
}

/**
 * ListItem — a single information row used inside Cards.
 * Uses a state-layer div instead of the md3-ripple pseudo-element so that
 * the negative-margin bleed pattern (-mx-5/6) is not clipped by overflow:hidden.
 */
export default function ListItem({ title, value, border = true }: ListItemProps) {
  return (
    <div
      className={`
        relative
        flex items-center justify-between py-3
        ${border ? 'border-b border-[#e1e3e1] dark:border-[#444746]' : ''}
        -mx-5 px-5 md:-mx-6 md:px-6
        cursor-pointer group
        transition-colors duration-150
      `}
    >
      {/* MD3 state layer — inset-0 inside the row, no overflow:hidden needed */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#1f1f1f] dark:bg-[#e3e3e3] opacity-0 group-hover:opacity-[0.05] group-active:opacity-[0.12] transition-opacity duration-150 pointer-events-none"
      />

      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 flex-1 min-w-0 relative">
        <span className="text-[14px] text-[#444746] dark:text-[#c4c7c5] md:w-32 shrink-0">{title}</span>
        <span className="text-[16px] text-[#1f1f1f] dark:text-[#e3e3e3] font-medium truncate">{value}</span>
      </div>

      <span
        className="material-symbols-outlined text-[20px] text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-[#1f1f1f] dark:group-hover:text-[#e3e3e3] transition-colors shrink-0 ml-2 relative"
        style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}
      >
        chevron_right
      </span>
    </div>
  );
}
