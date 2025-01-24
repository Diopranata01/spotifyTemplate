// import { useEffect, useState, useRef } from "react";
// import CelebrationCountdown from "./celebrationCountdown";
// import DressCodeColorGuide from "./dresscodeColorGuide";
// import ImageGallery from "./imageGallery";

// const PhotoContainer = () => {
//   const [isScrollable, setIsScrollable] = useState(false);
//   const [visibilityStates, setVisibilityStates] = useState([]);
//   const contentRefs = useRef([]);
//   const lastScrollY = useRef(0); // Track last scroll position
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//   const photos = [
//     "/img/final_image/slide_photo_1.jpg",
//     "/img/final_image/slide_photo_2.jpg",
//     "/img/final_image/slide_photo_3.jpg",
//     "/img/final_image/slide_photo_4.jpg",
//     "/img/final_image/slide_photo_5.jpg",
//     "/img/final_image/slide_photo_6.jpg",
//   ];
//   const photosGallery = [
//     "/img/hitam-putih/hitam_putih1.jpg",
//     "/img/hitam-putih/hitam_putih2.jpg",
//     "/img/hitam-putih/hitam_putih3.jpg",
//     "/img/adat/main_photo.jpg",
//     "/img/adat/main_photo_10.jpg",
//     "/img/adat/main_photo_11.jpg",
//     "/img/adat/main_photo_5.jpg",
//     "/img/adat/main_photo_3.jpg",
//     "/img/adat/main_photo_2.jpg",
//   ];

//   const toggleScrollable = () => {
//     setIsScrollable((prev) => !prev);
//   };

//   // Effect to manage body scroll
//   useEffect(() => {
//     document.body.style.overflow = isScrollable ? "hidden" : "auto"; // Toggle body scroll
//   }, [isScrollable]);

//   // Effect to change photos
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
//     }, 3000); // Change photo every 5 seconds

//     return () => clearInterval(interval);
//   }, [photos.length]);

//   // Function to open Google Maps
//   const navigateToLink1 = () => {
//     window.open("https://maps.app.goo.gl/kB5ShMszJ8nuDxQw5", "_blank");
//   };

//   const navigateToLink2 = () => {
//     window.open("https://maps.app.goo.gl/KcJm7RhHdUpz41VCA", "_blank");
//   };

//   // Effect to manage Intersection Observer for multiple content sections
//   useEffect(() => {
//     const observers = contentRefs.current.map((ref, index) => {
//       const observer = new IntersectionObserver(
//         ([entry]) => {
//           setVisibilityStates((prev) => {
//             const newStates = [...prev];
//             newStates[index] = entry.isIntersecting;
//             return newStates;
//           });
//         },
//         { threshold: 0.1 }
//       );

//       if (ref) {
//         observer.observe(ref);
//       }

//       return observer;
//     });

//     return () => {
//       observers.forEach((observer, index) => {
//         if (contentRefs.current[index]) {
//           observer.unobserve(contentRefs.current[index]);
//         }
//       });
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       lastScrollY.current = window.scrollY; // Update last scroll position
//     };

//     window.addEventListener("scroll", handleScroll); // Listen for scroll events

//     return () => {
//       window.removeEventListener("scroll", handleScroll); // Cleanup event listener
//     };
//   }, []);

//   return (
//     <div
//       className={`w-full lg:w-5/12 xl:w-1/3 right-container ${
//         isScrollable
//           ? "overflow-y-auto hide-scrollbar scroll-container"
//           : "overflow-hidden"
//       }`}
//     >

//       {/* Content 1 */}
//       <div
//         className={`p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item`}
//       >
//         {/* Title Container */}
//         <div className="relative z-20 flex flex-col gap-4 mt-20 items-center justify-center text-white text-center">
//           <h5 className="text-sm md:text-base lg:text-base tracking-wider">
//             THE WEDDING OF
//           </h5>
//           <h1 className="text-3xl md:text-5xl lg:text-4xl font-semibold">
//             Rangga & Novela
//           </h1>
//           <p className="text-sm md:text-base lg:text-base mt-3 tracking-wider">
//             Saturday, 15th December, 2025
//           </p>
//         </div>

