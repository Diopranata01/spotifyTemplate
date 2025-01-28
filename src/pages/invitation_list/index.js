import { useState, useEffect } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { db } from "../../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Home() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  // Fetch guest data from Firestore
  const fetchGuests = async () => {
    setLoading(true); // Set loading to true when fetching starts
    const collectionRef = collection(db, "guest_list");
    const snapshot = await getDocs(collectionRef);
    const guestList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGuests(guestList);
    setLoading(false); // Set loading to true when fetching starts
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      try {
        const collectionRef = collection(db, "guest_list");
        setLoading(true); // Set loading to true when fetching starts
        for (const item of jsonData) {
          // Check if the 'name' field is present and not empty
          if (item.Name && item.Name.trim() !== "") {
            await addDoc(collectionRef, {
              name: item.Name,
            });
          }
        }
        alert("Data uploaded successfully!");
        fetchGuests(); // Refresh the guest list after upload
      } catch (error) {
        console.error("Error uploading data: ", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mx-auto w-screen h-screen p-4 flex flex-col items-center gap-5 bg-white">
      <p className="text-3xl font-bold my-4 text-black">
        Wedding Invitation List
      </p>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-300 rounded-lg">
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="min-w-full bg-white table-auto">
                <thead className="bg-gray-200 sticky top-0">
                  <tr className="text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-1/2">Guest Name</th>
                    <th className="py-3 px-6 text-left w-1/2">
                      Invitation Link
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {loading ? (
                    <tr>
                      <td colSpan="2" className="py-3 px-6 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    guests.map((guest) => (
                      <tr
                        key={guest.id}
                        className="border-b border-gray-300 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 font-semibold">
                          {guest.name}
                        </td>
                        <td className="py-3 px-6">
                          <Link
                            href={`/invitation2/${guest.name.toLowerCase()}`}
                            className="text-blue-500 hover:underline"
                          >
                            View Invitation
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="border-black rounded-lg bg-gray-400 p-2 flex justify-between items-center">
        <input
          className="text-black"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />
        <button
          className="text-black p-2 py-1 rounded-lg bg-gray-300 hover:bg-gray-600 relative"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading && file ? (
                <span className="loader "></span>) : ("Upload")}
        </button>
      </div>
    </div>
  );
}
