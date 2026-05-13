import React from 'react';

export const PremiumPreview: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col p-6 md:p-10">
      {/* Background Glows */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Sidebar Mockup - Abstract */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 border-r border-white/5 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center py-8 gap-8 z-20">
        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10" />
        <div className="flex flex-col gap-6 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-6 h-6 rounded-lg bg-white/5 border border-white/5" />
          ))}
        </div>
      </div>

      {/* Header Mockup - Abstract */}
      <div className="ml-16 md:ml-20 h-14 border-b border-white/5 bg-white/[0.01] backdrop-blur-sm flex items-center justify-between px-8 z-20">
        <div className="flex items-center gap-4">
          <div className="w-32 h-2.5 bg-white/10 rounded-full" />
          <div className="w-16 h-2.5 bg-white/5 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-20 h-8 rounded-lg bg-white/5 border border-white/5" />
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
        </div>
      </div>

      {/* Main Content Mockup - Abstract and General */}
      <div className="ml-16 md:ml-20 flex-grow p-8 md:p-12 flex flex-col gap-8 z-10 overflow-hidden">
        {/* Large Hero Area Shape */}
        <div className="w-full h-40 md:h-56 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-inner relative overflow-hidden group/hero">
           <div className="absolute inset-0 bg-grid-white/[0.02]" />
           <div className="flex flex-col gap-4 relative z-10">
              <div className="w-2/3 h-8 bg-gradient-to-r from-white/20 to-transparent rounded-xl" />
              <div className="w-1/2 h-4 bg-white/10 rounded-lg" />
              <div className="w-1/3 h-4 bg-white/5 rounded-lg" />
           </div>
           <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-orange-500/10 blur-xl group-hover/hero:bg-orange-500/20 transition-colors" />
        </div>

        {/* Grid of Cards Shape */}
        <div className="grid grid-cols-3 gap-6 h-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 flex flex-col gap-4 hover:bg-white/[0.04] transition-colors">
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5" />
               <div className="space-y-3">
                  <div className="w-full h-2.5 bg-white/10 rounded-full" />
                  <div className="w-3/4 h-2.5 bg-white/5 rounded-full" />
               </div>
               <div className="mt-auto w-full h-8 rounded-xl bg-white/5 border border-white/5" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Abstract Decorative Elements */}
      <div className="absolute top-[20%] right-[10%] w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[20%] w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Accent Card for "Punchiness" */}
      <div className="absolute bottom-[10%] right-[8%] p-5 bg-zinc-900/80 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl z-30 transform hover:-translate-y-2 transition-transform duration-500">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
               <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            </div>
            <div className="flex flex-col gap-2">
               <div className="w-20 h-2 bg-white/20 rounded-full" />
               <div className="w-12 h-2 bg-white/10 rounded-full" />
            </div>
         </div>
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
