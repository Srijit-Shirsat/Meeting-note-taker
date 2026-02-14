function Upload({ onUploadClick }) {
    return (
        <div className="w-full md:w-auto">
            <button 
            onClick={onUploadClick}
            className="w-full flex justify-center items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md whitespace-nowrap">
                + Upload meeting
            </button>
        </div>
    );
}
export default Upload