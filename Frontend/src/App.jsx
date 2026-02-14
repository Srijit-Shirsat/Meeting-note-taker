import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import SigninPage from './pages/Signinpage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Protect from './components/Protectedroute'
import MeetingDetail from './pages/MeetingDetail';

function App() {
  return (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SigninPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Protect><Dashboard /></Protect>} />
        <Route path="/meeting/:id" element={<MeetingDetail/>} />
      </Routes>
    </Router>
  </>
  );
}

export default App
