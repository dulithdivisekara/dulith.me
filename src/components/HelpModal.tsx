import { useRef, useEffect } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * HelpModal — Google-style Help & Support overlay.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal + aria-labelledby for screen readers
 *   - Escape key closes the modal
 *   - Close button receives focus on open (focus management)
 *   - Click-outside closes via mousedown listener
 *
 * Mobile:
 *   - max-h-[90dvh] + overflow-y-auto prevents overflow on 320px phones
 *   - p-4 outer wrapper keeps the card away from screen edges
 */
export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const modalRef   = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      /* Move focus to close button when modal opens */
      closeBtnRef.current?.focus();
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 animation-fade-in"
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
        className={`
          w-full max-w-[480px]
          max-h-[90dvh] overflow-y-auto
          bg-white dark:bg-[#1e1f20]
          rounded-[28px] shadow-2xl
          border border-[#e1e3e1] dark:border-[#444746]
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex justify-between items-center border-b border-[#e1e3e1] dark:border-[#444746] shrink-0">
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              help
            </span>
            <h2
              id="help-modal-title"
              className="text-xl font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3]"
            >
              Help & Support
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close Help & Support"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0]"
          >
            <span className="material-symbols-outlined text-[#5f6368] dark:text-[#c4c7c5]">close</span>
          </button>
        </div>

        {/* Body — scrollable on very small screens */}
        <div className="p-6 space-y-2 flex-1 overflow-y-auto">
          <a
            href="mailto:contact@dulith.me?subject=Portfolio%20Inquiry"
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#edf2fc] dark:hover:bg-[#282a2c] active:bg-[#dde4f0] dark:active:bg-[#303134] transition-colors group"
          >
            <span
              className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] shrink-0"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              mail
            </span>
            <div className="min-w-0">
              <p className="font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] text-sm">
                Send Direct Feedback
              </p>
              <p className="text-xs text-[#444746] dark:text-[#c4c7c5] truncate">
                Reach out to contact@dulith.me
              </p>
            </div>
            <span
              className="material-symbols-outlined text-[18px] text-[#5f6368] dark:text-[#9aa0a6] ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}
            >
              chevron_right
            </span>
          </a>

          <a
            href="https://github.com/dulithdivisekara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#edf2fc] dark:hover:bg-[#282a2c] active:bg-[#dde4f0] dark:active:bg-[#303134] transition-colors group"
          >
            <span
              className="material-symbols-outlined text-[#34A853] shrink-0"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              bug_report
            </span>
            <div className="min-w-0">
              <p className="font-google-sans font-medium text-[#1f1f1f] dark:text-[#e3e3e3] text-sm">
                Report an Issue
              </p>
              <p className="text-xs text-[#444746] dark:text-[#c4c7c5] truncate">
                Submit bug reports or feature ideas on GitHub
              </p>
            </div>
            <span
              className="material-symbols-outlined text-[18px] text-[#5f6368] dark:text-[#9aa0a6] ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}
            >
              chevron_right
            </span>
          </a>
        </div>

        {/* Footer action */}
        <div className="px-6 py-4 bg-[#f8fafd] dark:bg-[#131314] text-right rounded-b-[28px] shrink-0 border-t border-[#e1e3e1] dark:border-[#444746]">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#0b57d0] text-white dark:bg-[#a8c7fa] dark:text-[#041e49] font-google-sans text-sm font-medium hover:shadow-[0_1px_3px_rgba(0,0,0,0.3)] active:shadow-none transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b57d0]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}