import { Link } from "react-router-dom";

function MeetingCard({ meeting, onDeleteSuccess}) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm("are you sure to delete this meeting?");

    if (confirmed){
      try{
        const response = await fetch(`http://127.0.0.1:8000/api/meetings/${meeting.id}`,{method:'DELETE',});

        if (response.ok){
          onDeleteSuccess(meeting.id);
          alert("meeting deleted successfully.");
        }else{
          alert ("failed to delete");
        }
      }catch (error){
        console.error("delete error:", error);
        alert("error connecting to server")
      }
    }
}
return (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
    <button 
      onClick={handleDelete}
      className="absolute top-3 right-3 p-2 text-gray-300 hover:text-red-500 transition-colors"
      title="Delete Meeting">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>

    <div>
      <div className="flex justify-between items-start mb-3 pr-8">
        <h3 className="font-bold text-lg text-gray-800">{meeting.title}</h3>
        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
          meeting.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {meeting.status}
        </span>
      </div>
      <p className="text-gray-400 text-xs mb-4">📅 {meeting.date}</p>
      <p className="text-gray-600 text-sm line-clamp-2 italic">
        {meeting.transcription ? meeting.transcription : "No transcription yet..."}
      </p>
    </div>

    <Link to={`/meeting/${meeting.id}`}>
      <button className="mt-4 w-full py-2 bg-gray-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-100 transition-colors">
        View Full Details
      </button>
    </Link>
  </div>
);
}

export default MeetingCard