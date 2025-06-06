import { useEffect, useState, useRef } from "react";
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
}) => {
  const [isOpenedList, setIsOpenedList] = useState(false);
  const [visibilityStates, setVisibilityStates] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const contentRefs = useRef([]);
  const lastScrollY = useRef(0);
  const [coverHeight, setCoverHeight] = useState("100vh");
  const router = useRouter();
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
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
          <p className="text-[14px] md:text-[20px] lg:text-[20px] xl:text-[16px] tracking-normal text-start">
            &quot;From the beginning of creation, God made them male and female.
            For this reason, a man shall leave his father and mother and be
            united to his wife, and the two shall become one flesh. As a result,
            they are no longer two, but one. Therefore, what God has joined
            together, let no one separate.&quot;
          </p>
        </div>
      </div>

    
    </div>
  );
};

export default MainContainer;
