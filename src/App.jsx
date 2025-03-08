import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Himalkom from './pages/Himalkom';
import BP from './pages/BP';
import BPH from './pages/BPH';
import Academic from './pages/Academic';
import Business from './pages/Business';
import External from './pages/External';
import Internal from './pages/Internal';
import Creative from './pages/Creative';
import Ristek from './pages/Ristek';
import Komunitas from './pages/Komunitas';
import Komnews from './pages/Komnews';
import Galeri from './pages/Galeri';
import Megaproker from './pages/Megaproker';
import Riset from './pages/Riset';
import Header from './components/header';

const App = () => {
  return (
    <Router>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/himalkom" element={<Himalkom />} />
          <Route path="/bp" element={<BP />} />
          <Route path="/bph" element={<BPH />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/business" element={<Business />} />
          <Route path="/external" element={<External />} />
          <Route path="/internal" element={<Internal />} />
          <Route path="/creative" element={<Creative />} />
          <Route path="/ristek" element={<Ristek />} />
          <Route path="/komunitas" element={<Komunitas />} />
          <Route path="/komnews" element={<Komnews />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/megaproker" element={<Megaproker />} />
          <Route path="/riset" element={<Riset />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;