import React, { useState, useEffect } from 'react';
import TImages from '../utils/images';
import axios from 'axios';

const useFetchData = (endpoint, baseUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}/${endpoint}`)
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint, baseUrl]);

  return { data, loading, error };
};

// Template Section
const SectionHeader = ({ title, altText }) => (
  <div className='flex flex-col items-center mb-[74px]'>
    <h1 className="text-3xl font-bold text-center text-[32px] leading-11">{title}</h1>
    <img
      src={TImages.DECORATIVE_ELEMENTS.GARIS_PRESTASI}
      alt={altText}
      className="w-[150px] "
    />
  </div>
);

const Komunitas = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // Fetch data using custom hook
  const { 
    data: communitiesData,
    loading: loadingCommunities,
    error: errorCommunities
  } = useFetchData('communities', baseUrl);

  return (
   <>
    {/* Hero Section */}
    <section className="head font-athiti">
      {loadingCommunities && <p className="text-center">Loading communities...</p>}
      {errorCommunities && <p className="text-red-500 font-bold text-xl text-center">Error: {errorCommunities}</p>}
      <div
        id="hero-section"
        className="flex justify-center gap-24 items-center mt-50 w-full px-4"
      >
        <img
          src={`${baseUrl}/storage/${community.logo}`}
          alt={community.name}
          className="w-70"
        />
        <div className="flex flex-col text-left">
          <h1 className="font-semibold text-black pb-5 text-[110px] leading-24 sm:text-[90px] md:text-[110px] sm:w-[300px] md:w-[363px]">
            {community.name}
          </h1>
          <img
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            alt="Garis Elevor"
            className="w-[361px] mb-4"
          />
          <div className="flex flex-col text-black text-2xl font-normal">
            <span>AgriUX IPB adalah komunitas yang bergerak </span>
            <span>pada bidang UI/UX design.</span>
          </div>
        </div>
      </div>
    </section>

    {/* Desc Section */}
    <section className="profile relative font-athiti max-w-4xl mx-auto my-[20rem] text-[1.5rem] leading-relaxed ">
      {loadingCommunities && <p className="text-center">Loading communities...</p>}
      {errorCommunities && <p className="text-red-500 font-bold text-xl text-center">Error: {errorCommunities}</p>}
      <p>
        AgriUX merupakan komunitas yang bertujuan untuk mewadahi minat mahasiswa Ilmu Komputer dalam bidang 
        User Interface dan User Experience pada suatu aplikasi atau web, serta minat dalam bidang desain dengan menggunakan tools desain yang beragam.
      </p>
      <br />
      <p>
        Product Design memiliki 2 cabang, yaitu UI/UX dan Creative Design. 
        UI/UX lebih fokus kepada problem dan penyelesaiannya serta penerapan tampilan aplikasi atau interface dengan cara melakukan wireframing, lalu pada Creative Design fokus pada pembelajar segala macam jenis desain dengan menggunakan aplikasi 
        Adobe Illustrator, Adobe Photoshop, dan lain-lain.
      </p>
      <img
        src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
        alt="Garis Elevor"
        className="w-[361px] my-4"
      />
    </section>

    {/* Prestasi Section */}
    <section className="px-4 flex flex-col mt-[250px]">
      <SectionHeader title="PRESTASI" altText="Garis Prestasi" />
      {loadingCommunities && <p className="text-center">Loading communities...</p>}
      {errorCommunities && <p className="text-red-500 font-bold text-xl text-center">Error: {errorCommunities}</p>}

      {communitiesData && communitiesData.communities && (
        <div className="flex justify-center items-center ">
          <div className="bg-white shadow-lg rounded-xl  w-[768px] border border-purple-100">
            <ul className="list-disc pl-8 space-y-2 font-athiti text-[22px]">
              {communitiesData.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>

    {/* Dokumentasi Section */}
    <section className="px-4 flex flex-col mt-[200px]">
      <SectionHeader title="DOKUMENTASI" altText="Garis Prestasi" />
    </section>

    {/* Narahubung Section */}
    <section className="px-4 flex flex-col my-[200px]">
      <SectionHeader title="NARAHUBUNG" altText="Garis Prestasi" />
    </section>
   </>
  );
};

export default Komunitas;