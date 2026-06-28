import NavbarComponent from '../components/Navbar'
import SignupForm from '../components/Signup'

function SignupPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-slate-950 flex flex-col">
      <NavbarComponent />
      
      <main className="flex-grow relative">
        <SignupForm />
      </main>
      
    </div>
  );
}

export default SignupPage;