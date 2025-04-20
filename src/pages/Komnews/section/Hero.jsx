import React from "react";
import TImages from "@/utils/images";

const HeroSection = () => {    
    return(
        <>

                <div className="flex flex-col gap-2 justify-center max-w-96 mx-auto">
                    <h2 className="font-semibold text-5xl md:text-7xl text-center">KOMNEWS</h2>
                    <img 
                        src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR} 
                        alt="garis headline" 
                        className="w-40 sm:w-40 md:w-48 lg:w-xl mx-auto" 
                    />
                    <p className="text-center">KOMNEWS Merupakan tempat untuk membaca berita seputar ilmu komputer.</p>
                </div>

        </>
    )
}

export default HeroSection;