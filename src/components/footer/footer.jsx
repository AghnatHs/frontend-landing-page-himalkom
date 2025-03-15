import React from 'react';

const Section = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row font-athiti text-xl justify-between px-[45px] py-[60px]">
        <div>
          <p> Jl. Meranti Wing 20 Kampus IPB, <br />
          Babakan, Kec. Dramaga, Kabupaten Bogor, <br /> 
          Jawa Barat 16680
          </p>
        </div>

        <div>
          <p>Email: himalkom@apps.ipb.ac.id <br />
          Phone: +62 851-5539-1409 </p>
        </div>
      </div>

      <div className="border-[1.5px] border-solid h-[1px] w-full"></div>

      <div className="items-center justify-center flex h-[65px]">
        <p className="font-athiti font-bold text-[14px]" >Copyright © Himalkom 2025. All right reserved.</p>
        <div></div>
      </div>
    </>
  )
}

export default Section;