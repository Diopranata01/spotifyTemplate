import { useEffect, useState, useRef } from "react";
import DressCodeColorGuide from "../dresscodeColorGuide";
import ImageGallery from "../imageGallery";
import { useRouter } from "next/router";
import Image from "next/image";
import CelebrationCountdown2 from "../celebrationCountdown2";
import RsvpForm2 from "../RsvpForm2";
import RsvpList2 from "../RsvpList2";
import DressCodeColorGuide2 from "../dresscodeColorGuide2";
import BankAccountCard from "../bankAccountCard";

const MainContainer = ({
  isScrollable,
  coverHeight
}) => {
  const [isOpenedList, setIsOpenedList] = useState(false);
  const [visibilityStates, setVisibilityStates] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const contentRefs = useRef([]);
  const lastScrollY = useRef(0); // Track last scroll position
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const router = useRouter();
  const { name } = router.query; // Assuming your dynamic route is [slug]

  const photos = [
    "/img/final_image/slide_photo_1.jpg",
    "/img/final_image/slide_photo_2.jpg",
    "/img/final_image/slide_photo_3.jpg",
    "/img/final_image/slide_photo_4.jpg",
    "/img/final_image/slide_photo_5.jpg",
    "/img/final_image/slide_photo_6.jpg",
  ];
  const photosGallery = [
    "/img/gallery/gallery_(1).jpg",
    "/img/gallery/gallery_(2).jpg",
    "/img/gallery/gallery_(3).jpg",
    "/img/gallery/gallery_(4).jpg",
    "/img/gallery/gallery_(5).jpg",
    "/img/gallery/gallery_(6).jpg",
    "/img/gallery/gallery_(7).jpg",
    "/img/gallery/gallery_(8).jpg",
    "/img/gallery/gallery_(9).jpg",
    "/img/gallery/gallery_(10).jpg",
    "/img/gallery/gallery_(11).jpg",
    "/img/gallery/gallery_(12).jpg",
    "/img/gallery/gallery_(13).jpg",
    "/img/gallery/gallery_(14).jpg",
    "/img/gallery/gallery_(15).jpg",
  ];

  const handleNextPageClick = () => {
    // Find the index of the current section (which is visible)
    const currentIndex = visibilityStates.findIndex((isVisible) => isVisible);

    // Check if there is a next section
    if (currentIndex !== -1 && currentIndex + 1 < visibilityStates.length) {
      // Scroll to the next section (currentIndex + 1)
      const nextSectionIndex = currentIndex + 1;
      const nextSectionRef = contentRefs.current[nextSectionIndex];

      if (nextSectionRef) {
        nextSectionRef.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      console.log("No more sections to navigate to.");
    }
  };

  // Function to open Google Maps
  const navigateToLink1 = () => {
    window.open("https://maps.app.goo.gl/kB5ShMszJ8nuDxQw5", "_blank");
  };

  const navigateToLink2 = () => {
    window.open("https://maps.app.goo.gl/wWBCJLMvGSSyfYV49", "_blank");
  };

  const navigateToLinkInstagram1 = () => {
    window.open(
      "https://www.instagram.com/ranggadipranaa?igsh=dm00bXM0emg3YTc=",
      "_blank"
    );
  };

  const navigateToLinkInstagram2 = () => {
    window.open(
      "https://www.instagram.com/novellaasri?igsh=MXZqYjFnODUwZmY2Zg==",
      "_blank"
    );
  };

  const scrollToSecondContainer = () => {
    const secondContainer = document.querySelector(
      ".scroll-item:nth-of-type(2)"
    );
    if (secondContainer) {
      secondContainer.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Second container not found");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess("Copied!"); // Set success message
        setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  // Effect to manage body scroll
  useEffect(() => {
    document.body.style.overflow = isScrollable ? "hidden" : "auto"; // Toggle body scroll
  }, [isScrollable]);

  // Effect to change photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000); // Change photo every 5 seconds

    return () => clearInterval(interval);
  }, [photos.length]);

  // Effect to manage Intersection Observer for multiple content sections
  useEffect(() => {
    const refs = contentRefs.current; // Copy the refs to a variable

    const observers = refs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibilityStates((prev) => {
            const newStates = [...prev];
            newStates[index] = entry.isIntersecting;
            return newStates;
          });
        },
        { threshold: 0.1 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (refs[index]) {
          observer.unobserve(refs[index]);
        }
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll); // Listen for scroll events

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener
    };
  }, []);

  return (
    <div
      className={`w-full z-20 h-screen lg:w-5/12 xl:w-1/3 hide-scrollbar right-0 bottom-0 ${
        isScrollable ? "scroll-container fixed" : "overflow-hidden fixed hidden"
      }`}
      style={{ height: coverHeight }} // Set dynamic height
    >
      {/* Content 1 */}
      <div
        className={`flex-col items-center justify-between relative overflow-hidden right-container-photo-config-cover duration-1000 ease-in scroll-item-cover opacity-100 h-full flex p-8 bg-cover bg-no-repeat bg-[60%_center] sm:bg-[65%_center] md:bg-[70%_center] xl:bg-[90%_center]`}
        style={{
          backgroundImage: `url("/img/bang_putra/putra_2.webp")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: coverHeight,
        }}
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[0] = el)}
          className={`relative z-20 flex flex-col items-center mt-16 sm:mt-20 lg:mt-24 gap-2 md:gap-4 lg:gap-4 xl:gap-2 2xl:gap-4 justify-center text-white text-center ${
            visibilityStates[0] ? "fade-in" : "fade-out"
          }`}
        >
          {/* Subtitle */}
          <h5 className="text-sm sm:text-base md:text-lg lg:text-[16px] xl:text-[16px] 2xl:text-[18px] tracking-wide">
            THE WEDDING OF
          </h5>

          {/* Names */}
          <div className="flex w-full gap-2 flex-wrap justify-center">
            <h1 className="text-[32px] sm:text-[34px] md:text-[36px] lg:text-[34px] xl:text-[34px] 2xl:text-[40px]">
              PUTRA
            </h1>
            <h1 className="text-[32px] sm:text-[34px] md:text-[36px] lg:text-[34px] xl:text-[34px] 2xl:text-[40px] mb-3">
              &
            </h1>
            <h1 className="text-[32px] sm:text-[34px] md:text-[36px] lg:text-[34px] xl:text-[34px] 2xl:text-[40px]">
              MAYDI
            </h1>
          </div>

          {/* Date */}
          <p className="text-xs sm:text-sm md:text-base lg:text-[15px] tracking-wide">
            SABTU, 21 JUNI 2025
          </p>
        </div>

        {/* Arrow Container */}
        <div className="relative flex flex-col items-center mb-4 sm:mb-12 lg:mb-20">
          <div
            className={`absolute z-20 transition-opacity duration-1000 ${
              isScrollable ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 sm:h-8 w-6 sm:w-8 ${
                isScrollable ? "rotate-180" : ""
              } bounce`}
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

      {/* Content 2*/}
      <div
        className={`flex-col items-center justify-between md:justify-center xl:justify-start relative overflow-hidden right-container-photo-config-cover duration-1000 ease-in scroll-item-cover opacity-100 h-full flex p-8 xl:bg-[10%_center]`}
        style={{
          backgroundImage: `url("/img/bang_putra/putra_3.webp")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: coverHeight,
        }}
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[1] = el)}
          className={`relative z-20 top-8 md:top-0 px-3 sm:px-5 py-3 lg:top-16 xl:top-0 2xl:top-16 flex flex-col gap-0 lg:gap-3 items-end justify-start text-[#fff] text-center ${
            visibilityStates[1] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex w-full py-3 justify-start gap-5">
            <h1 className="text-[32px] md:text-[36px] lg:text-[35px] xl:text-[35px] 2xl:text-[44px] tracking-widest">
              MARK 10:6-9
            </h1>
          </div>
          <p className="text-[14px] md:text-base lg:text-[15px] tracking-normal text-start">
            &quot;From the beginning of creation, God made them male and female.
            For this reason, a man shall leave his father and mother and be
            united to his wife, and the two shall become one flesh. As a result,
            they are no longer two, but one. Therefore, what God has joined
            together, let no one separate.&quot;
          </p>
        </div>
      </div>

      {/* Content 3 */}
      <div
        className="p-9 flex flex-col items-center justify-end relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }}
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[2] = el)}
          className={`absolute z-20 bottom-0 right-0 w-full h-full flex flex-col px-11 sm:px-12 lg:px-16 pb-10 md:pb-12 lg:pb-16 gap-2 md:gap-4 text-white text-start justify-end ${
            visibilityStates[2] ? "fade-in" : "fade-out"
          }`}
        >
          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-[17px] tracking-[1px] font-joan">
            THE GROOM
          </p>

          {/* Name */}
          <h1 className="text-[32px] sm:text-[40px] md:text-[46px] lg:text-[38px] xl:text-[40px] leading-snug">
            Putra Sihombing
          </h1>

          {/* Line + Label */}
          <div className="flex items-center gap-4 mt-1">
            <h4 className="text-sm sm:text-base md:text-xl lg:text-[18px] italic whitespace-nowrap">
              Putra ke- dari Pasangan
            </h4>
            <div className="flex-grow border-t border-white opacity-60 ms-3" />
          </div>

          {/* Parent Names */}
          <div className="flex flex-col gap-1 mt-1 text-justify sm:pr-6">
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Hendra Wijaya Sihombing, SE.
            </p>
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Natania Dewi Sihombing, SE.
            </p>
          </div>

          {/* Button */}
          <div className="w-1/5">
            <button
              onClick={navigateToLinkInstagram1}
              className="text-sm sm:text-base md:text-md lg:text-lg font-lora mt-1 pb-1 px-3 py-[2px] rounded-3xl bg-[#E9E1D2] text-black hover:bg-gray-600 hover:text-white transition"
            >
              @putra_sihombing
            </button>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black Overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0%) 54%, rgba(34, 37, 28, 0.63) 70%, rgba(35, 44, 25, 0.86) 93%)",
            }}
          ></div>

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_4.webp")',
              backgroundPosition: "55% center",
            }}
          />
        </div>
      </div>

      {/* Content 4 */}
      <div
        className="p-9 flex flex-col items-center justify-end relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }}
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[3] = el)}
          className={`absolute z-20 bottom-0 right-0 w-full h-full flex flex-col px-11 sm:px-12 lg:px-16 pb-10 md:pb-12 lg:pb-16 gap-2 md:gap-4 text-white text-start justify-end ${
            visibilityStates[3] ? "fade-in" : "fade-out"
          }`}
        >
          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-[17px] tracking-[1px] font-joan">
            THE BRIDE
          </p>

          {/* Name */}
          <h1 className="text-[32px] sm:text-[40px] md:text-[46px] lg:text-[38px] xl:text-[40px] leading-snug">
            Maydi
          </h1>

          {/* Line + Label */}
          <div className="flex items-center gap-4 mt-1">
            <h4 className="text-sm sm:text-base md:text-xl lg:text-[18px] italic whitespace-nowrap">
              Putri ke- dari Pasangan
            </h4>
            <div className="flex-grow border-t border-white opacity-60 ms-3" />
          </div>

          {/* Parent Names */}
          <div className="flex flex-col gap-1 mt-1 text-justify sm:pr-6">
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Hendra Wijaya Sihombing, SE.
            </p>
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Natania Dewi Sihombing, SE.
            </p>
          </div>

          {/* Button */}
          <div className="w-1/5">
            <button
              onClick={navigateToLinkInstagram1}
              className="text-sm sm:text-base md:text-md lg:text-lg font-lora mt-1 pb-1 px-3 py-[2px] rounded-3xl bg-[#E9E1D2] text-black hover:bg-gray-600 hover:text-white transition"
            >
              @maydi
            </button>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0%) 54%, rgba(34, 37, 28, 0.63) 70%, rgba(35, 44, 25, 0.86) 93%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_5.webp")',
              backgroundPosition: "55% center",
            }}
          />
        </div>
      </div>

      {/* Content 5 */}
      <div
        className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-start sm:justify-center relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }}
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[4] = el)}
          className={`relative z-20 top-2 md:top-4 lg:top-0 px-5 py-3 flex flex-col gap-6 items-start justify-start text-white ${
            visibilityStates[4] ? "fade-in" : "fade-out"
          }`}
        >
          {/* Title */}
          <h1 className="text-[28px] sm:text-[28px] md:text-[46px] lg:text-[38px] xl:text-[40px] leading-snug">
            THE JOURNEY OF <br /> TWO SOULS IN LOVE
          </h1>

          {/* Journey Paragraph Blocks */}
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="flex flex-col w-full gap-1">
              <p className="text-base sm:text-base md:text-xl lg:text-[16px] mb-0 tracking-normal">
                Agustus 2020
              </p>
              <p className="text-sm sm:text-base md:text-xl lg:text-[16px] tracking-normal text-justify">
                From the beginning of creation, God made them male and female.
                For this reason, a man shall leave his father and mother and be
                united to his wife, and the two shall become one flesh. As a
                result, they are no longer two, but one. Therefore, what God has
                joined together, let no one separate.
              </p>
            </div>
          ))}
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Overlay (Optional: add a gradient for readability) */}
          <div className="absolute inset-0 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_6.webp")',
              backgroundPosition: "55% center",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      </div>

      {/* Content 6 */}
      <div
        className="p-0 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }}
      >
        {/* Content Container */}
        <div
          ref={(el) => (contentRefs.current[5] = el)}
          className="relative w-full h-full"
        >
          {/* Text Overlay */}
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 items-center justify-center text-white text-center px-4 sm:px-8 lg:px-16 ${
              visibilityStates[5] ? "fade-in" : "fade-out"
            }`}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          >
            <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-12 max-w-screen-md text-center">
              {/* Top Section */}
              <div className="w-full flex flex-col items-center gap-1 sm:gap-2 md:gap-4 lg:gap-2">
                <Image
                  src="/assets/bouqet.svg"
                  width={32}
                  height={32}
                  className="w-10 h-auto scale-x-125 invert"
                  alt="logo"
                />
                <h1 className="text-[13px] sm:text-lg md:text-2xl lg:text-xl font-joan my-3 mb-1 md:mb-0 lg:my-1 lg:mb-0">
                  SAVE OUR DATE
                </h1>
                <h1 className="text-[22px] sm:text-xl md:text-[38px] lg:text-2xl">
                  SABTU
                </h1>
                <h1 className="text-[22px] sm:text-xl md:text-[38px] lg:text-2xl">
                  21 JUNI 2025
                </h1>
              </div>

              {/* Ceremony Section */}
              <div className="w-full flex flex-col gap-1 md:gap-3">
                <div className="flex flex-col gap-1 md:gap-3">
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl">
                    Pemberkatan
                  </h1>
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl">
                    12:00 - 13:00 WIB
                  </h1>
                </div>
                <p className="text-sm sm:text-base md:text-xl lg:text-[18px] whitespace-pre-line">
                  Gereja Katedral Denpasar
                  {"\n"}Jl. Tangkuban Perahu, no 12 Denpasar,
                  {"\n"}Bali
                </p>

                <div className="flex w-full justify-center mt-2 md:mt-0">
                  <button
                    // onClick={toggleScrollable}
                    className="lg:h-[2.8rem] px-3 md:px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
                  >
                    <p className="text-[14px] md:text-[18px] sm:text-[17px] lg:text-lg tracking-normal">
                      Google Map
                    </p>
                  </button>
                </div>
              </div>

              {/* Reception Section */}
              <div className="w-full flex flex-col gap-1 md:gap-3 mt-4">
                <div className="flex flex-col gap-1 md:gap-3">
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl">
                    Resepsi Pernikahan
                  </h1>
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl">
                    12:00 - 13:00 WIB
                  </h1>
                </div>
                <p className="text-sm sm:text-base md:text-xl lg:text-[18px] whitespace-pre-line">
                  Gereja Katedral Denpasar
                  {"\n"}Jl. Tangkuban Perahu, no 12 Denpasar,
                  {"\n"}Bali
                </p>

                <div className="flex w-full justify-center mt-2 md:mt-0">
                  <button
                    // onClick={toggleScrollable}
                    className="lg:h-[2.8rem] px-3 md:px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
                  >
                    <p className="text-[14px] md:text-[18px] sm:text-[17px] lg:text-lg tracking-normal">
                      Google Map
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 opacity-60 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_7.webp")',
              backgroundPosition: `55% center`,
              transform: "scaleX(-1)",
            }}
          />
        </div>
      </div>

      {/* Content 7 */}
      <div
        className="p-9 pb-4 md:pb-9 flex flex-col items-center justify-end relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[6] = el)}
          className={`relative z-20 px-5 py-3 flex flex-col md:bottom-[70%] lg:bottom-14 gap-0 items-center justify-start text-[#fff] text-center marker: ${
            visibilityStates[6] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex w-full py-3 justify-center gap-5">
            <h1 className="text-2xl md:text-[32px] lg:text-[32px] md:text-[#3A3A30] lg:text-white">
              MENUJU HARI SPESIAL
            </h1>
          </div>

          {/* Countdown Component */}
          <CelebrationCountdown2 />

          <div className="flex w-full justify-center">
            <button
              // onClick={toggleScrollable}
              className="lg:h-[2.4rem] px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
            >
              <p className="text-[14px] md:text-[18px] sm:text-[17px] lg:text-lg tracking-normal">
                Catat Tanggal
              </p>
            </button>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 opacity-60 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_8.webp")',
              backgroundPosition: `65% top`,
              transform: "scale(1.2) scaleX(-1) translateY(-3%)", // move image up
              transformOrigin: "center center",
            }}
          ></div>
        </div>
      </div>

      {/* Content 8 */}
      <div
        className="p-0 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[7] = el)}
          className={`relative w-full h-full`} // Make sure the container is relative
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 ps-lg-16items-center justify-center text-white text-center ${
              visibilityStates[7] ? "fade-in" : "fade-out"
            }`}
          >
            <div
              className={`absolute z-20 right-0 top-0 w-full flex flex-col gap-0 ps-lg-16 px-5 items-start justify-center text-white text-start fade-in h-full`}
            >
              <RsvpForm2 />
            </div>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 opacity-60 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_9.webp")',
              backgroundPosition: `40% center`,
            }}
          />
        </div>
      </div>

      {/* Content 9 */}
      <div
        className={`p-9 flex flex-col items-center justify-start relative scroll-item scroll-item-list hide-scrollbar ${
          isOpenedList ? "overflow-y-scroll" : "overflow-hidden"
        }`}
        style={{ height: coverHeight }}
      >
        {/* Background image layer */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_10.webp")',
              backgroundPosition: `55% center`,
            }}
          />
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Foreground content */}
        <div
          ref={(el) => (contentRefs.current[8] = el)}
          className={`relative z-10 w-full h-full`}
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full ${
              isOpenedList ? "" : "h-screen"
            } ${
              visibilityStates[8] ? "fade-in" : "fade-out"
            }flex flex-col ps-lg-16 px-0 items-start justify-start text-white text-start fade-in`}
          >
            <RsvpList2 isOpenedList={isOpenedList} />
          </div>

          {!isOpenedList ? (
            <div className="h-full flex flex-col justify-end mb-14">
              <div className="relative z-30 w-full flex justify-center mt-4">
                <button
                  onClick={() => setIsOpenedList((prev) => !prev)}
                  className="lg:h-[2.4rem] px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
                >
                  <p className="tracking-normal">Muat Lebih Banyak</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-end mb-8">
              <div className="relative z-30 w-full flex justify-center mt-4">
                <button
                  onClick={handleNextPageClick}
                  className="lg:h-[2.4rem] px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
                >
                  <p className="tracking-normal">Halaman Selanjutnya</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content 10 */}
      <div
        className="p-9 flex flex-col items-center justify-center relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[9] = el)}
          className={`relative z-20 px-5 py-3 flex flex-col lg:bottom-32 gap-0 items-center justify-start text-[#fff] text-center ${
            visibilityStates[9] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex flex-col w-full py-3 justify-center gap-5 md:gap-7">
            <h1 className="text-[28px] md:text-3xl lg:text-[30px]">
              DRESS CODE
            </h1>
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px] text-center tracking-wider">
              Kami mengundang para tamu untuk berkenan mengenakan warna-warna
              berikut pada hari istimewa kami.
            </p>
            <DressCodeColorGuide2 />
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 40%) 0%, rgba(41, 41, 41, 0.45) 72%, rgba(90, 90, 90, 0.26) 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_11.webp")',
              backgroundPosition: `55% center`, // Move the image slightly to the left
            }}
          />
        </div>
      </div>

      {/* Content 11 */}
      <div
        className="p-4 sm:p-6 md:p-9 flex flex-col items-center justify-end relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }}
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[10] = el)}
          className={`relative w-full z-20 px-4 sm:px-6 py-4 flex flex-col gap-6 items-center lg:items-start justify-start text-white ${
            visibilityStates[10] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex flex-col w-full gap-6 max-w-3xl sm:items-center ">
            <div className="w-full flex flex-col gap-6 text-center md:text-start">
              <h1 className="text-[28px] md:text-4xl lg:text-[32px]">
                Hadiah Pernikahan
              </h1>
              <p className="text-sm sm:text-base md:text-xl lg:text-[18px] leading-relaxed tracking-normal">
                Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan
                tanda cinta kepada kedua mempelai, Anda dapat memberikan melalui
                nomor rekening berikut:
              </p>
            </div>

            <BankAccountCard
              name="Putra Sihombing"
              bankName="Bank BCA"
              accountNumber="000867671"
              copyToClipboard={copyToClipboard}
            />
            <BankAccountCard
              name="Sherly Siahaan"
              bankName="Bank BCA"
              accountNumber="000867671"
              copyToClipboard={copyToClipboard}
            />
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(31, 31, 31, 0.55) 82%, rgba(90, 90, 90, 0.26) 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_12.webp")',
              backgroundPosition: `40% center`,
            }}
          />
        </div>
      </div>

      {/* Content 12 */}
      <div
        className="p-9 flex flex-col items-center justify-end relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[11] = el)}
          className={`relative w-full z-20 px-5 py-3 flex flex-col gap-0 lg:bottom-10 items-center justify-start text-[#fff] text-center ${
            visibilityStates[11] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex flex-col w-full py-3 gap-7">
            <h1 className="text-[20px] md:text-[40px] md:text-5xl lg:text-[32px]">
              PERAYAAN PRE-WEDDING KAMI
            </h1>
            <p className="text-[14px] md:text-base lg:[16px] tracking-widest">
              PUTRA & MAYDI
            </p>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 40%) 0%, rgba(31, 31, 31, 0.55) 82%, rgba(90, 90, 90, 0.26) 100%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/bang_putra/putra_13.webp")',
              backgroundPosition: `40% center`, // Move the image slightly to the left
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
