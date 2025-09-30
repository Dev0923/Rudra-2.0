import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SiteDetail from './pages/SiteDetail';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Simulator from './pages/Simulator';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/site/:id" element={<SiteDetail />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;