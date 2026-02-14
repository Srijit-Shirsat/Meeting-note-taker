import NavbarComponent from '../components/Navbar';
import HeroComponent from '../components/Hero';
import FooterComponent from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarComponent />
      <main className="flex-grow">
        <HeroComponent />
      </main>
      <FooterComponent />
    </div>
  );
}

export default LandingPage;