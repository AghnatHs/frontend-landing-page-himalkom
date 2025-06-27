import React, { useMemo, useState } from "react";
import MotionReveal from "@/components/common/MotionReveal";
import { formatDate } from "@/utils/formatting";
import { Link } from "react-router-dom";
import JawaraFilterBar from "./JawaraFilterBar";
import { useFetchData } from "@/hooks/useAPI";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * @param {Object[]} jawaraIlkomerzs
 */
const JawaraList = ({ jawaraIlkomerzs }) => {
  // State untuk search dan filter komunitas
  const [search, setSearch] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  // Fetch komunitas dari API
  const { data: communityData } = useFetchData("communities", BASE_URL);
  const communities = communityData?.communities || [];

  // Filter data berdasarkan search dan komunitas
  const filtered = useMemo(() => {
    return jawaraIlkomerzs.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.organizer && item.organizer.toLowerCase().includes(search.toLowerCase()));
      const matchCommunity = selectedCommunities.length > 0 ? selectedCommunities.includes(item.community?.slug) : true;
      return matchSearch && matchCommunity;
    });
  }, [jawaraIlkomerzs, search, selectedCommunities]);

  if (!jawaraIlkomerzs?.length) return (
    <div className="text-center text-gray-500 py-10">Belum ada data lomba.</div>
  );

  return (
    <>
      <JawaraFilterBar
        search={search}
        setSearch={setSearch}
        communities={communities}
        selectedCommunities={selectedCommunities}
        setSelectedCommunities={setSelectedCommunities}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">Tidak ada lomba yang cocok.</div>
        ) : filtered.map((item) => (
          <MotionReveal key={item.id} animation="fade-up" delay={0.1}>
            <div className="relative bg-gradient-to-br from-primary-light to-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow flex flex-col h-full border border-primary/30 p-7">
              {/* Gambar lomba */}
              {item.image && (
                <div className="relative w-full h-44 mb-4 overflow-hidden rounded-xl border border-primary/20 bg-white group">
                  <img
                    src={`${BASE_URL}/storage/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <h2 className="text-2xl font-extrabold mb-2 text-primary-darker leading-tight line-clamp-2">
                  {item.name}
                </h2>
                <div className="flex items-center justify-center gap-2 text-base md:text-lg text-primary-dark font-semibold mb-2">
                  <span className="inline-block bg-primary/30 px-2 py-1 rounded-md">
                    {formatDate(item.start_date)}
                  </span>
                  <span className="text-primary-darker">-</span>
                  <span className="inline-block bg-primary/30 px-2 py-1 rounded-md">
                    {formatDate(item.end_date)}
                  </span>
                </div>
                {/* Penyelenggara lomba */}
                {item.organizer && (
                  <div className="text-md text-primary-darker font-medium mb-2 flex items-center gap-1">
                    <span className="inline-block bg-primary/20 px-2 py-1 rounded-md">
                      Diselenggarakan oleh <span className="font-bold">{item.organizer}</span>
                    </span>
                  </div>
                )}
                {/* Tag komunitas di bawah timeline */}
                {item.community?.name && (
                  <Link
                    to={`/community/${item.community.slug}`}
                    className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-primary/40 shadow-sm hover:bg-primary-light hover:text-primary-dark text-primary-darker text-xs font-semibold transition-all duration-200 backdrop-blur"
                    style={{ boxShadow: '0 2px 8px 0 rgba(95, 183, 201, 0.10)' }}
                  >
                    {item.community.logo && (
                      <img
                        src={`${BASE_URL}/storage/${item.community.logo}`}
                        alt={item.community.name}
                        className="w-5 h-5 rounded-full object-cover border border-primary/30 bg-white"
                      />
                    )}
                    <span>{item.community.name}</span>
                  </Link>
                )}
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-primary-dark text-white px-5 py-2 rounded-lg text-base font-bold hover:bg-primary-darker transition shadow-card-hover"
              >
                Lihat Detail
              </a>
            </div>
          </MotionReveal>
        ))}
      </div>
    </>
  );
};

export default JawaraList;