//         {/* Description and Arrow Container */}
//         <div
//           className={`relative flex flex-col items-center mb-20 ${
//             isScrollable ? "mb-20" : "mb-14"
//           }`}
//         >
//           {/* Description Container */}
//           <div
//             className={`relative z-20 flex-col gap-4 items-center justify-center text-white text-center ${
//               isScrollable ? "opacity-0" : "opacity-100"
//             }`}
//           >
//             <p className="text-sm md:text-base lg:text-lg">Dear,</p>
//             <p className="text-sm md:text-base lg:text-2xl font-semibold">
//               Mr. Example
//             </p>
//             <p className="text-[12px] mt-3">
//               We apologize if there is any misspelling of name or title
//             </p>
//             {/* Button to Toggle Scrollable */}
//             <button
//               onClick={toggleScrollable}
//               className="mt-5 px-4 py-2 bg-white text-black hover:bg-gray-600 hover:text-white transition"
//             >
//               {isScrollable ? "Let's Close" : "Let's Open"}
//             </button>
//           </div>

//           {/* Arrow Icon */}
//           <div
//             className={`absolute z-20 transition-opacity duration-1000 ${
//               isScrollable ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className={`h-8 w-8 ${isScrollable ? "rotate-180" : ""}`}
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 9l-7 7-7-7"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
//           {photos.map((photo, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
//                 index === currentPhotoIndex ? "opacity-100" : "opacity-0"
//               }`}
//               style={{ backgroundImage: `url(${photo})` }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Content 2 */}
//       <div
//         className={`p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item`}
//       >
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[0] = el)}
//           className={`absolute z-20 top-20 right-0 w-2/3 flex flex-col gap-2 gap-md-4 mt-sm-14 mt-md-24 ps-4 ps-md-3 pe-1 pe-md-0 items-start justify-start text-white text-start ${
//             visibilityStates[0] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <div className="flex w-full gap-2">
//             <h3 className="text-2xl md:text-5xl lg:text-4xl font-semibold">
//               Matius
//             </h3>
//             <h4 className="text-2xl md:text-5xl lg:text-4xl font-semibold">
//               19 : 6
//             </h4>
//           </div>
//           <p className="text-[14px] md:text-base lg:text-base tracking-wider">
//             Demikian mereka bukan lagi dua, melainkan satu. Karena itu, apa yang
//             telah dipersatukan Allah, tidak boleh diceraikan manusia.
//           </p>
//           <div className="mt-4 ">
//             <img
//               src="/assets/logo_name_2.svg"
//               alt=""
//               height={100}
//               width={100}
//             />
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/hitam-putih/hitam_putih3.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 3 */}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[1] = el)}
//           className={`absolute z-20 bottom-20 right-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-end text-white text-start ${
//             visibilityStates[1] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <p
//             className={`text-[14px] md:text-base lg:text-base tracking-wider mb-2`}
//           >
//             The Groom
//           </p>
//           <h1 className={`text-2xl md:text-5xl lg:text-4xl font-semibold`}>
//             Rangga Diprana
//           </h1>
//           <div className="w-full flex items-center mt-4">
//             <h4
//               className={`w-1/3 text-base md:text-base lg:text-base tracking-wider me-0 mt-md-5`}
//             >
//               The first son of
//             </h4>
//             <div className="w-2/3 pl-3 flex flex-col items-center">
//               {/* Horizontal line with minimum width */}
//               <div className="w-full">
//                 <div className="flex-grow border border-white"></div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col w-full">
//             <div className="flex items-center w-full gap-2">
//               <p
//                 className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//               >
//                 Hendy Kunarjanto
//               </p>
//               <div className="font-and">&</div>
//             </div>
//             <p
//               className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//             >
//               Kadek Ira Prana Dewi
//             </p>
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/hitam-putih/hitam_putih5.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 4 */}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[2] = el)}
//           className={`absolute z-20 bottom-20 right-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-end text-white text-start ${
//             visibilityStates[2] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <p
//             className={`text-[14px] md:text-base lg:text-base tracking-wider mb-2`}
//           >
//             The Bride
//           </p>
//           <h1 className={`text-2xl md:text-5xl lg:text-4xl font-semibold`}>
//             Novela Asri
//           </h1>
//           <div className="flex items-center mt-1 w-full">
//             <p
//               className={`text-[14px] md:text-base lg:text-base tracking-wider me-2 mt-2 mt-md-5`}
//             >
//               The First Daughter Of
//             </p>
//             <div className="flex flex-col items-center">
//               {/* <h3
//                 className={`text-[14px] text-sm-xl md:text-5xl lg:text-xl font-semibold mb-1 mb-sm-3`}
//               >
//                 Robinsar Sihombing
//               </h3> */}

