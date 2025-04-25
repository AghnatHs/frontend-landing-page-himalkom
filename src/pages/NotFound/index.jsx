import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MotionReveal from '@/components/common/MotionReveal';
import { FiSearch, FiCode, FiWifi } from 'react-icons/fi';

const NotFound = () => {
  // Ambil parameter dan path dari url
  const location = useLocation();
  const path = location.pathname;

  // Tentukan jenis konten yang tidak ditemukan berdasarkan path
  let contentType = "Halaman";
  let detailText = "URL tidak valid";
  
  // Analisa path untuk menentukan konteks
  if (path.includes("/galeri/")) {
    contentType = "Galeri";
    detailText = "ID galeri tidak valid";
  } else if (path.includes("/community/")) {
    contentType = "Komunitas";
    detailText = "Slug komunitas tidak valid";
  } else if (path.includes("/komnews/")) {
    contentType = "Berita";
    detailText = "Artikel tidak ditemukan";
  } else if (path.includes("/division/")) {
    contentType = "Departemen";
    detailText = "Departemen tidak ditemukan";
  }

  return (
    <MotionReveal animation="fade-up">
      <div className="py-16 flex items-center justify-center">
        <div className="bg-white rounded-2xl lg:rounded-full shadow-xl w-full max-w-4xl overflow-hidden relative">
          <div className="p-6 md:p-10 flex flex-col items-center text-center relative z-10">
            {/* Computer illustration */}
            <div className="mb-8 relative">
              <div className="w-48 h-40 bg-primary-light rounded-xl overflow-hidden relative mx-auto shadow-md">
                <div className="w-40 h-28 bg-white absolute top-2 left-1/2 -translate-x-1/2 rounded-md shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] flex items-center justify-center">
                  <div className="text-5xl font-extrabold">
                    <span className="text-primary-dark">4</span>
                    <span className="text-red-500 animate-bounce inline-block">0</span>
                    <span className="text-primary-dark">4</span>
                  </div>
                </div>
                <div className="w-48 h-8 bg-primary-dark absolute bottom-0"></div>
                <div className="w-32 h-3 bg-gray-200 absolute bottom-1 left-1/2 -translate-x-1/2 rounded"></div>
              </div>
              <div className="absolute -right-2 bottom-12 bg-yellow-200 w-10 h-10 rounded-full flex items-center justify-center shadow-md border border-yellow-300">
                <div className="text-lg">😕</div>
              </div>
              <div className="absolute -left-4 top-0 bg-pink-200 w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-pink-300 animate-pulse">
                <div className="text-sm">❓</div>
              </div>
            </div>

            <h1 className="text-6xl font-extrabold text-primary-dark mb-3">
              Ups, 404!
            </h1>

            <div className="w-20 h-1 bg-primary-dark mx-auto mb-8 rounded-full"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              {contentType} Tidak Ditemukan
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-3 flex items-center shadow-inner border border-blue-100">
                <FiSearch className="text-primary-dark mr-2" />
                <span className="text-sm text-gray-600">{detailText}</span>
              </div>
              <div className="bg-red-50 rounded-lg p-3 flex items-center shadow-inner border border-red-100">
                <FiCode className="text-primary-dark mr-2" />
                <span className="text-sm text-gray-600">{contentType} hilang</span>
              </div>
              <div className="bg-green-50 rounded-lg p-3 flex items-center shadow-inner border border-green-100">
                <FiWifi className="text-primary-dark mr-2" />
                <span className="text-sm text-gray-600">Cek koneksi</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
              {contentType === "Halaman" ? (
                <>
                  Sepertinya kamu tersesat! Halaman yang kamu cari tidak ada atau mungkin sudah dipindahkan.
                  <span className="block mt-2">Jangan khawatir, kamu bisa kembali ke jalan yang benar~</span>
                </>
              ) : (
                <>
                  {contentType} yang kamu cari tidak ditemukan. Mungkin {contentType.toLowerCase()} telah dihapus atau ID/URL tidak valid.
                  <span className="block mt-2">Silakan kembali ke halaman sebelumnya atau beranda.</span>
                </>
              )}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">

              {/* Tombol kembali ke beranda */}
              <Link
                to="/"
                className={`px-6 py-3 ${contentType !== "Halaman" ? "border-2 border-primary-dark text-primary-dark" : "bg-primary-dark text-white"} rounded-lg font-medium hover:bg-primary hover:text-white transition-colors group shadow-lg`}
              >
                <span>Kembali ke Beranda</span>
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>

              {/* Tombol kembali ke halaman sebelumnya */}
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 border-2 border-primary-dark text-primary-dark rounded-lg font-medium hover:bg-primary-light transition-colors group shadow-lg"
              >
                <span className="mr-2 inline-block transition-transform group-hover:translate-x-1">←</span>
                <span>Kembali</span>
              </button>
            </div>

            <div className="mt-12 flex justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-dark"></div>
              <div className="w-3 h-3 rounded-full bg-primary shadow-inner"></div>
              <div className="w-3 h-3 rounded-full bg-primary-dark"></div>
            </div>
          </div>
        </div>
      </div>
    </MotionReveal>
  );
};

export default NotFound;