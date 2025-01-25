import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const RsvpForn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(false); // Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success messages
    setError("");
    setSuccess(false);

    // Validate inputs
    if (!name || !email || !attendance) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Add a new document with a generated ID
      await addDoc(collection(db, "rsvp"), {
        name,
        email,
        attendance,
        message,
      });

      // Clear the form
      setName("");
      setEmail("");
      setAttendance("");
      setMessage("");

      setSuccess(true); // Set success message
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Error submitting RSVP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false); // Reset success state after 3 seconds
        setLoading(false); // Stop loading
      }, 8000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [success]);

  return (
    <>
      <p className="text-2xl lg:text-[45px] mb-4">RSVP Form</p>
      <p className="mb-4 lg:text-[18px]">
        Diharapkan kepada para tamu undangan untuk mengisi form kehadiran
        dibawah ini
      </p>
      <p className="mb-3 lg:text-[17px]">*undangan berlaku untuk 2 orang*</p>

      {success && (
        <div
          className="bg-transparent border border-[#EAE3D3] text-[#CABEA6] px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Sukses!</strong>
          <span className="block sm:inline">
            {" "}
            Data kehadiran sudah terkirim. Terimakasih
          </span>
        </div>
      )}

      {error && (
        <p className="text-red-500 mb-4">{error}</p> // Error message
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Nama Anda:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-white bg-transparent"
            placeholder="Masukkan nama Anda"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email Anda:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-white bg-transparent"
            placeholder="Masukkan email Anda"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="attendance"
          >
            Konfirmasi Kehadiran:
          </label>
          <select
            id="attendance"
            name="attendance"
            required
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-white bg-transparent"
          >
            <option value="">Pilih opsi</option>
            <option value="pemberkatan">Pemberkatan</option>
            <option value="resepsi">Resepsi</option>
            <option value="keduanya">Keduanya</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Doa & Ucapan:
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black bg-transparent"
            placeholder="Masukkan doa dan ucapan Anda"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded-3xl font-italiana bg-white text-black hover:bg-gray-600 hover:text-white transition relative"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <>
              <span className="loader"></span> {/* Spinner */}
              <span className="ml-2">Loading...</span>
            </>
          ) : (
            "KONFIRMASI"
          )}
        </button>
      </form>
    </>
  );
};

export default RsvpForn;
