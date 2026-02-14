import React from 'react';
function Searchbar({ onSearch }) {
    return (
        <div className="relative">
            <input 
                type="text" 
                placeholder="Search meetings..." 
                className="w-full border p-3 pl-10 rounded-xl outline-blue-500"
                // This captures every keystroke and sends it to handleSearch
                onChange={(e) => onSearch(e.target.value)} 
            />
            <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
    );
}

export default Searchbar;