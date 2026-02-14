import logo from "../assets/logo.png"
import {Link} from 'react-router-dom'
function NavbarComponent() {
    return (
        <>
            <nav className="flex bg-blue-200 h-auto w-full justify-between items-center p-4">
                <div className="flex items-center gap-2">
                    <img src={logo} className="w-10 h-10 rounded-full" />
                    <h1 className="font-bold text-lg">Meeting Note Taker</h1>
                </div>
                <ul className="flex gap-4 text-black font-bold">
                   <Link to="/login" className="hover:text-blue-600 font-medium">
                     Login
                   </Link>

                    <li className="text-gray-600 hover:text-white underline-offset cursor-pointer transition-colors duration-200">Home</li>
                    <li className="text-gray-600 hover:text-white underline-offset cursor-pointer transition-colors duration-200">About</li>
                    <li className="text-gray-600 hover:text-white underline-offset cursor-pointer transition-colors duration-200">Contact</li>
                    <li className="text-gray-600 hover:text-white underline-offset cursor-pointer transition-colors duration-200">Pricing</li>
                </ul>
            </nav>
        </>
    )
}

export default NavbarComponent