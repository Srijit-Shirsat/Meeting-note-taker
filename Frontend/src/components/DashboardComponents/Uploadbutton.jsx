function Upload({ onUploadClick }) {
    return (
        <button 
            onClick={onUploadClick}
            className="w-full md:w-auto flex justify-center items-center bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95 transition-all whitespace-nowrap"
        >
            <span className="mr-2 text-xl">+</span> Upload Meeting
        </button>
    );
}
export default Upload;