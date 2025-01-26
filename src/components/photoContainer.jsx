import { useEffect, useState, useRef } from "react";
import CelebrationCountdown from "./celebrationCountdown";
import DressCodeColorGuide from "./dresscodeColorGuide";
import ImageGallery from "./imageGallery";
import { useRouter } from "next/router";
import RsvpForn from "./RsvpForm";
import RsvpList from "./RsvpList";
import Image from "next/image";

const PhotoContainer = ({ playstatus, togglePlayPause }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [visibilityStates, setVisibilityStates] = useState([]);
  const [coverHeight, setCoverHeight] = useState("100vh");
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

  const toggleScrollable = () => {
    setIsScrollable((prev) => !prev);

    if (!isScrollable) {

      // Set a timeout to hide the cover page after the scroll duration
      setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Match this duration with the CSS transition duration
    }

    // Check play status and play if not playing
    if (playstatus !== "PLAYING") {
      togglePlayPause(); // Start playing the audio
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

  useEffect(() => {
    const updateHeight = () => {
      // Get the height of the viewport
      const viewportHeight = window.innerHeight;

      // Get the height of the header and footer (if they exist)
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const footerHeight = document.querySelector("footer")?.offsetHeight || 0;

      // Calculate the available height for the cover content
      const availableHeight = viewportHeight - headerHeight - footerHeight;

      // Set the cover height
      setCoverHeight(`${availableHeight}px`);
    };

    // Update height on resize
    window.addEventListener("resize", updateHeight);
    updateHeight(); // Initial call to set height

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className={`w-full z-20 h-screen lg:w-5/12 xl:w-1/3 right-container hide-scrollbar right-0 bottom-0 right-container-photo-config-custom ${
        isScrollable ? "scroll-container fixed" : "overflow-hidden fixed"
      }`}
      style={{ height: coverHeight }} // Set dynamic height
    >
      {/* Cover Content */}
      <div
        className={`flex-col items-center justify-between relative overflow-hidden right-container-photo-config-cover duration-1000 ease-in scroll-item-cover 
        ${isVisible ? "opacity-100 h-full flex p-8" : "w-0 p-0 right-container-photo-config-cover-collapse"}
        `}
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div className="relative z-20 flex flex-col mt-16 lg:mt-24 items-center justify-center text-white text-center">
          <h5 className="text-lg md:text-base lg:text-[20px] tracking-wider">
            We invite you to our wedding
          </h5>
          <div className="flex w-100 gap-2 mt-2">
            <h1 className="text-[50px] md:text-5xl lg:text-[55px]">Rangga</h1>
            <h1 className="text-[50px] md:text-5xl lg:text-[55px]">&</h1>
            <h1 className="text-[50px] md:text-5xl lg:text-[55px]">Novella</h1>
          </div>
          {/* <p className="text-sm md:text-base lg:text-base mt-3 tracking-wider">
            Saturday, 15th December, 2025
          </p> */}
        </div>

        {/* Description and Arrow Container */}
        <div
          className={`relative flex flex-col items-center ${
            isScrollable ? "mb-0 lg:mb-20" : "mb-0 lg:mb-20"
          }`}
        >
          {/* Description Container */}
          <div
            className={`relative z-20 flex-col gap-4 items-center justify-center text-white text-center ${
              isScrollable ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-lg md:text-base lg:text-[20px]">Kepada:</p>

            <div className="flex flex-col items-center mt-0 w-full">
              <div className="flex flex-col items-center min-w-60">
                {/* Text Guest Name */}
                <div className="flex flex-col w-full mt-3 lg:mt-5">
                  <div className="w-full gap-2">
                    <p
                      className={`text-lg md:text-base lg:text-[25px] text-center tracking-wider mb-2 lg:mb-5 mr-lg-[6.8rem]`}
                    >
                      {name}
                    </p>
                  </div>
                </div>
                {/* Horizontal line with minimum width */}
                <div className="w-full">
                  <div className="flex-grow border-[0.5px] border-white"></div>
                </div>
              </div>
              <p
                className={`text-[14px] md:text-base lg:text-[13px] text-center tracking-wider mt-3 mr-lg-[6.8rem]`}
              >
                Tanpa mengurangi rasa hormat, kami mengundang Bapak/ Ibu/
                Saudara/i hadir di
                <br />
                acara pernikahan kami.
              </p>
            </div>

            <button
              onClick={toggleScrollable}
              className="mt-4 px-4 py-2 rounded-3xl font-italiana bg-white text-black hover:bg-gray-600 hover:text-white transition"
            >
              {isScrollable ? "Let's Close" : "OPEN INVITATION"}
            </button>
          </div>

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

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 bg-black opacity-15 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/new-auth-3d448.appspot.com/o/img%2Ffinal_image%2Fmain_photo_1.jpg?alt=media&token=0cc3199f-c2d6-4904-b6f5-06638a6e24b8")',
            }}
          />
        </div>
      </div>

      {/* Content 1 */}
      <div
        className={`p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item`}
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[0] = el)}
          className={`relative z-20 top-8 lg:top-16 flex flex-col gap-0 gap-md-4 items-center justify-start text-[#fff] text-center ${
            visibilityStates[0] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex w-full gap-8 justify-center items-center">
            <div className="flex flex-col pb-4">
              <p className="text-[18px] h-2 mb-[4px] ms-2">15</p>
              <p className="font-medium inline-block transform rotate-[-220deg] scale-[2.7] me-[15px]">
                \
              </p>
              <p className="text-[18px] h-2 mt-[-17px] ms-[-10px]">02</p>
            </div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <Image
              src="/assets/logo_name_minimalis_3.svg"
              alt="Logo"
              height={60}
              width={60}
            />
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="flex flex-col">
              <p className="text-[18px] h-4">20</p>
              <p className="text-[18px] h-4 mb-2">25</p>
            </div>
          </div>

          {/* Countdown Component */}
          <CelebrationCountdown />
        </div>

        {/* Fading Video Background */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Overlay for fading effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgb(91 87 69 / 74%) 0%, rgba(164, 172, 133, 0.3) 30%, rgba(164, 172, 133, 0) 50%, rgba(164, 172, 133, 0.7) 200%)",
            }}
          ></div>
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/reels.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Content 2 */}
      <div
        className={`p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item`}
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[1] = el)}
          className={`relative z-20 top-8 lg:top-16 flex flex-col gap-0 gap-md-4 items-center justify-start text-[#424536] text-center ${
            visibilityStates[1] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex w-full justify-center gap-2">
            <h1 className="text-[35px] md:text-5xl lg:text-4xl">Matius</h1>
            <h4 className="text-[35px] md:text-5xl lg:text-4xl">19 : 6</h4>
          </div>
          <p className="text-[16px] px-5 py-3 md:text-base lg:text-base tracking-wider">
            &quot;Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu,
            apa yang telah dipersatukan Allah, tidak boleh diceraikan
            manusia.&quot;
          </p>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/final_image/main_photo_3.jpg")',
              backgroundPosition: `25%`, // Move the image slightly to the left
            }}
          />
        </div>
      </div>

      {/* Content 3 */}
      <div
        className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[2] = el)}
          className={`absolute z-20 bottom-9 right-0 w-full h-full flex flex-col gap-3 gap-md-4 ps-lg-16 px-6 lg:px-10 items-start justify-end text-white text-start ${
            visibilityStates[2] ? "fade-in" : "fade-out"
          }`}
        >
          {/*  */}
          <h1
            className={`text-[45px] md:text-5xl lg:text-[48px] mb-[-40px] lg:mb-[-10px]`}
          >
            Rangga Diprana
          </h1>
          <h1 className={`text-[45px] md:text-5xl lg:text-[48px]`}>
            Kalihanuraga Hadiyanto
          </h1>

          {/*  */}
          <div className="w-full flex items-center mt-[-6px] lg:mt-3">
            <h4
              className={`w-2/3 text-[17px] md:text-base lg:text-[23px] tracking-wider me-0 mt-md-5`}
            >
              Putra dari Pasangan
            </h4>
            <div className="w-2/3 pl-3 flex flex-col items-center">
              {/* Horizontal line with minimum width */}
              <div className="w-full">
                <div
                  className="flex-grow border border-white"
                  style={{ borderWidth: "0.1px" }}
                ></div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="flex flex-col w-full">
            <p
              className={`text-[17px] mb-[-4px] lg:mb-3 md:text-base lg:text-[20px] text-justify tracking-wider mr-lg-[6.8rem]`}
            >
              Hendhy Kunarjanto
            </p>
            <p
              className={`text-[17px] md:text-base lg:text-[20px] text-justify tracking-wider mr-lg-[6.8rem]`}
            >
              Kadek Ira Prana Dewi, SE.
            </p>
          </div>

          {/*  */}
          <button
            onClick={navigateToLinkInstagram1}
            className="text-[10px] lg:text-[13px] mt-1 px-4 py-[2px] rounded-3xl font-italiana bg-[#E9E1D2] text-black hover:bg-gray-600 hover:text-white transition"
          >
            @ranggadipranaa
          </button>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgb(91 87 69 / 0%) 0%, rgba(164, 172, 133, 0) 47%, rgba(164, 172, 133, 0.4) 79%, rgba(164, 172, 133, 0.7) 200%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center scale-[1.8]"
            style={{
              backgroundImage: 'url("/img/final_image/main_photo_4.jpg")',
              backgroundPosition: `55% 15%`, // Move the image slightly to the left
            }}
          />
        </div>
      </div>

      {/* Content 4 */}
      <div
        className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[3] = el)}
          className={`absolute z-20 bottom-9 right-0 w-full h-full flex flex-col gap-3 gap-md-4 ps-lg-16 px-6 lg:px-10 items-start justify-end text-white text-start ${
            visibilityStates[3] ? "fade-in" : "fade-out"
          }`}
        >
          {/*  */}
          <h1
            className={`text-[43px] md:text-5xl lg:text-[48px] mb-[-40px] lg:mb-[-10px]`}
          >
            Novella Asri
          </h1>
          <h1 className={`text-[43px] md:text-5xl lg:text-[48px]`}>
            Magdalena Sihombing, S. Ab
          </h1>

          {/*  */}
          <div className="w-full flex items-center mt-[-6px] lg:mt-3">
            <h4
              className={`w-2/3 text-[17px] md:text-base lg:text-[23px] tracking-wider me-0 mt-md-5`}
            >
              Putri dari Pasangan
            </h4>
            <div className="w-2/3 pl-3 flex flex-col items-center">
              {/* Horizontal line with minimum width */}
              <div className="w-full">
                <div
                  className="flex-grow border border-white"
                  style={{ borderWidth: "0.1px" }}
                ></div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="flex flex-col w-full">
            <p
              className={`text-[17px] mb-[-4px] lg:mb-1 md:text-base lg:text-[18px] text-justify tracking-wider mr-lg-[6.8rem]`}
            >
              Robinsar Sihombing, SE.
            </p>
            <p
              className={`text-[17px] md:text-base lg:text-[18px] text-justify tracking-wider mr-lg-[6.8rem]`}
            >
              Sarmauli S. Sidauruk
            </p>
          </div>

          {/*  */}
          <button
            onClick={navigateToLinkInstagram2}
            className="text-[10px] lg:text-[13px] mt-1 px-4 py-[2px] rounded-3xl font-italiana bg-[#E9E1D2] text-black hover:bg-gray-600 hover:text-white transition"
          >
            @novellaasri
          </button>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgb(91 87 69 / 0%) 0%, rgba(164, 172, 133, 0) 47%, rgba(164, 172, 133, 0.4) 79%, rgba(164, 172, 133, 0.7) 200%)",
            }}
          ></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/final_image/main_photo_5.jpg")',
              backgroundPosition: `42% 20%`, // Adjusted vertical position to move the image down
              transform: "scale(1.2) translate(10px, -60px)", // Move the image down by 20px
            }}
          />
        </div>
      </div>

      {/* Content 5 */}
      <div
        className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[4] = el)}
          className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-0 items-start justify-center text-white text-start ${
            visibilityStates[4] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex flex-col items-center gap-4 w-full text-center px-4">
            <div className="flex flex-col gap-7 lg:gap-20 items-center">
              <div className="flex flex-col items-center gap-5 w-[290px]">
                <h1 className="text-[40px] md:text-base lg:text-[45px] tracking-wider mt-2 mt-md-5">
                  Dress Code
                </h1>
                <p>
                  Kami mengundang para tamu untuk berkenan mengenakan
                  warna-warna berikut pada hari istimewa kami.
                </p>
              </div>
              <DressCodeColorGuide />
            </div>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/img/adat/main_photo_9.jpg")',
            }}
          />
        </div>
      </div>

      {/* Content 6 */}
      <div
        className="p-0 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[5] = el)}
          className={`relative w-full h-full`} // Make sure the container is relative
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 ps-lg-16 px-0 items-start justify-center text-white text-center ${
              visibilityStates[5] ? "fade-in" : "fade-out"
            }`}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
            }}
          >
            <div className="flex flex-col text-[#414833] items-center gap-2 lg:gap-14 text-center px-4">
              <div className="w-full flex flex-col lg:gap-5">
                <div className="flex flex-col">
                  <h1
                    className={`text-[43px] md:text-base lg:text-[43px] tracking-wider me-2 mt-2 mt-md-5`}
                  >
                    Pemberkatan
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <p
                    className={`text-[18px] font-semibold md:text-base lg:text-[20px] tracking-wider mr-lg-[6.8rem]`}
                  >
                    St. Francis Xavier <br /> Catholic Church <br />
                  </p>
                  <p
                    className={`text-[14px] md:text-base lg:text-[17px] tracking-wider mr-lg-[6.8rem]`}
                  >
                    Jl. Kartika Plaza No.107, Kuta, Kec. Kuta, Kabupaten Badung
                    Bali
                  </p>
                  <div className="flex flex-col">
                    <p className="text-[16px] lg:text-[20px]">
                      Sabtu, 15 Februari 2025
                    </p>
                    <p className="text-[16px] lg:text-[20px]">
                      10:00 - 12:00 WITA
                    </p>
                  </div>
                </div>

                <div className="flex w-full mt-2 justify-center">
                  <button
                    onClick={navigateToLink1}
                    className="text-[14px] w-[120px] px-4 py-[0px] rounded-3xl font-italiana bg-[#414833] text-[#E9E1D2] hover:bg-gray-600 hover:text-white transition"
                  >
                    Google Maps
                  </button>
                </div>
              </div>

              <div className="w-full flex flex-col lg:gap-5">
                {/*  */}
                <div className="flex flex-col">
                  <h1
                    className={`text-[43px] md:text-base lg:text-[43px] tracking-wider me-2 mt-2 mt-md-5`}
                  >
                    Resepsi
                  </h1>
                </div>
                {/*  */}
                <div className="flex flex-col gap-2">
                  <p
                    className={`text-[18px] font-semibold md:text-base lg:text-[20px] tracking-wider mr-lg-[6.8rem]`}
                  >
                    Riverside <br /> Convention Center <br />
                  </p>
                  <p
                    className={`text-[14px] md:text-base lg:text-[17px] tracking-wider mr-lg-[6.8rem]`}
                  >
                    Jl. Gn Catur IV, No.8, <br />
                    Padangsambian Kaja, Kec. Denpasar <br />
                    Barat, Denpasar, Bali
                  </p>
                  <div className="flex flex-col">
                    <p className="text-[16px] lg:text-[20px]">
                      Sabtu, 15 Februari 2025
                    </p>
                    <p className="text-[16px] lg:text-[20px]">
                      19:00 - 21:00 WITA
                    </p>
                  </div>
                </div>
                {/*  */}
                <div className="flex w-full mt-2 justify-center">
                  <button
                    onClick={navigateToLink2}
                    className="text-[14px] w-[120px] px-4 py-[0px] rounded-3xl font-italiana bg-[#414833] text-[#E9E1D2] hover:bg-gray-600 hover:text-white transition"
                  >
                    Google Maps
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
              backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/new-auth-3d448.appspot.com/o/img%2Ffinal_image%2Fmain_photo_7.jpg?alt=media&token=98669217-2420-43c1-86ad-993efc3729b5")',
              backgroundPosition: `42%`, // Adjusted vertical position to move the image down
              transform: "scale(1.4) translate(-57px, 40px)", // Move the image down by 20px
            }}
          />
        </div>
      </div>

      {/* Content 7 */}
      <div
        className="p-10 flex flex-col items-center justify-between relative scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[6] = el)}
          className={`relative w-full h-full`} // Make sure the container is relative
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-0 ps-lg-16 px-0 items-start justify-end text-white text-start ${
              visibilityStates[6] ? "fade-in" : "fade-out"
            }`}
          >
            <RsvpForn />
          </div>
        </div>
      </div>

      {/* Content 8 */}
      <div
        className=" flex flex-col items-center justify-between relative scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[7] = el)}
          className={`relative w-full h-full`} // Make sure the container is relative
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 ps-lg-16 px-0 items-start justify-start text-black text-start ${
              visibilityStates[7] ? "fade-in" : "fade-out"
            }`}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent background
            }}
          >
            <RsvpList />
          </div>
        </div>
      </div>

      {/* Content 9 */}
      <div
        className="p-10 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[8] = el)}
          className={`relative w-full h-full`} // Make sure the container is relative
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 ps-lg-16 px-0 items-start justify-end text-white text-start ${
              visibilityStates[8] ? "fade-in" : "fade-out"
            }`}
          >
            <h1 className={`text-[40px] md:text-5xl lg:text-[45px]`}>
              Hadiah Pernikahan
            </h1>
            <p
              className={`text-[13px] md:text-base lg:text-[15px] text-start tracking-wider lg:mb-4 mr-lg-[6.8rem]`}
            >
              Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan
              tanda cinta kepada kedua mempelai, Anda dapat memberikan melalui
              nomor rekening berikut
            </p>
            <div className="w-full flex gap-3 flex-col justify-center items-center text-[12px]">
              <div className="w-full border border-x-0 border-t-0 flex justify-between items-center">
                <div>
                  <p className="lg:text-[16px] lg:mb-[-5px] tracking-widest">
                    BLU by BCA DIGITAL
                  </p>
                  <p className="lg:text-[18px] lg:mb-[-5px] tracking-widest">
                    001210713747
                  </p>
                  <p className="lg:text-[17px] lg:mb-[5px] tracking-widest">
                    Novella Asri
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard("001210713747")}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#434834] text-white hover:bg-[#CCBFA3] transition"
                  aria-label="Copy account number"
                >
                  <i className="fas fa-copy"></i>{" "}
                  {/* Font Awesome paper icon */}
                </button>
              </div>
              <div className="w-full border border-x-0 border-t-0 flex justify-between items-center">
                <div>
                  <p className="lg:text-[16px] lg:mb-[-5px] tracking-widest">
                    BCA
                  </p>
                  <p className="lg:text-[18px] lg:mb-[-5px] tracking-widest">
                    7725423781
                  </p>
                  <p className="lg:text-[17px] lg:mb-[5px] tracking-widest">
                    Rangga Diprana
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard("7725423781")}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#434834] text-white hover:bg-[#CCBFA3] transition"
                  aria-label="Copy account number"
                >
                  <i className="fas fa-copy"></i>{" "}
                  {/* Font Awesome paper icon */}
                </button>
              </div>
              {/* {copySuccess && <p className="text-green-500">{copySuccess}</p>}{" "} */}
              {/* Success message */}
            </div>

            {/* {copySuccess && <p className="text-green-500">{copySuccess}</p>}{" "} */}
            {/* Success message */}
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/new-auth-3d448.appspot.com/o/img%2Ffinal_image%2Fslide_photo_5.jpg?alt=media&token=357b3621-2e62-4ee5-ba68-cd8898125095")',
            }}
          />
        </div>
      </div>

      {/* Content 10*/}
      <div
        className="p-10 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[9] = el)}
          className={`relative w-full h-full`} // Make sure the container is relative
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 ps-lg-16 px-0 pt-9 items-center justify-start text-white text-start ${
              visibilityStates[9] ? "fade-in" : "fade-out"
            }`}
            style={{
              backgroundColor: "rgba(255, 255, 255)",
            }}
          >
            <div className="flex flex-col h-full text-[#414833] items-center gap-2 text-center px-4">
              <div className="w-full h-full flex flex-col">
                <div className="flex flex-col lg:gap-10 lg:mb-10">
                  <p
                    className={`text-[15px] font-semibold md:text-base lg:text-[43px] tracking-wider mr-lg-[6.8rem]`}
                  >
                    Gallery Photos
                  </p>
                  <h1
                    className={`text-[45px] md:text-base lg:text-[40px] tracking-wider`}
                  >
                    Rangga & Novella
                  </h1>
                </div>
                <div className="hide-scrollbar overflow-y-auto h-full">
                  {" "}
                  {/* Set a max height for scrolling */}
                  <ImageGallery photosGallery={photosGallery} />
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
              backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/new-auth-3d448.appspot.com/o/img%2Fadat%2Fmain_photo_8.jpg?alt=media&token=e45736f1-51db-4a48-b9fd-0f753264c501")',
              backgroundPosition: `42%`, // Adjusted vertical position to move the image down
              transform: "scale(1.4) translate(18px, 40px)", // Move the image down by 20px
            }}
          />
        </div>
      </div>

      {/* Content 11 */}
      <div
        className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[10] = el)}
          className={`absolute z-20 right-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 pb-16 lg:pb-24 items-center justify-between lg:justify-evenly text-white text-center ${
            visibilityStates[10] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex items-center justify-center lg:mt-[20px]">
            <div className="mt-4">
              <Image
                src="/assets/logo_name_minimalis_3.svg"
                alt=""
                height={150}
                width={150}
              />
            </div>
          </div>

          <div className="flex flex-col lg:mb-[-150px]">
            <h1 className={`text-[40px] md:text-5xl lg:text-[45px]`}>
              Terima Kasih
            </h1>
            <div className="flex w-full flex-col gap-4 mt-2 justify-center">
              <div className="flex gap-2 mr-2">
                <p
                  className={`text-[14px] md:text-base lg:text-[18px] text-center tracking-wider mr-lg-[6.8rem]`}
                >
                  Doa dan kehadiran Bapak/Ibu/Saudara/i akan menjadi berkat yang
                  berarti bagi kami dalam memulai kehidupan baru ini.
                </p>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex gap-2 mr-2">
                  <h1
                    className={`text-[30px] md:text-base lg:text-[30px] text-justify tracking-wider mr-lg-[6.8rem]`}
                  >
                    Rangga & Novella
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://firebasestorage.googleapis.com/v0/b/new-auth-3d448.appspot.com/o/img%2Fadat%2Fmain_photo.jpg?alt=media&token=cafcdd4a-f74c-4385-8e97-963baf405f89")',
              backgroundPosition: `92%`, // Adjusted vertical position to move the image down
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoContainer;
