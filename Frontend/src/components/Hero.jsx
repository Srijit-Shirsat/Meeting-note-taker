import {Link} from 'react-router-dom'

function HeroComponent() {
    return (
      <section className="flex flex-col items-center justify-between h-[80vh] py-20 bg-white text-center px-4">
        
        <h1 className="text-5xl font-serif font-bold text-black max-w-4xl">
          Never miss a word with your new <br />
        <span className=" font-sans text-grey-600">AI Meeting Assistant</span>
        </h1>
  
        <div className="flex gap-6">
          <button className="bg-blue-600 text-white hover:text-blue-900 px-8 py-3 rounded-lg font-bold shadow-lg hover:underline transition-all hover:bg-blue-700">
            Get started
          </button>
        <Link to="/signup">
          <button className="text-black font-bold hover:underline hover:text-blue-900 py-3 px-8">
            Sign in
          </button>
        </Link>
        </div>

        <p className="text-lg text-gray-500 max-w-2xl font-medium">
          The Meeting Note Taker which automatically transcribes your meetings,
          summarizes the key points and assign tasks in real-time.
        </p>
  
      </section>
    );
  }
  
  export default HeroComponent 