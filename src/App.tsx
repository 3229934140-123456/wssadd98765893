import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OverviewPage from '@/pages/OverviewPage';
import RankingPage from '@/pages/RankingPage';
import AbnormalPage from '@/pages/AbnormalPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/abnormal" element={<AbnormalPage />} />
      </Routes>
    </Router>
  );
}
