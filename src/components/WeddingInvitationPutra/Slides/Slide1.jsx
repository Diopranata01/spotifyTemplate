import React from "react";

export default function Slide1() {
  return (
    <>
      <div
        className={`flex-col items-center justify-between relative overflow-hidden right-container-photo-config-cover duration-1000 ease-in scroll-item-cover opacity-100 h-full flex p-8 bg-cover bg-no-repeat bg-[60%_center] lg:bg-[70%_center] xl:bg-[90%_center]`}
        style={{
          backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/new-auth-3d448.appspot.com/o/img_putra%2Fputra_2.webp?alt=media&token=99d0a4e5-3649-480d-a388-0662c4966105")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: coverHeight,
        }}
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[0] = el)}
          className={`relative z-20 flex flex-col items-center mt-16 lg:mt-24 gap-4 justify-center text-white text-center ${
            visibilityStates[0] ? "fade-in" : "fade-out"
          }`}
        >
          <h5 className="text-lg md:text-base lg:text-[17px] tracking-[1.5px]">
            THE WEDDING OF
          </h5>
          <div className="flex w-100 gap-2">
            <h1 className="text-[50px] md:text-5xl lg:text-[40px]">PUTRA</h1>
            <h1 className="text-[50px] md:text-5xl lg:text-[40px]">&</h1>
            <h1 className="text-[50px] md:text-5xl lg:text-[40px]">MAYDI</h1>
          </div>
          <p className="text-sm md:text-base lg:mt-1 lg:text-[15px] tracking-[1.5px]">
            SABTU, 21 JUNI 2025
          </p>
        </div>

        {/* Arrow Container */}
        <div className={`relative flex flex-col items-center mb-0 lg:mb-20`}>
          {/* Arrow Icon */}
          <div
            className={`absolute z-20 transition-opacity duration-1000 ${
              isScrollable ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 ${isScrollable ? "rotate-180" : ""} bounce`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
