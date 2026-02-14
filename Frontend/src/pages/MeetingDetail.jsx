import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TranscriptionView from '../components/TranscriptionView'
import ExportButton from '../components/Exportbutton'

function MeetingDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/meetings/${id}`);
        if (!response.ok) throw new Error("Meeting not found");
        const data = await response.json();
        setMeeting(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-bold text-blue-600">Loading meeting details...</div>;
  if (!meeting) return <div className="p-20 text-center text-red-500">Meeting not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline flex items-center gap-2">
        ← Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between item-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">{meeting.title}</h1>
            <p className="text-gray-400 font-medium mb-8">Recorded on {meeting.date}</p>
            <ExportButton meetingId={meeting.id}/>
        </div>
        
        <div className="space-y-10">
          <TranscriptionView text={meeting.transcription} />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail