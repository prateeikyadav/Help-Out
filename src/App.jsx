import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RAIDLayout from './pages/tools/RAIDLog/RAIDLayout';
import LegacyToolWrapper from './components/LegacyToolWrapper';

function App() {
  return (
    <Router>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/tools/pm/raid-log" element={<RAIDLayout />} />
          <Route path="/tools/legacy" element={<LegacyToolWrapper />} />
        </Routes>
      </GlobalLayout>
    </Router>
  );
}

export default App;
