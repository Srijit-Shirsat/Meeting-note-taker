// import NavbarComponent from '../components/Navbar'
// import FooterComponent from '../components/Footer'
// import SignupForm from '../components/Signup'

// function SigninPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <NavbarComponent />
//       <main className="flex-grow flex items-center justify-center py-12 px-4">
//         <SignupForm />
//       </main>
//       <FooterComponent />
//     </div>
//   );
// }

// export default SigninPage

import NavbarComponent from '../components/Navbar';
import FooterComponent from '../components/Footer';
import SignupForm from '../components/Signup';

function SigninPage() {
  return (
    // Changed bg-gray-50 to bg-slate-950 and added relative positioning
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden">
      
      {/* Background Atmosphere - This ensures the "glow" fills the whole screen */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavbarComponent />
        
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          {/* This wrapper ensures the form stays centered but the background stays full */}
          <div className="w-full flex justify-center">
            <SignupForm />
          </div>
        </main>
        
        <FooterComponent />
      </div>
    </div>
  );
}

export default SigninPage