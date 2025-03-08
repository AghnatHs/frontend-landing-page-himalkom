import React, { useState, useEffect } from 'react';
import TImages from '../utils/images';
import axios from 'axios';

const Komunitas = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://apihimalkomstaging.akucuciin.my.id/admin/communities')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
   <>
     <section className="head font-athiti">
      <div
        id="hero-section"
        className="flex justify-center gap-24 items-center my-57 w-full px-4"
      >
        {/* Logo di kiri */}
        <img
           src={`https://apihimalkomstaging.akucuciin.my.id/storage/${community.logo}`}
            alt={community.name}

          className="w-77"
        />

        {/* Container Elevor di kanan */}
        <div className="flex flex-col text-left">
          <h1 className="font-semibold text-black pb-5 text-[110px] leading-24 sm:text-[90px] md:text-[110px] sm:w-[300px] md:w-[363px]">
            AgriUX
          </h1>
          <img
            src={TImages.DECORATIVE_ELEMENT.GARIS_HERO_ELEVOR}
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
    <section className="profile relative font-athiti max-w-4xl mx-auto my-[29rem] text-[1.5rem] leading-relaxed ">
    <p>
          AgriUX merupakan komunitas yang bertujuan untuk mewadahi minat mahasiswa Ilmu Komputer dalam bidang 
          User Interface danUser Experience pada suatu aplikasi atau web, serta minat dalam bidang desain dengan menggunakan tools desain yang beragam.
      </p>
        <br />
      <p>
          Product Design memiliki 2 cabang, yaitu UI/UX dan Creative Design. 
          UI/UX lebih fokus kepada problem dan penyelesaiannya serta penerapan tampilan aplikasi atau interface dengan cara melakukan wireframing, lalu pada Creative Design fokus pada pembelajar segala macam jenis desain dengan menggunakan aplikasi 
           Adobe Illustrator, Adobe Photoshop, dan lain-lain.
      </p>
      <img
            src={TImages.DECORATIVE_ELEMENT.GARIS_HERO_ELEVOR}
            alt="Garis Elevor"
            className="w-[361px] my-4"
          />

    </section>
   </>
  );
};

export default Komunitas;