import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Komunitas from './pages/Komunitas';
import Header from './components/header';
import Footer from './components/footer';
import Departemen from './pages/Departemen';
import Himalkom from './pages/Himalkom';
import Komnews from './pages/Komnews';
import Riset from './pages/Riset';
import Syntax from './pages/Syntax';
import Megaproker from './pages/Megaproker';

const App = () => {
  return (
    <Router>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/community/:slug" element={<Komunitas />} />
          <Route path="/himalkom" element={<Himalkom />} />
          <Route path="/division/:slug" element={<Departemen />} />
          <Route path="/komnews" element={<Komnews />} />
          <Route path="/riset" element={<Riset />} />
          <Route path="/syntax" element={<Syntax />} />
          <Route path="/megaproker" element={<Megaproker />} />
        </Routes>
      </MainLayout>
      <Footer />
    </Router>
  );
};

export default App;