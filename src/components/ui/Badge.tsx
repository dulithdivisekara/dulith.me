interface BadgeProps {
  text: string;
}

/**
 * Badge — a small MD3-style pill used to display tech-stack labels.
 */
export default function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-block px-3 py-1 bg-[#f0f4f9] dark:bg-[#303134] border border-[#e1e3e1] dark:border-[#444746] text-[#1f1f1f] dark:text-[#e3e3e3] text-xs font-medium rounded-lg">
      {text}
    </span>
  );
}
