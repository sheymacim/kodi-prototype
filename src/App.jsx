import { Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import Home from './pages/Home.jsx';
import Creator from './pages/Creator.jsx';
import Support from './pages/Support.jsx';
import Sponsor from './pages/Sponsor.jsx';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/support" element={<Support />} />
        <Route path="/sponsor" element={<Sponsor />} />
      </Routes>
    </AppShell>
  );
}
