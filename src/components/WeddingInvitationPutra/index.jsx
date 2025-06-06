import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Sound from "react-sound"; // Import Sound from react-sound
import { getImageUrl } from "../../../lib/api/guest";
import Box from "@mui/material/Box";
import CircularProgressWithLabel from "../loader/CircularProgressWithLabel";
import MainContainer from "./MainContainer";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function WeddingInvitationPutra() {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [bgPosition, setBgPosition] = useState("center");
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const [coverHeight, setCoverHeight] = useState("100vh");
  const basePath = "/img_putra";

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleScrollable = () => {
    setIsScrollable((prev) => !prev);

    if (!isScrollable) {
      // Set a timeout to hide the cover page after the scroll duration
      setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Match this duration with the CSS transition duration
    }

    // Check play status and play if not playing
    if (playStatus !== "PLAYING") {
      togglePlayPause(); // Start playing the audio
    }
  };

  const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint]);

    return isMobile;
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    let interval;

    async function fetchImage() {
      const startTime = Date.now();

      try {
        setLoading(true);
        setProgress(0);

        interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        }, 150);

        const url = await getImageUrl(`${basePath}/putra_1.webp`);

        const elapsed = Date.now() - startTime;
        const minDelay = 6000; // minimum 2 seconds
        const remaining = minDelay - elapsed;

        setTimeout(
          () => {
            clearInterval(interval);
            setImageUrl(url);
            setLoading(false);
          },
          remaining > 0 ? remaining : 0
        );
      } catch (err) {
        console.error("Image load error:", err);
      }
    }

    fetchImage();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateBgPos = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBgPosition("60% center");
      } else if (width < 1024) {
        setBgPosition("70% center");
      } else if (width < 1280) {
        setBgPosition("80% center");
      } else if (width < 1480) {
        setBgPosition("100% center");
      } else if (width < 1680) {
        setBgPosition("90% center");
      }
    };

    updateBgPos();
    window.addEventListener("resize", updateBgPos);
    return () => window.removeEventListener("resize", updateBgPos);
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

  // Function to toggle play/pause
  const togglePlayPause = () => {
    setPlayStatus(Sound.status.PLAYING);
  };

  return (
    <div className="fixed h-screen w-full flex page-other">
      <Toaster />

      {/* 2/3 Container - Fixed */}
      <div
        className={`flex ${
          isScrollable ? "lg:w-7/12 xl:w-8/12" : "w-full"
        } p-8 justify-center fixed left-container`}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-10 z-0"></div>

        {/* Loader */}
        {loading || !imageUrl ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <Box className="z-10">
              <CircularProgressWithLabel value={progress} color="inherit" />
            </Box>
          </div>
        ) : (
          <>
            <div className="relative z-10 h-full w-full">
              <div
                className={`flex-col items-center justify-between md:justify-end md:gap-[10rem] relative overflow-hidden right-container-photo-config-cover duration-1000 ease-in scroll-item-cover opacity-100 h-full flex p-8`}
                style={{ height: coverHeight }}
              >
                {isScrollable ? (
                  <div className="relative z-10 h-full w-full flex items-end justify-between pb-20 text-white">
                    {/* Left - Title */}
                    <div className="flex flex-col">
                      {/* <h5 className="text-sm md:text-base tracking-[1.5px]">
                      THE WEDDING OF
                    </h5> */}
                      <h1 className="text-3xl md:text-4xl">PUTRA & MAYDI</h1>
                    </div>

                    {/* Right - Date */}
                    <div className="text-right text-sm md:text-base tracking-[1.5px]">
                      <p>SATURDAY</p>
                      <p>21 AUGUST 2024</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Title */}
                    <div className="relative z-20 flex flex-col items-center gap-4 justify-center mt-10 md:mt-20 lg:mt-0 text-white text-center">
                      <h5 className="text-sm md:text-base lg:text-[17px] tracking-[1.5px]">
                        THE WEDDING OF
                      </h5>
                      <div className="flex w-100 gap-2">
                        <h1 className="text-[30px] md:text-4xl lg:text-[40px] ">
                          PUTRA & MAYDI
                        </h1>
                      </div>
                      <p className="text-sm md:text-base lg:mt-1 lg:text-base tracking-[1.5px]">
                        SABTU, 21 JUNI 2025
                      </p>
                    </div>

                    {/* Content */}
                    <div
                      className={`relative flex flex-col items-center mb-10 md:mb-20`}
                    >
                      <div
                        className={`relative z-20 flex-col gap-4 items-center justify-center text-white text-center transition-opacity duration-700 ease-in-out ${
                          isScrollable
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                        }`}
                      >
                        <p className="text-md md:text-base lg:text-[17px] font-roboto">
                          Kepada Yth:
                        </p>

                        <div className="flex flex-col items-center mt-0 w-full">
                          <div className="flex flex-col items-center min-w-60">
                            <div className="flex flex-col w-full mt-3 lg:mt-5">
                              <div className="w-full gap-2">
                                <p
                                  className={`text-lg md:text-base lg:text-[25px] text-center tracking-normal 
                              mb-2 mr-lg-[6.8rem]`}
                                >
                                  Test
                                </p>

                                <div className="w-full">
                                  <div className="flex-grow border-[0.5px] border-white"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p
                            className={`text-[14px] md:text-base lg:text-[16px] text-center tracking-normal
                         mt-3 mr-lg-[6.8rem]`}
                          >
                            Tanpa mengurangi rasa hormat, kami mengundang Bapak/
                            Ibu/ Saudara/i hadir di acara pernikahan kami.
                          </p>
                        </div>

                        <button
                          onClick={toggleScrollable}
                          className="lg:h-[3.2rem] mt-4 px-4 py-2 rounded-md font-italiana bg-[#171712] text-[#fff] hover:bg-[#35352a] hover:text-white transition"
                        >
                          {isScrollable ? (
                            "Let's Close"
                          ) : (
                            <>
                              <p className="tracking-normal">BUKA UNDANGAN</p>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="absolute inset-0 w-full h-full">
              <Image
                src={imageUrl}
                alt="Background"
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 150vw, (max-width: 1024px) 120vw, 100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: bgPosition,
                  transform: isScrollable ? "scale(1.2)" : "scale(1)",
                }}
                className={`transition-transform duration-700 ease-in-out ${
                  isScrollable && isMobile ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </>
        )}
      </div>

      {/* 1/3 Container - Main Content*/}
      <MainContainer isScrollable={isScrollable} coverHeight={coverHeight} />

      {/* Sound Component */}
      <Sound
        url="/music/Teddy_Adhitya_-_Just_You_(Official_Lyric_Video).mp3"
        playStatus={playStatus}
        onFinishedPlaying={() => {
          setPlayStatus(Sound.status.STOPPED); // Stop the current playback
          setTimeout(() => {
            setPlayStatus(Sound.status.PLAYING); // Start playing again after a short delay
          }, 100); // Optional delay to ensure smooth looping
        }}
      />
    </div>
  );
}
