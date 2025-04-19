import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Komunitas from './pages/Komunitas';
import Header from './components/header';
import Footer from './components/footer';
import Departemen from './pages/Departemen';
import Himalkom from './pages/Himalkom';
import Komnews from './pages/Komnews';
import News from './pages/Komnews/News';
import Riset from './pages/Riset';
import Syntax from './pages/Syntax';
import Megaproker from './pages/Megaproker';
import Galeri from './pages/Galeri'; 
import GalleryDetail from './pages/Galeri/Detail';
import NotFound from './pages/NotFound'; // Import the NotFound page
import ScrollToTop from './components/common/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          <Route path="/riset" element={<Riset />} />
          <Route path="/syntax" element={<Syntax />} />
          <Route path="/megaproker" element={<Megaproker />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/galeri/:id" element={<GalleryDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
      <Footer />
    </BrowserRouter>
  );
};

export default App;