//               <div className="flex flex-col w-full">
//                 <div className="flex items-center w-full gap-2">
//                   <p
//                     className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//                   >
//                     Hendy Kunarjanto
//                   </p>
//                   <div className="font-and">&</div>
//                 </div>
//                 <p
//                   className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//                 >
//                   Kadek Ira Prana Dewi
//                 </p>
//               </div>
//               {/* Horizontal line with minimum width */}
//               <div className="w-full">
//                 <div className="flex-grow border border-white"></div>
//               </div>
//             </div>
//           </div>
//           <p
//             className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mt-2 mr-lg-[6.8rem]`}
//           >
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//             Reprehenderit sequi aliquam ullam cupiditate amet
//           </p>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/hitam-putih/hitam_putih6.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 5 */}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[3] = el)}
//           className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-center text-white text-start ${
//             visibilityStates[3] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <div className="flex flex-col align-center gap-4">
//             <h1 className={`text-2xl md:text-5xl lg:text-4xl font-semibold`}>
//               A Jurney In Love
//             </h1>

//             <div className="w-full flex flex-col gap-3">
//               <h4
//                 className={`text-[18px] md:text-base lg:text-base tracking-wider me-2 mt-2 mt-md-5`}
//               >
//                 September 2019
//               </h4>
//               <p
//                 className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//               >
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Molestias, architecto consequatur? Hic modi nemo blanditiis
//                 veniam fugiat labore deleniti eligendi ad? Laboriosam soluta ex
//                 exercitationem,
//               </p>
//             </div>

//             <div className="w-full flex flex-col gap-3">
//               <h4
//                 className={`text-[18px] md:text-base lg:text-base tracking-wider me-2 mt-2 mt-md-5`}
//               >
//                 September 2020
//               </h4>
//               <p
//                 className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//               >
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Molestias, architecto consequatur? Hic modi nemo blanditiis
//                 veniam fugiat labore deleniti eligendi ad? Laboriosam soluta ex
//                 exercitationem,
//               </p>
//             </div>

//             <div className="w-full flex flex-col gap-3">
//               <h4
//                 className={`text-[18px] md:text-base lg:text-base tracking-wider me-2 mt-2 mt-md-5`}
//               >
//                 September 2023
//               </h4>
//               <p
//                 className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//               >
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Molestias, architecto consequatur? Hic modi nemo blanditiis
//                 veniam fugiat labore deleniti eligendi ad? Laboriosam soluta ex
//                 exercitationem,
//               </p>
//             </div>
//           </div>

//           <div className="w-full flex justify-between items-center">
//             {/* Horizontal line with minimum width */}
//             <div className="w-full mr-5">
//               <div className="flex-grow border border-white"></div>
//             </div>
//             <img
//               src="/assets/logo_name_2.svg"
//               alt=""
//               height={100}
//               width={100}
//             />
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/adat/main_photo_6.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 6 */}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[4] = el)}
//           className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-center text-white text-start ${
//             visibilityStates[4] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <div className="flex flex-col align-center gap-4 mx-12 text-center">
//             <div className="title-container">
//               <p
//                 className={`text-[12px] md:text-base lg:text-[13px] tracking-wider uppercase`}
//               >
//                 save our date
//               </p>
//               <h4 className={`text-2xl md:text-5xl lg:text-4xl font-bold`}>
//                 Wednesday <br />
//                 05 February 2025
//               </h4>
//             </div>

