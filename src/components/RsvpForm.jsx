import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const RsvpForm = () => {
  const router = useRouter();
  const { name } = router.query; // Assuming your dynamic route is [slug]
  const [formName, setFormName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(false); // Success message state
  const [canAttend, setCanAttend] = useState(""); // New state for attendance confirmation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success messages
    setError("");
    setSuccess(false);

    // Validate inputs
    if (!formName || !attendance) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Get the current date and time
      const currentDate = new Date().toISOString(); // Format the date as ISO string

      // Add a new document with a generated ID
      await addDoc(collection(db, "rsvp"), {
        formName,
        attendance,
        message,
        submissionDate: currentDate, // Include the submission date
      });

      // Clear the form
      setFormName("");
      setAttendance("");
      setMessage("");

      // Set the submission date to display later
      setSubmissionDate(currentDate);

      setSuccess(true); // Set success message
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Error submitting RSVP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Effect to set formName if name exists in the query
  useEffect(() => {
    if (name) {
      setFormName(name);
    }
  }, [name]);

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
      <div className={`flex flex-col w-full px-10 ${ canAttend === "yes" ? "pb-2" : "pb-10"}`}>
        <p className="text-2xl lg:text-[45px] mb-2">RSVP Form</p>
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
              id="formName"
              name="formName"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-white bg-transparent"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="canAttend"
            >
              Kehadiran
            </label>
            <select
              id="canAttend"
              name="canAttend"
              required
              value={canAttend}
              onChange={(e) => setCanAttend(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-white bg-transparent"
            >
              <option className="text-black" value="">
                Pilih opsi
              </option>
              <option className="text-black" value="yes">
                Ya, saya akan hadir
              </option>
              <option className="text-black" value="no">
                Tidak, saya tidak bisa hadir
              </option>
            </select>
          </div>

          {/* {canAttend === "no" && (
            <p className="text-red-500 mb-4">
              Terima kasih telah memberi tahu kami. Kami akan merindukan
              kehadiran Anda.
            </p>
          )} */}

          {canAttend === "yes" && (
            <>
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
                  <option className="text-black" value="">
                    Pilih opsi
                  </option>
                  <option className="text-black" value="pemberkatan">
                    Pemberkatan
                  </option>
                  <option className="text-black" value="resepsi">
                    Resepsi
                  </option>
                  <option className="text-black" value="keduanya">
                    Keduanya
                  </option>
                </select>
              </div>
            </>
          )}

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
              className="w-full p-2 border border-gray-300 rounded text-white bg-transparent"
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
      </div>
    </>
  );
};

export default RsvpForm;
