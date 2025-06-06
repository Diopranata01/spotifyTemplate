import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import * as XLSX from "xlsx";

const AttendanceListPutra = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState("invitation1"); // Default session

  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true);
      try {
        const guestCollection = collection(db, "rsvp_2");
        const guestSnapshot = await getDocs(guestCollection);
        const guestData = guestSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuests(guestData);
      } catch (error) {
        console.error("Error fetching guests: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const handleDownload = () => {
    setLoading(true);

    if (guests.length === 0) return alert("No guests found");
    const formattedData = guests.map((guest) => ({
      Name: guest.formName,
      "Guest Count": guest.guestCount,
      "Place of Attendance": guest.attendance || "Not Specified",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");

    XLSX.writeFile(workbook, "attendance_list.xlsx");

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Filter guests based on the selected session
//   const filteredGuests = guests.filter((guest) => {
//     return guest.receptionPath && guest.receptionPath.includes(selectedSession);
//   });

  // Calculate total attendance for filtered guests
  const totalAttendance = guests.reduce((total, guest) => {
    return total + (guest.attendance ? guest.guestCount : 0);
  }, 0);

  return (
    <div className="mx-auto w-screen h-screen p-4 flex flex-col items-center gap-5 bg-white">
      <p className="text-3xl font-bold my-4 text-black">
        Wedding Invitation List
      </p>

      {/* Session Selection */}
      <div className="mb-4 flex gap-2">
        <button
          className={`p-2 rounded-lg ${
            selectedSession === "invitation1"
              ? "bg-gray-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setSelectedSession("invitation1")}
        >
          Session 1
        </button>
        <button
          className={`p-2 rounded-lg ${
            selectedSession === "invitation2"
              ? "bg-gray-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setSelectedSession("invitation2")}
        >
          Session 2
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-300 rounded-lg">
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="min-w-full bg-white table-auto">
                <thead className="bg-gray-200 sticky top-0">
                  <tr className="text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-1/2">Guest Name</th>
                    <th className="py-3 px-6 text-center w-1/2">
                      Guest Number
                    </th>
                    <th className="py-3 px-6 text-left w-1/2">Attendance</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="py-3 px-6 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : guests.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-3 px-6 text-center">
                        No Data for Selected Session
                      </td>
                    </tr>
                  ) : (
                    guests.map((guest) => (
                      <tr
                        key={guest.id}
                        className="border-b border-gray-300 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-center font-semibold">
                          {guest.formName}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {guest.guestCount > 0 ? (
                            <span className="text-green-500 font-semibold">
                              {guest.guestCount}
                            </span>
                          ) : (
                            <span className="text-red-500 font-semibold">
                              0
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          {guest.attendance !== "" ? (
                            <span className="text-green-500 font-semibold">
                              Attended
                            </span>
                          ) : (
                            <span className="text-red-500 font-semibold">
                              Not Attended
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="font-bold text-black">
                    <td className="py-3 px-6 text-start" colSpan="2">
                      Total Attended:
                    </td>
                    <td className="py-3 px-6 text-center">{totalAttendance}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <button
        className="text-white p-2 rounded-lg bg-green-500 hover:bg-green-600 hover:text-white relative"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? <span className="loader "></span> : "Download Data"}
      </button>
    </div>
  );
};

export default AttendanceListPutra;
