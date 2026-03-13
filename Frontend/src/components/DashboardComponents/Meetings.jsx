// import { Link } from "react-router-dom";

// function MeetingCard({ meeting, onDeleteSuccess }) {
//   const handleDelete = async (e) => {
//     e.preventDefault();
//     if (window.confirm("Are you sure you want to delete this meeting?")) {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/meetings/${meeting.id}`, { method: 'DELETE' });
//         if (response.ok) {
//           onDeleteSuccess(meeting.id);
//         }
//       } catch (error) {
//         console.error("Delete error:", error);
//       }
//     }
//   }

//   return (
//     <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 shadow-xl">
//       <button onClick={handleDelete} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//         </svg>
//       </button>

//       <div className="mb-4">
//         <span className={`inline-block text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-3 ${
//           meeting.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
//         }`}>
//           {meeting.status}
//         </span>
//         <h3 className="font-bold text-xl text-white mb-1 group-hover:text-indigo-300 transition-colors">{meeting.title}</h3>
//         <p className="text-indigo-200/40 text-xs font-medium">📅 {meeting.date}</p>
//       </div>

//       <p className="text-gray-400 text-sm line-clamp-2 italic mb-6 leading-relaxed">
//         {meeting.transcription ? meeting.transcription : "Processing transcription..."}
//       </p>

//       <Link to={`/meeting/${meeting.id}`}>
//         <button className="w-full py-3 bg-indigo-600/10 text-indigo-300 border border-indigo-500/20 text-sm font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all">
//           Open Details
//         </button>
//       </Link>
//     </div>
//   );
// }
// export default MeetingCard;

import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

function MeetingCard({ meeting, onDeleteSuccess }) {
  const cardRef = useRef(null);

  // Mouse tracking for the "Magnetic" and "Glow" effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/meetings/${meeting.id}`, { method: 'DELETE' });
        if (response.ok) {
          onDeleteSuccess(meeting.id);
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl transition-all duration-300 shadow-xl overflow-hidden"
    >
      {/* Interactive Radial Glow: Follows the mouse cursor inside the card */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle 150px at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent)`
          ),
        }}
      />

      {/* Delete Button */}
      <button 
        onClick={handleDelete} 
        className="absolute top-4 right-4 z-20 p-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4">
          <span className={`inline-block text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-3 ${
            meeting.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
            {meeting.status}
          </span>
          <h3 className="font-bold text-xl text-white mb-1 group-hover:text-indigo-300 transition-colors">{meeting.title}</h3>
          <p className="text-indigo-200/40 text-xs font-medium">📅 {meeting.date}</p>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 italic mb-6 leading-relaxed">
          {meeting.transcription ? meeting.transcription : "Processing transcription..."}
        </p>

        <Link to={`/meeting/${meeting.id}`}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-indigo-600/10 text-indigo-300 border border-indigo-500/20 text-sm font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
          >
            Open Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default MeetingCard;