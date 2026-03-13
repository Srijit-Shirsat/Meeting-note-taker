import React, { useState } from 'react';

function UploadModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/meetings/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newMeeting = await response.json();
        await fetch(`http://127.0.0.1:8000/api/meetings/${newMeeting.id}/process`, {
          method: 'POST'
      });
      alert("Upload successful! Processing transcription...");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      alert("Error: Is your Backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Overlay with heavy blur to focus on the modal
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-[100] px-4">
      
      {/* Modal Container: Glassmorphism style */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Recording</h2>
        <p className="text-indigo-200/50 text-sm mb-8">Add a new meeting to begin AI transcription.</p>
        
        <form className="space-y-6" onSubmit={handleUpload}>
          <div>
            <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Meeting Title</label>
            <input 
              type="text" 
              placeholder="" 
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 transition-all" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Audio File</label>
            <input 
              type="file" 
              accept="audio/*" 
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-600/20 file:text-indigo-300 hover:file:bg-indigo-600/30 transition-all cursor-pointer" 
              onChange={(e) => setFile(e.target.files[0])} 
              required 
            />
          </div>
          
          <div className="flex gap-4 mt-8">
            <button 
              type="submit"
              disabled={loading}
              className={`flex-1 text-white py-3 rounded-xl font-bold transition-all ${
                loading ? 'bg-indigo-600/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)]'
              }`}
            >
              {loading ? 'Processing...' : 'Start Upload'}
            </button>
            
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;