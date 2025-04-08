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
import News from './pages/Komnews/News';

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
          <Route path="/komnews/:slug" element={<News />} />
        </Routes>
      </MainLayout>
      <Footer />
    </Router>
  );
};

export default App;