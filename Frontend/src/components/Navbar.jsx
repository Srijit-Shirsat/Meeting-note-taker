import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

function NavbarComponent() {
    return (
        <nav className="fixed top-4 left-6 right-6 z-50 flex items-center justify-between px-6 py-3 rounded-2xl bg-slate-950/70 backdrop-blur-xl border border-white/5 shadow-2xl">
            <div className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500">
                    <img src={logo} className="w-8 h-8 rounded-full" alt="Logo" />
                </div>
                <h1 className="font-bold text-xl tracking-tight">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Syntheia AI
                    </span>
                </h1>
            </div>

            <ul className="flex items-center gap-8 text-sm font-medium text-indigo-200/80">
                <Link to="/" className="hover:text-indigo-400 transition-all duration-300">Home</Link>
                <Link to="/about" className="hover:text-indigo-400 transition-all duration-300">About</Link>
                <Link to="/pricing" className="hover:text-indigo-400 transition-all duration-300">Pricing</Link>
                <div className="flex items-center gap-4 ml-4">
                    <Link to="/login" className="text-indigo-200/80 hover:text-white transition-all duration-300">
                        Login
                    </Link>
                    <Link to="/signup" className="px-5 py-2 rounded-full bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300">
                        Get Started
                    </Link>
                </div>
            </ul>
        </nav>
    );
}

export default NavbarComponent;