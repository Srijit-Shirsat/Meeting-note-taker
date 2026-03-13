import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const keywords = ["Action Items", "Summary", "Transcript", "Key Points", "Decisions", "Syncing..."];

const FloatingTile = ({ delay, duration, position, size }) => {
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ 
        y: [0, -30, 0], 
        opacity: [0.2, 0.5, 0.2],
        rotate: [0, 2, 0] 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        delay: delay, 
        ease: "easeInOut" 
      }}
      className={`absolute z-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col gap-2 overflow-hidden shadow-2xl ${position} ${size}`}>
      <div className="w-1/2 h-1.5 bg-indigo-500/30 rounded-full animate-pulse" />
      <div className="w-full h-1 bg-white/10 rounded-full" />
      <div className="w-3/4 h-1 bg-white/10 rounded-full" />
      
      <div className="mt-auto">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-mono text-indigo-300/80 whitespace-nowrap"
          >
            {keywords[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-indigo-400/20 shadow-[0_0_10px_rgba(129,140,248,0.5)]"
      />
    </motion.div>
  );
};

function HeroComponent() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white overflow-hidden px-4 pt-20">

      <div className="absolute inset-0 pointer-events-none">
        {/* Glow Orbs */}
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />

        <FloatingTile delay={0} duration={6} position="top-[25%] left-[8%]" size="w-24 h-32" />
        <FloatingTile delay={2} duration={8} position="top-[60%] left-[5%]" size="w-28 h-36" />
        <FloatingTile delay={1} duration={7} position="top-[15%] right-[12%]" size="w-24 h-28" />
        <FloatingTile delay={3} duration={9} position="bottom-[25%] right-[10%]" size="w-32 h-40" />
        <FloatingTile delay={0.5} duration={10} position="bottom-[15%] left-[18%]" size="w-20 h-28" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl"
      >
        <div className="mb-8 px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] font-bold tracking-widest uppercase">
          Powered by Advanced Speech AI
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Capture Every Word, <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Refine Every Insight
          </span>
        </h1>

        <p className="text-lg md:text-xl text-indigo-100/60 max-w-2xl mb-12 leading-relaxed">
          Syntheia AI summarises your meetings in real-time, extracts action items, 
          delivers key insights, and organises your workflow.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Start Free Trial
            </button>
          <Link to="/signup">
            <button className="px-10 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all">
              Sign up for free
            </button>
          </Link>
        </div>
      </motion.div>
      
    </section>
  );
}

export default HeroComponent;