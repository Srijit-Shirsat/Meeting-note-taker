import MeetingCard from "./Meetings";

const MeetingList = ({ meetings, onDeleteSuccess }) => {
    if (!meetings || meetings.length === 0) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-3xl border-2 border-dashed border-white/10">
                <p className="text-indigo-200/30 font-medium">No records found. Start by uploading a meeting.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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