import React from 'react';
import MeetingCard from "./Meetings";

const MeetingList = ({ meetings, onDeleteSuccess }) => {
    

    if (!meetings || meetings.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">No meetings found matching your search.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.map((m) => (
                <MeetingCard 
                    key={m.id} 
                    meeting={m} 
                    onDeleteSuccess={onDeleteSuccess} 
                />
            ))}
        </div>
    );
};

export default MeetingList;