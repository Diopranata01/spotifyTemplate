import { useEffect, useState } from "react";
import { db } from "../../lib/firebase"; // Adjust the import path as necessary
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const RsvpList = ({ isOpenedList }) => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  
  useEffect(() => {
    const fetchRsvps = async () => {
      setLoading(true); // Start loading
      try {
        const rsvpCollection = collection(db, "rsvp");
        const rsvpQuery = query(rsvpCollection, orderBy("submissionDate", "desc")); // Order by submissionDate descending
        const rsvpSnapshot = await getDocs(rsvpQuery);
        const rsvpList = rsvpSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRsvps(rsvpList);
      } catch (error) {
        console.error("Error fetching RSVPs: ", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchRsvps();
  }, []);

  const getTimeAgo = (date) => {
    const now = new Date();
    const submissionDate = new Date(date);
    const diffInMs = now - submissionDate; // Difference in milliseconds
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours

    const minutes = diffInMinutes % 60; // Remaining minutes after hours

    if (diffInHours < 1) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (diffInHours === 1) {
      return minutes === 0 ? "1 hour ago" : `1 hour and ${minutes} minutes ago`;
    } else {
      return `${diffInHours} hours and ${minutes} minutes ago`;
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Loading message
  }

  return (
    <div className="flex flex-col w-full p-10 pt-6">
      <p className="text-2xl lg:text-[40px] my-4 mb-9 ps-1 text-white">
        Ucapan & Doa
      </p>
      <div
        className={`flex flex-col w-full ${
          isOpenedList ? "" : "h-[67vh] mb-24 overflow-hidden"
        }`}
      >
        {rsvps.map((rsvp, index) => (
          <div
            key={rsvp.id}
            className={`komentar-item show w-full flex p-3 ${
              index % 2 === 0 ? "justify-start ps-0" : "justify-end pe-0"
            }`}
            id={`komentar-${rsvp.id}`}
          >
            <div
              className={`p-4 py-2 m-2 bg-transparent text-[white] rounded-lg max-w-md ${
                index % 2 === 0
                  ? "text-start w-[290px] ps-1 ms-0"
                  : "text-end w-[290px] pe-1 me-0"
              }`}
            >
              <p className="text-[20px]">{rsvp.formName}</p>
              <p className="text-[17px] italic pb-5">{rsvp.message}</p>
              <p className="text-[10px]">
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
        ))}
      </div>
    </div>
  );
};

export default RsvpList;
