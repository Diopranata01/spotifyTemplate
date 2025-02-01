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
  const [hasBeenSended, setHasBeenSended] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(false); // Success message state
  const [canAttend, setCanAttend] = useState(""); // New state for attendance confirmation
  const [guestCount, setGuestCount] = useState(1); // State for number of guests

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success messages
    setError("");
    setSuccess(false);

    // Validate inputs
    if (!formName || !canAttend) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Start loading
    setHasBeenSended(true);

    try {
      // Get the current date and time
      const currentDate = new Date().toISOString(); // Format the date as ISO string
      toUpperCaseEachWord(formName);

      // Get the current pathname
      const { pathname } = router; // Get the current pathname

      let receptionPath = '';
      if (pathname.includes('/invitation2/')) {
        receptionPath = '/invitation2/';
      } else if (pathname.includes('/invitation/')) {
        receptionPath = '/invitation1/';
      }
      
      // Add a new document with a generated ID
      await addDoc(collection(db, "rsvp"), {
        formName,
        attendance,
        guestCount, // Include the number of guests
        message,
        submissionDate: currentDate, // Include the submission date
        receptionPath, // Include the reception path
      });

      // Clear the form
      setFormName("");
      setCanAttend("");
      setAttendance("");
      setMessage("");
      setGuestCount(1); // Reset guest count

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

  const toUpperCaseEachWord = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  
  // Effect to set formName if name exists in the query
  useEffect(() => {
    if (name) {
      setFormName(toUpperCaseEachWord(name));
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
      <div
        className={`flex flex-col w-full px-10 ${
          canAttend === "yes" ? "pb-2" : "pb-10"
        }`}
      >
        <p className="text-2xl lg:text-[40px] mb-2 lg:mb-5">RSVP Form</p>
        <p className="mb-4 text-[16px] lg:text-[18px] text">
          Diharapkan kepada para tamu undangan untuk mengisi form kehadiran
          dibawah ini
        </p>
        <p className="mb-3 lg:text-[17px] lg:mb-5">*undangan berlaku untuk 2 orang*</p>

        {success && (
          <div
            className="bg-[#a8a8a871] border border-[#e0ca96] text-[#e0ca96] px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Sukses!</strong>
            <span className="block sm:inline">
              {" "}
              Terimakasih, ucapan dan doa sudah terkirim !
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
              htmlFor="attendance"
            >
              Konfirmasi Kehadiran:
            </label>
            <select
              id="attendance"
              name="attendance"
              required
              value={attendance}
              onChange={(e) => {
                setAttendance(e.target.value);

                if (e.target.value === "no" || e.target.value === "") {
                  setCanAttend("no");
                  setGuestCount(0); // Reset guest count if not attending
                } else {
                  setCanAttend("yes");
                }
              }}
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
              <option className="text-black" value="no">
                Berhalangan Hadir
              </option>
            </select>
          </div>

          {canAttend === "yes" && (
            <>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="guestCount"
                >
                  Jumlah Tamu yang Hadir:
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setGuestCount((prev) => Math.max(1, prev - 1))
                    } // Decrease count, minimum 1
                    className="px-4 py-2 border border-gray-300 rounded-l text-white bg-transparent hover:bg-gray-600 hover:text-white transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    min="1"
                    max="2"
                    value={guestCount}
                    readOnly // Make the input read-only
                    className="w-16 text-center bg-transparent text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (guestCount >= 2) {
                        return; // Prevent increasing count beyond 2
                      }
                      setGuestCount((prev) => prev + 1);
                    }} // Increase count
                    className="px-4 py-2 border border-gray-300 rounded-r text-white bg-transparent hover:bg-gray-600 hover:text-white transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="mb-4 margin-form">
            <label className="block text-sm font-medium mb-2" htmlFor="message">
              Doa & Ucapan:
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
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
