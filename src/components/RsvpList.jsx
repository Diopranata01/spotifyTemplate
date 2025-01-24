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
    <div>
      <p className="text-2xl lg:text-[45px] mb-4 text-white">Harapan</p>
      <div id="komentar-container" style={{ height: "auto" }}>
        {rsvps.map((rsvp) => (
          <div
            key={rsvp.id}
            className="komentar-item show"
            id={`komentar-${rsvp.id}`}
          >
            <strong>{rsvp.name}</strong>
            <p className="">{rsvp.message}</p>
            <small>{new Date().toLocaleDateString()}</small>{" "}
            {/* Replace with actual date if available */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RsvpList;
