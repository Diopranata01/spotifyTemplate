import { useEffect, useState, useRef } from "react";
import ImageGallery from "../imageGallery";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Image from "next/image";
import CelebrationCountdown2 from "../celebrationCountdown2";
import RsvpForm2 from "../RsvpForm2";
import RsvpList2 from "../RsvpList2";
import DressCodeColorGuide2 from "../dresscodeColorGuide2";
import BankAccountCard from "../bankAccountCard";
import { db } from "../../../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const MainContainer = ({ isScrollable, coverHeight }) => {
  const [isOpenedList, setIsOpenedList] = useState(false);
  const [visibilityStates, setVisibilityStates] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const contentRefs = useRef([]);
  const lastScrollY = useRef(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const router = useRouter();
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const photos = [
    "/img/final_image/slide_photo_1.jpg",
    "/img/final_image/slide_photo_2.jpg",
    "/img/final_image/slide_photo_3.jpg",
    "/img/final_image/slide_photo_4.jpg",
    "/img/final_image/slide_photo_5.jpg",
    "/img/final_image/slide_photo_6.jpg",
  ];

  const photosGallery = [
    "/img/bang_putra/putra_1.webp",
    "/img/bang_putra/putra_2.webp",
    "/img/bang_putra/putra_3.webp",
    "/img/bang_putra/putra_4.webp",
    "/img/bang_putra/putra_5.webp",
    "/img/bang_putra/putra_6.webp",
    "/img/bang_putra/putra_7.webp",
    "/img/bang_putra/putra_8.webp",
    "/img/bang_putra/putra_9.webp",
    "/img/bang_putra/putra_10.webp",
    "/img/bang_putra/putra_11.webp",
    "/img/bang_putra/putra_12.webp",
    "/img/bang_putra/putra_13.webp",
  ];

  const journey = [
    {
      id: 1,
      date: "2016",
      description:
        "Pertama kali dipertemukan melalui kegiatan KKN dari kampus Universitas Udayana, Bali Saat itu Putra adalah seorang mahasiswa jurusan Kimia dan Maydi merupakan mahasiswi jurusan Ilmu Politik.",
    },
    {
      id: 2,
      date: "2020",
      description:
        "Dalam keadaan yang lebih baik setelah memperoleh gelar Sarjana, keduanya memutuskan untuk berkenalan kembali dan memulai untuk memadu kasih agar saling mengenal lebih dalam.",
    },
    {
      id: 3,
      date: "2024",
      description:
        "Memperoleh keputusan yang bulat serta dukungan dari kedua orang tua, Putra dan Maydi memutuskan untuk melangkah ke jenjang berikutnya.",
    },
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

  const fetchRsvps = async () => {
    setLoading(true); // Start loading
    try {
      const rsvpCollection = collection(db, "rsvp_2");
      const rsvpQuery = query(
        rsvpCollection,
        orderBy("submissionDate", "desc")
      ); // Order by submissionDate descending
      const rsvpSnapshot = await getDocs(rsvpQuery);
      const rsvpList = rsvpSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRsvps(rsvpList);
    } catch (error) {
      console.error("Error fetching RSVPs: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000); // Match this duration with the CSS transition duration
    }
  };

  // Function to open Google Maps
  const navigateToLink1 = () => {
    window.open("https://maps.app.goo.gl/aLuUZE1pe3Wy4wSF8", "_blank");
  };

  const navigateToLink2 = () => {
    window.open("https://maps.app.goo.gl/9BjNHxSAqKVRwBix5", "_blank");
  };

  const navigateToLinkInstagram1 = () => {
    window.open(
      "https://www.instagram.com/dotskii?igsh=MWJ2dHIwaThzc28xNw==",
      "_blank"
    );
  };

  const navigateToLinkInstagram2 = () => {
    window.open(
      "https://www.instagram.com/fransiscamaydi?igsh=MWI1cjFzZjlpcHEzMw==",
      "_blank"
    );
  };

  const downloadICS = () => {
    const title = "Acara Pernikahan Putra & Maydi";
    const description = "Undangan pernikahan Putra & Maydi.";
    const location = "Gereja Katolik Keluarga Kudus, Cibinong";
    const startDate = "20250621T090000Z"; // Start time in UTC
    const endDate = "20250621T110000Z"; // End time in UTC

    const uid = `putra-maydi-${Date.now()}@wedding.com`;
    const dtstamp =
      new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent =
      `BEGIN:VCALENDAR\r\n` +
      `VERSION:2.0\r\n` +
      `PRODID:-//PutraMaydi//Wedding//ID\r\n` +
      `BEGIN:VEVENT\r\n` +
      `UID:${uid}\r\n` +
      `DTSTAMP:${dtstamp}\r\n` +
      `DTSTART:${startDate}\r\n` +
      `DTEND:${endDate}\r\n` +
      `SUMMARY:${title}\r\n` +
      `DESCRIPTION:${description}\r\n` +
      `LOCATION:${location}\r\n` +
      `STATUS:CONFIRMED\r\n` +
      `END:VEVENT\r\n` +
      `END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "putra_maydi_wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text) => {
    console.log(text);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess("Copied!");
        toast.success("Number copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy");
      });
  };

  // Effect to manage body scroll
  useEffect(() => {
    document.body.style.overflow = isScrollable ? "hidden" : "auto"; // Toggle body scroll
  }, [isScrollable]);

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
      className={`w-full z-20 h-screen lg:w-5/12 xl:w-1/3 hide-scrollbar right-0 bottom-0 scroll-container fixed transition-opacity duration-700 ease-in-out ${
        isScrollable
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ height: coverHeight }}
    >
      {/* Content 1 */}
      <div
        className={`flex-col items-center justify-between relative overflow-hidden right-container-photo-config-cover duration-1000 ease-in scroll-item-cover opacity-100 h-full flex p-8 bg-cover bg-no-repeat bg-[60%_center] sm:bg-[65%_center] md:bg-[70%_center] xl:bg-[90%_center]`}
        style={{
          height: coverHeight,
        }}
      >
        {/* Background Image using Next.js Image */}
        <Image
          src="/img/bang_putra/putra_2.webp"
          alt="Putra Cover"
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58.333vw, 66.667vw"
          className="object-cover transition-transform duration-700 ease-in-out object-[60%_center] sm:object-[65%_center] md:object-[70%_center] xl:object-[90%_center]"
        />

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
          height: coverHeight,
        }}
      >
        {/* Background Image using Next.js Image */}
        <Image
          src="/img/bang_putra/putra_3.webp"
          alt="Putra 3 Background"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58.333vw, 66.667vw"
          className="object-cover object-[60%_center] sm:object-[65%_center] md:object-[70%_center] xl:object-[10%_center]"
        />

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
          <p className="text-[14px] md:text-[20px] lg:text-[20px] xl:text-[15px] tracking-normal text-start">
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
          className={`absolute z-20 bottom-0 right-0 w-full h-full flex flex-col px-11 sm:px-12 lg:px-10 pb-10 md:pb-8 gap-2 md:gap-4 text-white text-start justify-end ${
            visibilityStates[2] ? "fade-in" : "fade-out"
          }`}
        >
          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-[17px] tracking-[1px] font-joan">
            THE GROOM
          </p>

          {/* Name */}
          <h1 className="text-[28px] sm:text-[28px] md:text-[30px] lg:text-[30px] xl:text-[32px] leading-snug">
            Putra Saurdot Pangihutan Sihombing
          </h1>

          {/* Line + Label */}
          <div className="flex items-center gap-4 mt-1">
            <h4 className="text-sm sm:text-base md:text-xl lg:text-[18px] italic whitespace-nowrap">
              Putra ke-1 dari Pasangan
            </h4>
            <div className="flex-grow border-t border-white opacity-60 ms-3" />
          </div>

          {/* Parent Names */}
          <div className="flex flex-col gap-1 mt-1 text-justify sm:pr-6">
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Nelson Sihombing
            </p>
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Tiopan Simbolon
            </p>
          </div>

          {/* Button */}
          <div className="w-1/5">
            <button
              onClick={navigateToLinkInstagram1}
              className="text-sm sm:text-base md:text-md lg:text-md xl:text-md 2xl:text-lg font-lora mt-1 pb-1 px-3 py-[2px] rounded-3xl bg-[#E9E1D2] text-black hover:bg-gray-600 hover:text-white transition"
            >
              @dotskii
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

          {/* Background Image using Next.js */}
          <Image
            src="/img/bang_putra/putra_4.webp"
            alt="Putra 4 Background"
            fill
            className="object-cover object-[55%_center]"
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
          className={`absolute z-20 bottom-0 right-0 w-full h-full flex flex-col px-11 sm:px-12 lg:px-10 pb-10 md:pb-8 gap-2 md:gap-4 text-white text-start justify-end ${
            visibilityStates[3] ? "fade-in" : "fade-out"
          }`}
        >
          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-[17px] tracking-[1px] font-joan">
            THE BRIDE
          </p>

          {/* Name */}
          <h1 className="text-[28px] sm:text-[28px] md:text-[30px] lg:text-[30px] xl:text-[32px] leading-snug">
            Maydi Zefanya Sirait
          </h1>

          {/* Line + Label */}
          <div className="flex items-center gap-4 mt-1">
            <h4 className="text-sm sm:text-base md:text-xl lg:text-[18px] italic whitespace-nowrap">
              Putri tunggal dari Pasangan
            </h4>
            <div className="flex-grow border-t border-white opacity-60 ms-3" />
          </div>

          {/* Parent Names */}
          <div className="flex flex-col gap-1 mt-1 text-justify sm:pr-6">
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Manaon Damianus Sirait
            </p>
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px]">
              Erna Margaretha
            </p>
          </div>

          {/* Button */}
          <div className="w-1/5">
            <button
              onClick={navigateToLinkInstagram2}
              className="text-sm sm:text-base md:text-md lg:text-md xl:text-md 2xl:text-lg font-lora mt-1 pb-1 px-3 py-[2px] rounded-3xl bg-[#E9E1D2] text-black hover:bg-gray-600 hover:text-white transition"
            >
              @fransiscamaydi
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
          <Image
            src="/img/bang_putra/putra_5.webp"
            alt="Putra 5 Background"
            fill
            className="object-cover object-[55%_center]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58.333vw, 66.667vw"
          />
        </div>
      </div>

      {/* Content 5 */}
      <div
        className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center sm:justify-center relative right-container-photo-config scroll-item"
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
          <h1 className="text-[24px] sm:text-[24px] md:text-[35px] lg:text-[30px] xl:text-[32px] 2xl:text-[28px] leading-snug">
            THE JOURNEY OF <br /> TWO SOULS IN LOVE
          </h1>

          {/* Journey Paragraph Blocks */}
          {journey.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col w-full gap-1 md:gap-2 xl:gap-4"
            >
              <p className="text-sm md:text-[20px] lg:text-[15px] xl:text-[15px] 2xl:text-[18px] mb-0 tracking-normal">
                {item.date}
              </p>
              <p className="text-sm md:text-[20px] lg:text-[15px] xl:text-[15px] 2xl:text-[18px] tracking-normal text-justify 2xl:leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          <div className="absolute inset-0 z-10"></div>

          <div className="absolute inset-0 scale-x-[-1]">
            <Image
              src="/img/bang_putra/putra_6.webp"
              alt="Putra 6 Background"
              fill
              className="object-cover object-[55%_center]"
              sizes="100vw"
            />
          </div>
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
            <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-5 2xl:lg:gap-12 max-w-screen-md text-center">
              {/* Top Section */}
              <div className="w-full flex flex-col items-center gap-1 sm:gap-2 md:gap-4 lg:gap-2">
                <Image
                  src="/assets/bouqet.svg"
                  width={32}
                  height={32}
                  className="w-10 h-auto scale-x-125 invert"
                  alt="logo"
                />
                <h1 className="text-[13px] sm:text-lg md:text-lg lg:text-md xl:text-sm 2xl:text-md font-joan my-3 mb-1 md:mb-0 lg:my-1 lg:mb-0">
                  SAVE OUR DATE
                </h1>
                <h1 className="text-[22px] sm:text-xl md:text-[38px] lg:text-2xl xl:text-xl 2xl:text-2xl">
                  SABTU
                </h1>
                <h1 className="text-[22px] sm:text-xl md:text-[38px] lg:text-2xl xl:text-xl 2xl:text-2xl">
                  21 JUNI 2025
                </h1>
              </div>

              {/* Ceremony Section */}
              <div className="w-full flex flex-col gap-1 md:gap-3 xl:gap-3">
                <div className="flex flex-col gap-1 md:gap-3 xl:gap-2 2xl:gap-3">
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl xl:text-xl 2xl:text-2xl">
                    Pemberkatan Gereja
                  </h1>
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl xl:text-xl 2xl:text-2xl">
                    08:00 - 10:00 WIB
                  </h1>
                </div>
                <p className="text-sm sm:text-base md:text-[18px] lg:text-[15px] xl:text-[13px] 2xl:text-[15px] whitespace-pre-line">
                  Gereja Katolik Paroki Keluarga Kudus Cibinong
                  {"\n"}Jl. Raya Tapos No.31, Ciriung, Kec. Cibinong,
                  {"\n"}Bogor, Jawa Barat
                </p>

                <div className="flex w-full justify-center mt-2 md:mt-0">
                  <button
                    onClick={navigateToLink1}
                    className="lg:h-[2.8rem] xl:h-[2rem] 2xl:h-[2.3rem] px-3 md:px-4 xl:px-3 py-2 xl:py-0 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
                  >
                    <p className="text-[14px] sm:text-[17px] md:text-[18px] lg:text-sm 2xl:text-md tracking-normal">
                      Google Map
                    </p>
                  </button>
                </div>
              </div>

              {/* Reception Section */}
              <div className="w-full flex flex-col gap-1 md:gap-3 xl:gap-3">
                <div className="flex flex-col gap-1 md:gap-3 xl:gap-2 2xl:gap-3">
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl xl:text-xl 2xl:text-2xl">
                    Resepsi Adat
                  </h1>
                  <h1 className="text-[22px] sm:text-xl md:text-3xl lg:text-2xl xl:text-xl 2xl:text-2xl">
                    12:00 - 17:00 WIB
                  </h1>
                </div>
                <p className="text-sm sm:text-base md:text-[18px] lg:text-[15px] xl:text-[13px] 2xl:text-[15px] whitespace-pre-line">
                  Balai Pertemuan Umum Sahala Martua
                  {"\n"}Jl. Raya Kemang No. 112-115, Kec. Kemang,
                  {"\n"}Bogor, Jawa Barat
                </p>

                <div className="flex w-full justify-center mt-2 md:mt-0">
                  <button
                    onClick={navigateToLink2}
                    className="lg:h-[2.8rem] xl:h-[2rem] 2xl:h-[2.3rem] px-3 md:px-4 xl:px-3 py-2 xl:py-0 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
                  >
                    <p className="text-[14px] sm:text-[17px] md:text-[18px] lg:text-sm 2xl:text-md tracking-normal">
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
          <div className="absolute inset-0 scale-x-[-1]">
            <Image
              src="/img/bang_putra/putra_7.webp"
              alt="Putra 7 Background"
              fill
              className="object-cover object-[55%_center]"
              sizes="100vw"
            />
          </div>
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
          className={`relative z-20 px-5 py-3 flex flex-col md:bottom-[70%] lg:bottom-14 xl:bottom-7 2xl:bottom-14 gap-0 items-center justify-start text-[#fff] text-center marker: ${
            visibilityStates[6] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex w-full py-3 justify-center gap-5">
            <h1 className="text-2xl md:text-[32px] lg:text-[28px] xl:text-[28px] 2xl:text-[32px] md:text-[#3A3A30] lg:text-white">
              MENUJU HARI SPESIAL
            </h1>
          </div>

          {/* Countdown Component */}
          <CelebrationCountdown2 />

          <div className="flex w-full justify-center">
            <button
              onClick={downloadICS}
              className="lg:h-[2.4rem] px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
            >
              <p className="text-[14px] md:text-[18px] sm:text-[17px] lg:text-lg xl:text-sm 2xl:text-lg tracking-normal">
                Catat Tanggal
              </p>
            </button>
          </div>
        </div>

        {/* Fading Photos */}
        <div className="absolute inset-0 transition-opacity duration-1000">
          {/* Black overlay for fading effect */}
          <div className="absolute inset-0 opacity-60 z-10"></div>
          {/* Background image with scale, flip, and translate effects */}
          <div
            className="absolute inset-0"
            style={{
              transform: "scale(1.2) scaleX(-1) translateY(-3%)",
              transformOrigin: "center center",
            }}
          >
            <Image
              src="/img/bang_putra/putra_8.webp"
              alt="Putra 8 Background"
              fill
              className="object-cover object-[65%_top]"
              sizes="100vw"
            />
          </div>
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
          <div className="absolute inset-0 z-0">
            <Image
              src="/img/bang_putra/putra_9.webp"
              alt="Putra 9"
              sizes="(max-width: 768px) 130vw, 100vw" // Scale hint for mobile
              fill
              style={{
                objectFit: "cover",
                objectPosition: "40% center",
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Content 9 */}
      <div
        className={`p-9 flex flex-col items-center justify-start relative scroll-item scroll-item-list hide-scrollbar ${
          isOpenedList ? "overflow-y-scroll" : "overflow-hidden"
        }`}
        style={{ height: coverHeight }}
      >
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
            <RsvpList2
              isOpenedList={isOpenedList}
              fetchRsvps={fetchRsvps}
              rsvps={rsvps}
              loading={loading}
            />
          </div>

          <div
            className={`h-full flex flex-col justify-end ${
              !isOpenedList ? " mb-14" : "mb-8"
            }`}
          >
            <div className="relative z-30 w-full flex justify-center items-center gap-4 mt-4">
              <button
                onClick={
                  !isOpenedList
                    ? () => setIsOpenedList((prev) => !prev)
                    : handleNextPageClick
                }
                className="lg:h-[2.4rem] px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
              >
                <p className="tracking-normal">
                  {!isOpenedList ? "Muat Lebih Banyak" : "Halaman Selanjutnya"}
                </p>
              </button>

              <button
                onClick={fetchRsvps}
                className="lg:h-[2.4rem] px-4 py-2 rounded-md font-italiana bg-[#5A5A50] text-white hover:bg-[#2e2e25] transition"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  </div>
                ) : (
                  <p className="tracking-normal">Refresh</p>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <Image
              src="/img/bang_putra/putra_10.webp"
              alt="Putra 10"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "55% center",
              }}
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black opacity-60"></div>
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
            <h1 className="text-[28px] md:text-3xl lg:text-[30px] xl:text-[32px]">
              DRESS CODE
            </h1>
            <p className="text-sm sm:text-base md:text-xl lg:text-[18px] xl:text-[15px] 2xl:text-[18px] text-center tracking-wider">
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

          <div className="absolute inset-0">
            <Image
              src="/img/bang_putra/putra_11.webp"
              alt="Putra 11"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "55% center",
              }}
              priority
            />
          </div>
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
              <p className="text-sm sm:text-base md:text-xl lg:text-[18px] xl:text-[15px] 2xl:text-[18px] leading-relaxed tracking-normal">
                Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan
                tanda cinta kepada kedua mempelai, Anda dapat memberikan melalui
                nomor rekening berikut:
              </p>
            </div>

            <BankAccountCard
              name="Putra S P Sihombing"
              bankName="Bank BCA"
              accountNumber="7720429831"
              copyToClipboard={copyToClipboard}
            />
            <BankAccountCard
              name="Maydi Zefanya Sirait"
              bankName="Bank BCA"
              accountNumber="6485284129"
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

          <div className="absolute inset-0">
            <Image
              src="/img/bang_putra/putra_12.webp"
              alt="Putra 12"
              fill
              quality={100}
              sizes="(max-width: 768px) 150vw, (max-width: 1024px) 120vw, 100vw"
              style={{
                objectFit: "cover",
                objectPosition: "40% center",
              }}
              priority // or use loading="lazy" if not above the fold
            />
          </div>
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
          className={`relative w-full h-full`} // Make sure the container is relative
        >
          <div
            className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 ps-lg-16 px-0 pt-9 pb-5 items-center justify-start text-white text-start ${
              visibilityStates[11] ? "fade-in" : "fade-out"
            }`}
            style={{
              backgroundColor: "rgba(255, 255, 255)",
            }}
          >
            <div className="flex flex-col h-full text-[#414833] items-center gap-2 text-center px-4">
              <div className="w-full h-full flex flex-col">
                <div className="flex flex-col lg:gap-10 xl:gap-7 lg:mb-10 xl:mb-8">
                  <h1
                    className={`text-[15px] md:text-base lg:text-[40px] xl:text-[32px] tracking-normal mr-lg-[6.8rem]`}
                  >
                    Gallery
                  </h1>
                  <h1
                    className={`text-[28px] md:text-base lg:text-[40px] xl:text-[32px] tracking-normal mb-1`}
                  >
                    Putra & Maydi
                  </h1>
                </div>
                <div className="hide-scrollbar overflow-y-auto h-full">
                  {" "}
                  {/* Set a max height for scrolling */}
                  <ImageGallery
                    photosGallery={photosGallery}
                    name="Putra & Maydi"
                  />
                </div>
              </div>
            </div>
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

          <div className="absolute inset-0">
            <Image
              src="/img/bang_putra/putra_13.webp"
              alt="Putra 13"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "40% center",
              }}
              priority // You can change this to loading="lazy" if it's not critical for above-the-fold
            />
          </div>
        </div>
      </div>

      {/* Content 13 */}
      <div
        className="p-9 flex flex-col items-center justify-end relative right-container-photo-config scroll-item"
        style={{ height: coverHeight }} // Set dynamic height
      >
        {/* Title Container */}
        <div
          ref={(el) => (contentRefs.current[12] = el)}
          className={`relative w-full z-20 px-5 py-3 flex flex-col gap-0 lg:bottom-10 items-center justify-start text-[#fff] text-center ${
            visibilityStates[12] ? "fade-in" : "fade-out"
          }`}
        >
          <div className="flex flex-col w-full py-3 gap-7">
            <h1 className="text-[20px] md:text-[40px] md:text-5xl lg:text-[32px]">
              Terima Kasih Atas Kedatangan Dan Doa Restunya
            </h1>
            <p className="text-[14px] md:text-base lg:[16px] xl:text-[15px] 2xl:text-[16px] tracking-widest">
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

          <div className="absolute inset-0">
            <Image
              src="/img/bang_putra/putra_13.webp"
              alt="Putra 13"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "40% center",
              }}
              priority // You can change this to loading="lazy" if it's not critical for above-the-fold
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
