import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome
import Image from "next/image";

const ImageGallery = ({ photosGallery, name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    setIsLoading(true); // Set loading to true when opening modal

    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 3 seconds
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosGallery.length);
    // setIsLoading(true); // Set loading to true when changing image

    // Simulate loading for 3 seconds
    // setTimeout(() => {
    //   setIsLoading(false); // Set loading to false after 3 seconds
    // }, 3000);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + photosGallery.length) % photosGallery.length
    );
    // setIsLoading(true); // Set loading to true when changing image

    // Simulate loading for 3 seconds
    // setTimeout(() => {
    //   setIsLoading(false); // Set loading to false after 3 seconds
    // }, 3000);
  };

  return (
    <div>
      {/* Image Squares */}
      <div className="w-full flex flex-wrap justify-center gap-1 mt-2 overflow-y-auto ">
        {photosGallery.map((photo, index) => (
          <div key={index} className="w-1/4 md:w-1/3 lg:w-1/4">
            <div
              className="bg-gray-200 h-28 w-full relative rounded-none cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => openModal(index)} // Open modal on click
            >
              <Image
                src={photo}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full"
                width={300}
                height={300}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
          isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          pointerEvents: isModalOpen ? "auto" : "none",
        }}
      >
        <div
          className={`bg-white rounded-lg m-4 transform transition-transform duration-300 ease-in-out ${
            isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <button
            className="absolute right-5 text-gray-500 hover:text-gray-800 text-[45px]"
            onClick={closeModal}
          >
            &times;
          </button>

          {/* Image area */}
          <div className="flex h-[70vh] w-[90vw] md:w-auto rounded-t-lg justify-center items-center overflow-auto hide-scrollbar">
            {isLoading ? (
              <div className="absolute flex items-center justify-center w-full h-full">
                <div className="loader"></div> {/* Spinner */}
              </div>
            ) : (
              <Image
                src={photosGallery[currentIndex]}
                alt="Selected"
                className="object-contain" // Maintain aspect ratio
                width={600}
                height={600}
              />
            )}
          </div>

          {/* Title with arrows — Always shown, even while loading */}
          <div className="flex items-center justify-center gap-6 my-6 px-6">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={prevImage}
              disabled={photosGallery.length <= 1}
            >
              <i className="fa fa-chevron-left fa-lg" />
            </button>

            <h1 className="text-[26px] md:text-base lg:text-[32px] tracking-wider text-center">
              {name ? name : "Rangga & Novella"}
            </h1>

            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={nextImage}
              disabled={photosGallery.length <= 1}
            >
              <i className="fa fa-chevron-right fa-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
