import { Link } from "react-router-dom";

function MeetingCard({ meeting, onDeleteSuccess }) {
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
    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 shadow-xl">
      <button onClick={handleDelete} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

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
        <button className="w-full py-3 bg-indigo-600/10 text-indigo-300 border border-indigo-500/20 text-sm font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all">
          Open Details
        </button>
      </Link>
    </div>
  );
}
export default MeetingCard;