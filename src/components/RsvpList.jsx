import { useEffect, useState } from "react";
import { db } from "../../lib/firebase"; // Adjust the import path as necessary
import { collection, getDocs } from "firebase/firestore";

const RsvpList = () => {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const rsvpCollection = collection(db, "rsvp");
        const rsvpSnapshot = await getDocs(rsvpCollection);
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

  if (loading) {
    return <p>Loading...</p>; // Loading message
  }

  return (
    <>
      <div className="flex flex-col w-full h-[90vh] p-10">
        <p className="text-2xl lg:text-[45px] mb-4 text-white"></p>
        <div className="flex flex-col w-full h-[90vh] overflow-y-auto">
          {rsvps.map((rsvp, index) => (
            <div
              key={rsvp.id}
              className={`komentar-item show w-full flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
              id={`komentar-${rsvp.id}`}
            >
              <div
                className={`p-4 py-2 m-2 bg-transparent text-[white] rounded-lg max-w-md ${
                  index % 2 === 0 ? "text-start" : "text-end w-[250px]"
                }`}
              >
                <p className="text-[19px]">{rsvp.name}</p>
                <p className="text-[15px] italic truncate-message">
                  {rsvp.message}
                </p>
                <p>
                  {new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date())}
                </p>{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RsvpList;
