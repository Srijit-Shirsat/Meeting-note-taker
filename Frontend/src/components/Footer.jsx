
function FooterComponent() {
    return (
      <footer className="flex justify-between items-center px-10 py-8 bg-white border-t border-gray-200 mt-auto">
        
        <p className="text-gray-500 font-medium text-sm">
          © 2026 NoteAgent
        </p>
  
        <ul className="flex gap-8 list-none items-center">
          <li className="text-gray-600 hover:underline cursor-pointer text-sm font-medium transition-all">
            Privacy Policy
          </li>
          <li className="text-gray-600 hover:underline cursor-pointer text-sm font-medium transition-all">
            Terms and conditions
          </li>
          <li className="text-gray-600 hover:underline cursor-pointer text-sm font-medium transition-all">
            Contact Us
          </li>
        </ul>
        
      </footer>
    );
  }
  
  export default FooterComponent;