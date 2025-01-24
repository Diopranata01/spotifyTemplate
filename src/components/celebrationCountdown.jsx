import React, { useState, useEffect } from "react";

const CelebrationCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2025-02-15T10:00:00"); // Set your event date here

    const interval = setInterval(() => {
      const now = new Date();
      const distance = eventDate - now;

      // Calculate time remaining
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // No dependencies needed here

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Countdown Timer */}
      <div className="my-8 text-center text-lg">
        <div className="flex justify-center font-italiana gap-4">
          {/* Days */}
          <div className="flex items-center gap-9">
            <div className="flex flex-col">
              <span className="text-[38px]">{timeRemaining.days}</span>
              <p className="text-[15px] mt-2">Hari</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          {/* Hours */}
          <div className="flex items-center gap-7">
            <div className="flex flex-col ms-2">
              <span className="text-[38px]">{timeRemaining.hours}</span>
              <p className="text-[15px] mt-2">Jam</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          {/* Minutes */}
          <div className="flex items-center gap-7">
            <div className="flex flex-col ms-2">
              <span className="text-[38px]">{timeRemaining.minutes}</span>
              <p className="text-[15px] mt-2">Menit</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          {/* Seconds */}
          <div className="flex items-center ms-3">
            <div className="flex flex-col">
              <span className="text-[38px]">{timeRemaining.seconds}</span>
              <p className="text-[15px] mt-2">Detik</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save the Date Button {/* Uncomment the button if needed */}
      {/* <button className="font-italiana px-4 rounded-full mt-4 x-2 py-2 bg-white text-black text-sm hover:bg-gray-600 hover:text-white transition">
        Save The Date
      </button> */}
    </div>
  );
};

export default CelebrationCountdown;
