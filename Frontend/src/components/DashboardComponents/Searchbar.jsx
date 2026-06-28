function Searchbar({ onSearch }) {
    return (
        <div className="relative w-full">
            <input 
                type="text" 
                placeholder="Search meetings..." 
                className="w-full bg-white/5 border border-white/10 p-3 pl-12 rounded-2xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                onChange={(e) => onSearch(e.target.value)} 
            />
            <span className="absolute left-4 top-3.5 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </span>
        </div>
    );
}
export default Searchbar;