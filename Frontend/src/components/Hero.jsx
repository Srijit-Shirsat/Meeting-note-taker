// import {Link} from 'react-router-dom'

// function HeroComponent() {
//     return (
//       <section className="flex flex-col items-center justify-between h-[80vh] py-20 bg-white text-center px-4">
        
//         <h1 className="text-5xl font-serif font-bold text-black max-w-4xl">
//           Never miss a word with your new <br />
//         <span className=" font-sans text-grey-600">AI Meeting Assistant</span>
//         </h1>
  
//         <div className="flex gap-6">
//           <button className="bg-blue-600 text-white hover:text-blue-900 px-8 py-3 rounded-lg font-bold shadow-lg hover:underline transition-all hover:bg-blue-700">
//             Get started
//           </button>
//         <Link to="/signup">
//           <button className="text-black font-bold hover:underline hover:text-blue-900 py-3 px-8">
//             Sign in
//           </button>
//         </Link>
//         </div>

//         <p className="text-lg text-gray-500 max-w-2xl font-medium">
//           The Meeting Note Taker which automatically transcribes your meetings,
//           summarizes the key points and assign tasks in real-time.
//         </p>
  
//       </section>
//     );
//   }
  
//   export default HeroComponent 

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroComponent() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] bg-slate-950 text-white overflow-hidden px-4">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-[20%] w-12 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        <div className="mb-6 px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
          Powered by Advanced Speech AI
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Capture Every Word, <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Refine Every Insight
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Syntheia AI summarises your meetings in real-time, extracts action items delivers key insights and discussion points, and organizes your workflow.
        </p>

        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Start Free Trial
          </button>
          <Link to="/signup">
            <button className="px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all">
              Sign up for free
            </button>
          </Link>
        </div>
      </motion.div>
      
    </section>
  );
}

export default HeroComponent;