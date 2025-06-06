import { useState, useEffect } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [editGuestId, setEditGuestId] = useState(null);
  const [editName, setEditName] = useState("");
  const [newGuestName, setNewGuestName] = useState("");

  // Fetch guest data from Firestore
  const fetchGuests = async () => {
    setLoading(true); // Set loading to true when fetching starts
    const collectionRef = collection(db, "guest_list_putra");
    const collectionQuerry = query(collectionRef, orderBy("name", "asc"));
    const snapshot = await getDocs(collectionQuerry);
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
    if (!file) {
      alert("File cannot be empty");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      try {
        const collectionRef = collection(db, "guest_list_putra");
        setLoading(true); // Set loading to true when fetching starts

        // Step 1: Clear existing data
        const existingDocs = await getDocs(collectionRef);
        const deletePromises = existingDocs.docs.map((doc) =>
          deleteDoc(doc.ref)
        );
        await Promise.all(deletePromises);

        // Step 2: Add new data
        const addPromises = jsonData.map(async (item) => {
          // Check if the 'name' field is present and not empty
          const trimmedName = item.Nama ? item.Nama.trim() : ""; // Trim whitespace
          if (trimmedName !== "") {
            await addDoc(collectionRef, {
              name: trimmedName, // Store the trimmed name
            });
          }
        });

        // Wait for all add operations to complete
        await Promise.all(addPromises);

        alert("Data uploaded successfully!");
        fetchGuests(); // Refresh the guest list after upload
      } catch (error) {
        console.error("Error uploading data: ", error);
        alert("Error uploading data. Please check the console for details.");
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleEditClick = (guest) => {
    setEditGuestId(guest.id);
    setEditName(guest.name);
  };

  const handleSave = async (guestId) => {
    if (!editName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    // Confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (!isConfirmed) {
      return; // Exit if the user cancels
    }

    try {
      const guestDoc = doc(db, "guest_list_putra", guestId);
      await updateDoc(guestDoc, { name: editName });
      setEditGuestId(null); // Exit edit mode
      // Optionally, you can refetch guests or update the state directly
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id === guestId ? { ...guest, name: editName } : guest
        )
      );
      setEditName("");

      fetchGuests(); // Refresh the guest list after upload
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error updating guest: ", error);
    }
  };

  const handleAddGuest = async () => {
    if (!newGuestName.trim()) {
      alert("Guest name cannot be empty");
      return;
    }

    try {
      await addDoc(collection(db, "guest_list_putra"), {
        name: newGuestName,
      });
      setGuests((prevGuests) => [
        ...prevGuests,
        { id: newGuestName, name: newGuestName }, // Update the state with the new guest
      ]);
      alert("Guest added successfully!");
      fetchGuests(); // Refresh the guest list after upload
      setNewGuestName(""); // Clear the input field
    } catch (error) {
      console.error("Error adding guest: ", error);
    }
  };

  const handleDownload = () => {
    if (!guests || guests.length === 0) {
      alert("No guests to export.");
      return;
    }

    const dataToExport = guests.map((guest) => ({
      Name: guest.name,
      Link: `https://yourdomain.com/putra_&_maydi/${guest.name.toLowerCase()}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");

    XLSX.writeFile(workbook, "guest_list.xlsx");
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
                  ) : guests.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="py-3 px-6 text-center">
                        No Data Invitation Sesion 1
                      </td>
                    </tr>
                  ) : (
                    guests.map((guest) => (
                      <tr
                        key={guest.id}
                        className="border-b border-gray-300 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 font-semibold">
                          {editGuestId === guest.id ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="border border-gray-300 rounded p-1"
                            />
                          ) : (
                            guest.name
                          )}
                        </td>
                        <td className="py-3 px-6 flex gap-4">
                          {editGuestId === guest.id ? (
                            <button
                              onClick={() => handleSave(guest.id)}
                              className="text-green-500 hover:underline"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditClick(guest)}
                              className="text-blue-500 hover:underline"
                            >
                              Edit
                            </button>
                          )}
                          <Link
                            href={`/putra_&_maydi/${guest.name.toLowerCase()}`}
                            className="text-blue-500 hover:underline ml-2"
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

      <button
        onClick={handleDownload}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Download Excel
      </button>

      <div className="flex justify-between w-[380px]">
        {/* <p className="text-3xl font-bold my-4 text-black">Add a New Guest</p> */}
        <input
          type="text"
          value={newGuestName}
          onChange={(e) => setNewGuestName(e.target.value)}
          placeholder="Enter guest name"
          className="border text-black border-gray-300 rounded p-1 w-[220px]"
        />
        <button
          onClick={handleAddGuest}
          className="p-2 py-1 rounded-lg text-black bg-gray-300 hover:bg-gray-600 hover:text-white relative gap-4"
        >
          Add Guest
        </button>
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
          {loading && file ? <span className="loader "></span> : "Upload"}
        </button>
      </div>
    </div>
  );
}
