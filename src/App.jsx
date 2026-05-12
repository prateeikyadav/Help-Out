import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/GlobalLayout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RAIDLayout from './pages/tools/RAIDLog/RAIDLayout';
import LegacyToolWrapper from './components/LegacyToolWrapper';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import ResumeBuilder from './pages/tools/student/ResumeBuilder';
import CoverLetterBuilder from './pages/tools/student/CoverLetterBuilder';
import NotesSummarizer from './pages/tools/student/NotesSummarizer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/tools/pm/raid-log" element={<RAIDLayout />} />
          <Route path="/tools/legacy" element={<LegacyToolWrapper />} />
          <Route path="/tools/student/resume-builder" element={<ResumeBuilder />} />
          <Route path="/tools/student/cover-letter" element={<CoverLetterBuilder />} />
          <Route path="/tools/student/notes-summarizer" element={<NotesSummarizer />} />
        </Routes>
      </GlobalLayout>
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
