import NavbarComponent from '../components/Navbar'
import FooterComponent from '../components/Footer'
import LoginForm from '../components/Login'

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavbarComponent />
        
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="w-full flex justify-center">
            <LoginForm />
          </div>
        </main>
      </div>
    </div>
  );
}

export default LoginPage;