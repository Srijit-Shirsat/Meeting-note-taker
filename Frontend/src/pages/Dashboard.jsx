import NavbarComponent from "../components/Navbar"
import Searchbar from "../components/DashboardComponents/Searchbar"
import Upload from "../components/DashboardComponents/Uploadbutton"
import FooterComponent from "../components/Footer"
import UploadModal from '../components/UploadModal'
import { useEffect, useState } from "react"
import MeetingList from "../components/DashboardComponents/MeetingList"

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetings, setAllMeetings] = useState([])
    const [filteredMeeting, setFilteredMeetings] = useState([])

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/meetings/');
                if (!response.ok) throw new Error("failed to load")
                const data = await response.json();
                setAllMeetings(data);
                setFilteredMeetings(data);
            } catch (err) {
                console.error("Error fetching meetings:", err);
            }
        }
        fetchMeetings()
    }, [])

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredMeetings(meetings);
            return;
        }
        const filtered = meetings.filter(m => 
            m.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredMeetings(filtered);
    }

    const handleDeleteSuccess = (id) => {
        const updated = meetings.filter(m => m.id !== id);
        setAllMeetings(updated);
        setFilteredMeetings(updated);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <NavbarComponent />

                {/* ADDED pt-32: This pushes the content down so the fixed navbar doesn't cover it */}
                <main className="flex-grow container mx-auto px-6 pt-32 pb-12">
                    
                    {/* FIXED HEADER LAYOUT: Ensures Search and Upload align perfectly */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div className="w-full md:max-w-md">
                            <h1 className="text-3xl font-bold text-white mb-2">My Workspace</h1>
                            <p className="text-indigo-200/50 text-sm">Manage and review your AI-processed meetings.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
                            <div className="w-full sm:w-64 md:w-80">
                                <Searchbar onSearch={handleSearch} />
                            </div>
                            <Upload onUploadClick={() => setIsModalOpen(true)} />
                        </div>
                    </header>

                    <section>
                        <MeetingList meetings={filteredMeeting} onDeleteSuccess={handleDeleteSuccess} />
                    </section>
                </main>

                <FooterComponent />
            </div>

            <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default Dashboard