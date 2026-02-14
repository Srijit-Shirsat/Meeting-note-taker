function TranscriptionView({text}){
    return(
        <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-lg text-blue-600">📝</span>
            Full transcription
        </h2>
        <div className="bg-gray-100 p-6 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap">
            {text ? text: "No transcription available"}
        </div>
        </section>
    );

}

export default TranscriptionView