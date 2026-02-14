import NavbarComponent from "../components/Navbar"
import Searchbar from "../components/DashboardComponents/Searchbar"
import Upload from "../components/DashboardComponents/Uploadbutton"
import Meetings from "../components/DashboardComponents/Meetings"
import FooterComponent from "../components/Footer"
import UploadModal from '../components/UploadModal'
import { useEffect, useState } from "react"
import MeetingList from "../components/DashboardComponents/MeetingList"



function Dashboard(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Meetings,setAllMeetings] = useState([])
    const [filteredMeeting , setFilteredMeetings]= useState([])

    useEffect(() => {
        const fetchMeetings = async () => {
            try{
                const response = await fetch('http://localhost:8000/api/meetings/');
                if (!response.ok) throw new Error ("failed to load")
                    const data = await response.json();
                setAllMeetings(data);
                setFilteredMeetings(data);
                }catch(err){
                    console.error("Error fetching meetings:",err);
                }
        }
        fetchMeetings()
    },[])

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()){
            setFilteredMeetings(Meetings);
            return;
        }
        const filtered = Meetings.filter(m => m.title.toLowerCase()===(searchTerm.toLowerCase()))
        setFilteredMeetings(filtered);
    }

    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            <NavbarComponent/>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-4 mb-10 w-full">
                    <div className="flex-grow"> 
                        <Searchbar onSearch={handleSearch}/> 
                    </div>
                    <Upload onUploadClick={() => setIsModalOpen(true)}/>
                </div>

                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight">My Meetings</h1>
                    <MeetingList meetings={filteredMeeting}/>
                </div>
            </main>

            <FooterComponent/>
            <UploadModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default Dashboard