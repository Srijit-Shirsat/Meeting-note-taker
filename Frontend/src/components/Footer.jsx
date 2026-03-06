
// function FooterComponent() {
//     return (
//       <footer className="flex justify-between items-center px-10 py-8 bg-white border-t border-gray-200 mt-auto">
        
//         <p className="text-gray-500 font-medium text-sm">
//           © 2026 NoteAgent
//         </p>
  
//         <ul className="flex gap-8 list-none items-center">
//           <li className="text-gray-600 hover:underline cursor-pointer text-sm font-medium transition-all">
//             Privacy Policy
//           </li>
//           <li className="text-gray-600 hover:underline cursor-pointer text-sm font-medium transition-all">
//             Terms and conditions
//           </li>
//           <li className="text-gray-600 hover:underline cursor-pointer text-sm font-medium transition-all">
//             Contact Us
//           </li>
//         </ul>
        
//       </footer>
//     );
//   }
  
//   export default FooterComponent;

function FooterComponent() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-10 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <p className="text-indigo-200/50 font-medium text-sm">
          © 2026 Syntheia AI. All rights reserved.
        </p>

        <ul className="flex gap-8 list-none items-center">
          <li>
            <a href="#" className="text-indigo-200/70 hover:text-indigo-400 cursor-pointer text-sm font-medium transition-all duration-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-indigo-200/70 hover:text-indigo-400 cursor-pointer text-sm font-medium transition-all duration-300">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="#" className="text-indigo-200/70 hover:text-indigo-400 cursor-pointer text-sm font-medium transition-all duration-300">
              Contact Us
            </a>
          </li>
        </ul>
        
      </div>
    </footer>
  );
}

export default FooterComponent;