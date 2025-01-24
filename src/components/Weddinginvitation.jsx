import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Sound from "react-sound"; // Import Sound from react-sound
import PhotoContainer from "./photoContainer";

export default function WeddingInvitation() {
  const [isFirstVisible, setIsFirstVisible] = useState(false);
  const [isSecondVisible, setIsSecondVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);

  // useEffect(() => {
  //   // Trigger the animation after the component mounts
  //   setIsFirstVisible(true);
  //   setIsOverlayVisible(true);

  //   // Set a timeout to hide the first text and show the second text
  //   const timer1 = setTimeout(() => {
  //     setIsFirstVisible(false);
  //     setIsSecondVisible(true);
  //   }, 3000); // Duration for the first text to be visible

  //   // Set a timeout to hide the second text and the overlay
  //   const timer2 = setTimeout(() => {
  //     setIsSecondVisible(false);
  //     setIsOverlayVisible(false);
  //   }, 6000); // Duration for the second text to be visible

  //   // Cleanup the timers on unmount
  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //   };
  // }, []);

  // Function to toggle play/pause
  const togglePlayPause = () => {
    // setPlayStatus(() =>
    //   Sound.status.PLAYING
    // );
    // setPlayStatus((prevStatus) =>
    //   prevStatus === Sound.status.PLAYING
    //     ? Sound.status.PAUSED
    //     : Sound.status.PLAYING
    // );
  };

  return (
    <div className="fixed h-screen w-full flex">
      {/* 2/3 Container - Fixed */}
      <div className="hidden lg:flex lg:w-7/12 xl:w-8/12 p-8 justify-center fixed left-container main-photo">
        {/* black layout */}
        <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
        {/*  */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full">
          <div className="relative mb-[3rem]">
            {/* Initial Design */}
            <div className="flex items-center justify-center">
              <div className="mt-4">
                <img
                  src="/assets/logo_name_minimalis_2.svg"
                  alt=""
                  height={150}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1/3 Container - Main Content*/}
      <PhotoContainer playStatus={playStatus} togglePlayPause={togglePlayPause} />

      {/* Overlay */}
      {/* <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isOverlayVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }} 
        className={`absolute inset-0 bg-black ${
          isOverlayVisible ? "z-30" : "z-1"
        } flex items-center justify-center`} 
      >
        <div className="relative flex flex-col w-full items-center justify-center">
          
          <motion.h1
            initial={{ opacity: 0, y: -50 }} 
            animate={{
              opacity: isFirstVisible ? 1 : 0,
              y: isFirstVisible ? 0 : -50,
            }} 
            transition={{ duration: 0.5 }} 
            className="absolute text-2xl text-white text-center font-italiana mb-4"
          >
            We Invite You To Our Intimate Wedding
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 50 }} 
            animate={{
              opacity: isSecondVisible ? 1 : 0,
              y: isSecondVisible ? 0 : 50,
            }} // Animate to visible
            transition={{ duration: 0.5, delay: 0.5 }} 
            className="absolute text-[40px] text-white text-center"
          >
            Rangga & Novela
          </motion.h1>

          {/* <button
            onClick={togglePlayPause}
            className={`mt-28 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition ${
              playStatus === Sound.status.PLAYING ? "opacity-0" : "opacity-100"
            }`}
          >
            {playStatus === Sound.status.PLAYING ? "Pause Music" : "Play Music"}
          </button>
        </div>
      </motion.div> */}

      {/* Sound Component */}
      {/* <Sound
        url="/music/Daniel_Caesar_Always.mp3" 
        playStatus={playStatus} 
        onFinishedPlaying={() => setPlayStatus(Sound.status.STOPPED)} 
      /> */}
    </div>
  );
}
