import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Himalkom from './pages/Himalkom';
import Komunitas from './pages/Komunitas';
import Komnews from './pages/Komnews';
import Galeri from './pages/Galeri';
import Megaproker from './pages/Megaproker';
import Riset from './pages/Riset';
import Header from './components/header';
import Footer from './components/footer';
import Departemen from './pages/Departemen';

const App = () => {
  return (
    <Router>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/himalkom" element={<Himalkom />} />
          <Route path="/community/:slug" element={<Komunitas />} />
          <Route path="/komnews" element={<Komnews />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/megaproker" element={<Megaproker />} />
          <Route path="/riset" element={<Riset />} />
          <Route path="/division/:slug" element={<Departemen />} />
        </Routes>
      </MainLayout>
      <Footer />
    </Router>
  );
};

export default App;