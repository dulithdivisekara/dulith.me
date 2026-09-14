export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-white dark:bg-[#131314] z-[100] flex flex-col items-center justify-center">
            <svg className="w-12 h-12" viewBox="0 0 50 50">
                <circle
                    className="google-spinner-path"
                    cx="25" cy="25" r="20"
                    fill="none" strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
            <style>{`
        .google-spinner-path {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          animation: google-colors 1.5s ease-in-out infinite, google-dash 1.5s ease-in-out infinite;
        }
        @keyframes google-colors {
          0%, 100% { stroke: #4285F4; } /* Blue */
          25% { stroke: #EA4335; } /* Red */
          50% { stroke: #FBBC05; } /* Yellow */
          75% { stroke: #34A853; } /* Green */
        }
        @keyframes google-dash {
          0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 150; stroke-dashoffset: -40px; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -120px; }
        }
      `}</style>
        </div>
    );
}