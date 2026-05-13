import React from 'react';

interface PremiumPreviewProps {
  title: string;
  category: string;
  tech: string[];
  isCompact?: boolean;
}

export const PremiumPreview: React.FC<PremiumPreviewProps> = ({ title, category, tech, isCompact = false }) => {
  return (
    <div className={`w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col ${isCompact ? 'p-4' : 'p-6 md:p-10'}`}>
      {/* Background Glows */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Sidebar Mockup */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 border-r border-white/5 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center py-6 gap-6 z-20">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20" />
        <div className="flex flex-col gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-6 h-6 rounded-lg bg-white/5 border border-white/5" />
          ))}
        </div>
      </div>

      {/* Header Mockup */}
      <div className={`ml-16 md:ml-20 h-12 md:h-16 border-b border-white/5 bg-white/[0.01] backdrop-blur-sm flex items-center justify-between px-6 z-20`}>
        <div className="flex items-center gap-3">
          <div className="w-24 h-3 bg-white/10 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5" />
          {!isCompact && <div className="w-20 h-3 bg-white/5 rounded-full" />}
        </div>
      </div>

      {/* Main Content Mockup */}
      <div className={`ml-16 md:ml-20 flex-grow p-4 md:p-8 flex flex-col gap-6 z-10 overflow-hidden`}>
        {/* Title Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
             <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                {category}
             </div>
             <div className="w-32 h-2 bg-white/5 rounded-full" />
          </div>
          <div className={`h-6 md:h-10 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent font-black tracking-tighter ${isCompact ? 'text-lg' : 'text-3xl'}`}>
            {title}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Left Large Card */}
          <div className="col-span-8 h-full bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 flex flex-col gap-4 shadow-inner">
            <div className="w-full h-24 md:h-32 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-grid-white/[0.02]" />
               <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-orange-500/40 animate-pulse" />
               </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-3 bg-white/5 rounded-full" />
              <div className="w-5/6 h-3 bg-white/5 rounded-full" />
              <div className="w-4/6 h-3 bg-white/5 rounded-full" />
            </div>
            <div className="flex gap-2 mt-auto">
               {tech.slice(0, 3).map((t) => (
                 <div key={t} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-zinc-500 font-medium">
                   {t}
                 </div>
               ))}
            </div>
          </div>

          {/* Right Smaller Cards */}
          <div className="col-span-4 flex flex-col gap-4 h-full">
            <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
               <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20" />
               <div className="w-full h-2 bg-white/5 rounded-full" />
               <div className="w-2/3 h-2 bg-white/5 rounded-full" />
            </div>
            <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
               <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20" />
               <div className="w-full h-2 bg-white/5 rounded-full" />
               <div className="w-2/3 h-2 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Punchiness */}
      {!isCompact && (
        <>
          <div className="absolute top-[60%] right-[5%] w-32 h-32 bg-orange-500/5 border border-orange-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-[10%] right-[10%] p-4 bg-white/[0.05] border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl z-30 transform rotate-6 translate-y-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-black font-bold">
                   98%
                </div>
                <div className="flex flex-col gap-1">
                   <div className="w-12 h-2 bg-white/20 rounded-full" />
                   <div className="w-8 h-2 bg-white/10 rounded-full" />
                </div>
             </div>
          </div>
        </>
      )}

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
