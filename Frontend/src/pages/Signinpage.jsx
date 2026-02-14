import NavbarComponent from '../components/Navbar'
import FooterComponent from '../components/Footer'
import SignupForm from '../components/Signup'

function SigninPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavbarComponent />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <SignupForm />
      </main>
      <FooterComponent />
    </div>
  );
}

export default SigninPage