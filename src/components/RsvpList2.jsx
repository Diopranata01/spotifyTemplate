import { useEffect, useState } from "react";

const RsvpList2 = ({ isOpenedList, fetchRsvps, rsvps, loading }) => {

  useEffect(() => {
    fetchRsvps();
  }, []);

  return (
    <div className="flex flex-col w-full pt-6 gap-4">
      <h1 className="text-[28px] md:text-[32px] lg:text-[32px] text-center lg:mb-5 my-4 mb-5 ps-1 text-white">
        Ucapan & Doa
      </h1>
      <div
        className={`flex flex-col w-full border border-white rounded-md h-[67vh] hide-scrollbar mb-24 ${
          isOpenedList ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          rsvps.map((rsvp, index) => (
            <div
              key={rsvp.id}
              className={`komentar-item show w-full flex p-3 ${
                index % 2 === 0 ? "justify-start ps-2" : "justify-end pe-2"
              }`}
              id={`komentar-${rsvp.id}`}
            >
              <div
                className={`p-4 py-2 m-2 bg-transparent text-[white] rounded-lg max-w-md ${
                  index % 2 === 0
                    ? "text-start w-[300px] ps-1 ms-0"
                    : "text-end w-[300px] pe-1 me-0"
                }`}
              >
                <p className="text-sm sm:text-base md:text-xl lg:text-[16px] xl:text-[15px] 2xl:text-[16px]">{rsvp.formName}</p>
                <p className="text-sm sm:text-base md:text-xl lg:text-[16px] xl:text-[15px] 2xl:text-[16px] italic pb-3">{rsvp.message}</p>
                <p className="text-sm sm:text-sm md:text-lg lg:text-[10px]">
                  {rsvp.submissionDate
                    ? new Intl.DateTimeFormat("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // Use 24-hour format
                      }).format(new Date(rsvp.submissionDate))
                    : "Date not available"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RsvpList2;
