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
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">Upload Meeting Recording</h2>
                
                <form className="space-y-4" onSubmit={handleUpload}>
                    <input type="text" placeholder="Meeting Title" className="w-full border p-3 rounded-xl outline-blue-500" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="file" accept="audio/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={(e) => setFile(e.target.files[0])} required />
                    
                    <div className="flex gap-3 mt-6">
                        <button type="submit"
                        disabled={loading}
                        className={`flex-1 text-white py-3 rounded-xl font-bold transition-colors ${
                          loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                        }`}>
                            {loading ? 'Uploading...' : 'Start Upload'}
                        </button>
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-100 py-3 rounded-xl">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
  );
}

export default UploadModal