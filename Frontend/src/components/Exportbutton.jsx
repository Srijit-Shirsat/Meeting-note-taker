import React from 'react';

const ExportButton = ({ meetingId }) => {
  const handleExport = async (format) => {
    try {
      const response = await fetch(`http://localhost:8000/api/meetings/${meetingId}/export?format=${format}`);
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meeting_export.${format === 'pdf' ? 'pdf' : 'md'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Error exporting meeting: " + err.message);
    }
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => handleExport('pdf')}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition-colors"
      >
        Download PDF
      </button>
      <button 
        onClick={() => handleExport('markdown')}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-black transition-colors"
      >
        Download MD
      </button>
    </div>
  );
};

export default ExportButton