//             <div className="w-full flex flex-col gap-3">
//               <div className="flex flex-col">
//                 <h4
//                   className={`text-xl font-semibold uppercase md:text-base lg:text-base tracking-wider me-2 mt-2 mt-md-5`}
//                 >
//                   Holy Matrimony
//                 </h4>
//                 <p className="text-[16px] font-semibold">10:30 - 12:00</p>
//               </div>
//               <div className="flex flex-col">
//                 <p
//                   className={`text-[14px] md:text-base lg:text-[13px] tracking-wider mr-lg-[6.8rem] font-semibold`}
//                 >
//                   St. Francis Xavier Catholic Church <br />
//                 </p>
//                 <p
//                   className={`text-[14px] md:text-base lg:text-[13px] tracking-wider mr-lg-[6.8rem]`}
//                 >
//                   Jl. Kartika Plaza No.107, Kuta, Kec. Kuta, Kabupaten Badung
//                   Bali
//                 </p>
//               </div>
//               <button
//                 onClick={navigateToLink1}
//                 className="my-1 mx-14 px-2 py-2 bg-white text-black text-sm hover:bg-gray-600 hover:text-white transition"
//               >
//                 Google Maps
//               </button>
//             </div>

//             <div className="w-full flex flex-col gap-3">
//               <div className="flex flex-col">
//                 <h4
//                   className={`text-xl font-semibold uppercase md:text-base lg:text-base tracking-wider me-2 mt-2 mt-md-5`}
//                 >
//                   Wedding Reception
//                 </h4>
//                 <p className="text-[16px] font-semibold">15:00 - 18:00</p>
//               </div>
//               <div className="flex flex-col">
//                 <p
//                   className={`text-[14px] md:text-base lg:text-[13px] tracking-wider mr-lg-[6.8rem] font-semibold`}
//                 >
//                   Riverside Convention Center <br />
//                 </p>
//                 <p
//                   className={`text-[14px] md:text-base lg:text-[13px] tracking-wider mr-lg-[6.8rem]`}
//                 >
//                   Jl. Gn Catur IV, No.8, Padangsambian Kaja, Kec. Denpasar
//                   Barat, Denpasar, Bali
//                 </p>
//               </div>
//               <button
//                 onClick={navigateToLink1}
//                 className="my-1 mx-14 px-2 py-2 bg-white text-black text-sm hover:bg-gray-600 hover:text-white transition"
//               >
//                 Google Maps
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/adat/main_photo_1.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 7 */}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[5] = el)}
//           className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-center text-white text-start ${
//             visibilityStates[5] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <div className="flex flex-col align-center gap-4">
//             <h1
//               className={`text-2xl md:text-5xl lg:text-4xl font-semibold leading-9`}
//             >
//               Almost Time For Our Celebration
//             </h1>
//           </div>

