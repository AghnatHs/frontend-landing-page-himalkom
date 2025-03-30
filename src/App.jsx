import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Komunitas from './pages/Komunitas';
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
          <Route path="/community/:slug" element={<Komunitas />} />
          <Route path="/division/:slug" element={<Departemen />} />
        </Routes>
      </MainLayout>
      <Footer />
    </Router>
  );
};

export default App;