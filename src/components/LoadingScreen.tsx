export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-[#f8fafd] dark:bg-[#131314] z-[100] flex flex-col items-center justify-center overflow-hidden">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Central Profile Picture */}
                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white dark:ring-[#1e1f20] shadow-md z-10 animate-pulse">
                    <img src="/profile.jpg" alt="Loading Profile" className="w-full h-full object-cover" />
                </div>

                {/* Orbiting & Morphing SVG Shapes */}
                <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 200 200">
                    {/* Blue Orbiting Shape - Morphing Circle */}
                    <g className="animate-orbit-1">
                        <rect x="85" y="15" width="30" height="30" rx="15" fill="#4285F4" className="animate-morph-shape-1" />
                    </g>
                    {/* Green Orbiting Shape - Morphing Square */}
                    <g className="animate-orbit-2">
                        <rect x="155" y="85" width="30" height="30" rx="4" fill="#34A853" className="animate-morph-shape-2" />
                    </g>
                    {/* Yellow Orbiting Shape - Morphing Pill */}
                    <g className="animate-orbit-3">
                        <rect x="85" y="155" width="30" height="18" rx="9" fill="#FBBC05" className="animate-morph-shape-3" />
                    </g>
                    {/* Red Orbiting Shape - Morphing Diamond */}
                    <g className="animate-orbit-4">
                        <rect x="15" y="85" width="28" height="28" rx="6" fill="#EA4335" className="animate-morph-shape-4" />
                    </g>
                </svg>
            </div>

            <p className="mt-6 text-sm font-google-sans font-medium text-[#5f6368] dark:text-[#c4c7c5] tracking-wider animate-fade-pulse">
                Google Account
            </p>

            <style>{`
        @keyframes orbitSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: orbitSpin 6s linear infinite;
        }
        
        @keyframes morph1 {
          0%, 100% { rx: 15; transform: scale(1); }
          50% { rx: 4; transform: scale(1.15) rotate(45deg); }
        }
        @keyframes morph2 {
          0%, 100% { rx: 4; transform: scale(1); }
          50% { rx: 15; transform: scale(0.85); }
        }
        @keyframes morph3 {
          0%, 100% { rx: 9; transform: scale(1); }
          50% { rx: 2; transform: scale(1.2) rotate(-30deg); }
        }
        @keyframes morph4 {
          0%, 100% { rx: 6; transform: scale(1) rotate(45deg); }
          50% { rx: 14; transform: scale(0.9) rotate(0deg); }
        }

        .animate-morph-shape-1 { animation: morph1 2.5s ease-in-out infinite; transform-origin: center; }
        .animate-morph-shape-2 { animation: morph2 2.5s ease-in-out infinite 0.3s; transform-origin: center; }
        .animate-morph-shape-3 { animation: morph3 2.5s ease-in-out infinite 0.6s; transform-origin: center; }
        .animate-morph-shape-4 { animation: morph4 2.5s ease-in-out infinite 0.9s; transform-origin: center; }

        @keyframes fadePulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-fade-pulse { animation: fadePulse 1.8s ease-in-out infinite; }
      `}</style>
        </div>
    );
}