//           <div className="w-full flex justify-between items-center">
//             {/* Horizontal line with minimum width */}
//             <div className="w-full mr-5">
//               <div className="flex-grow border border-white"></div>
//             </div>
//             <img
//               src="/assets/logo_name_2.svg"
//               alt=""
//               height={100}
//               width={100}
//             />
//           </div>
//           {/* Countdown Component */}
//           <CelebrationCountdown />
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/adat/main_photo_8.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 8 */}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[6] = el)}
//           className={`absolute z-20 right-0 top-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-0 items-start justify-center text-white text-start ${
//             visibilityStates[6] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <div className="flex flex-col align-center gap-4 mx-16 text-center">
//             <div className="w-full flex flex-col gap-7">
//               <h3
//                 className={`text-xl font-semibold md:text-base lg:text-base tracking-wider me-2 mt-2 mt-md-5`}
//               >
//                 A Guide To Dresscodes
//               </h3>
//               <p
//                 className={`text-[13px] md:text-base lg:text-[13px] tracking-wider mr-lg-[6.8rem]`}
//               >
//                 We kindly encourage our guests to wear these colors for our
//                 special day
//               </p>
//               <DressCodeColorGuide />
//             </div>
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/adat/main_photo_9.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 9 */}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[7] = el)}
//           className={`absolute z-20 bottom-16 right-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-end text-white text-start ${
//             visibilityStates[7] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <h1 className={`text-2xl md:text-5xl lg:text-4xl font-semibold`}>
//             The Wedding Gift
//           </h1>
//           <p
//             className={`text-[13px] md:text-base lg:text-[13px] text-justify tracking-wider mt-2 mr-lg-[6.8rem]`}
//           >
//             For those of you who want to give a token of love to the bride and
//             groom, you can use the account number below:
//           </p>
//           <div className="w-full flex gap-3 flex-col justify-center items-center text-[12px]">
//             <div className="w-full border border-x-0 border-t-0">
//               <p>Mandiri</p>
//               <p>52738236723</p>
//               <p>Rangga Diprana</p>
//             </div>
//             <div className="w-full border border-x-0 border-t-0">
//               <p>Mandiri</p>
//               <p>52738236723</p>
//               <p>Rangga Diprana</p>
//             </div>
//             <div className="w-full border border-x-0 border-t-0">
//               <p>Mandiri</p>
//               <p>52738236723</p>
//               <p>Rangga Diprana</p>
//             </div>
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/adat/main_photo_13.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 10*/}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[8] = el)}
//           className={`absolute z-20 top-32 right-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-start text-white text-center ${
//             visibilityStates[8] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <h1 className={`text-2xl md:text-5xl lg:text-4xl font-semibold`}>
//             Our Pre-wedding Celebration
//           </h1>
//           <div className="flex w-full justify-center">
//             <div className="flex gap-2 mr-2">
//               <p
//                 className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//               >
//                 Rangga Diprana
//               </p>
//               <div className="text-[13px] font-and">&</div>
//             </div>
//             <p
//               className={`text-[14px] md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem]`}
//             >
//               Novela
//             </p>
//           </div>
//           <ImageGallery photosGallery={photosGallery} />
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/adat/main_photo_11.jpg")',
//             }}
//           />
//         </div>
//       </div>

//       {/* Content 11*/}
//       <div className="p-8 flex flex-col items-center justify-between relative right-container-photo-config scroll-item">
//         {/* Title Container */}
//         <div
//           ref={(el) => (contentRefs.current[9] = el)}
//           className={`absolute z-20 bottom-36 right-0 w-full h-full flex flex-col gap-4 gap-md-4 ps-lg-16 px-6 items-start justify-end text-white text-center ${
//             visibilityStates[9] ? "fade-in" : "fade-out"
//           }`}
//         >
//           <h1 className={`text-2xl md:text-5xl lg:text-4xl font-semibold`}>
//             Thank You For Your Attendance
//           </h1>
//           <div className="flex w-full flex-col gap-4 mt-5 justify-center">
//             <div className="flex gap-2 mr-2">
//               <p
//                 className={`text-[14px] md:text-base lg:text-[13px] text-center tracking-wider mr-lg-[6.8rem]`}
//               >
//                 It is a pleasure and honor for us, if you are willing to attend
//                 and give us your blessing.
//               </p>
//             </div>
//             <div className="flex w-full justify-center">
//               <div className="flex gap-2 mr-2">
//                 <p
//                   className={`text-base md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem] font-semibold`}
//                 >
//                   Rangga Diprana
//                 </p>
//                 <div className="text-[15px] font-and font-semibold">&</div>
//               </div>
//               <p
//                 className={`text-base md:text-base lg:text-[13px] text-justify tracking-wider mr-lg-[6.8rem] font-semibold`}
//               >
//                 Novela
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Fading Photos */}
//         <div className="absolute inset-0 transition-opacity duration-1000">
//           {/* Black overlay for fading effect */}
//           <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: 'url("/img/adat/main_photo_7.jpg")',
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoContainer;
