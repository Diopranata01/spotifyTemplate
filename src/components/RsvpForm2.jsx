import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const RsvpForm2 = () => {
  const router = useRouter();
  const { name } = router.query;
  const [formName, setFormName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [canAttend, setCanAttend] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (
      !formName ||
      !canAttend ||
      !message ||
      !attendance ||
      attendance === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Get the current date and time
      const currentDate = new Date().toISOString();

      let receptionPath = "";
      // if (pathname.includes("/invitation2/")) {
      //   receptionPath = "/invitation2/";
      // } else if (pathname.includes("/invitation/")) {
      //   receptionPath = "/invitation1/";
      // }

      // Add a new document with a generated ID
      await addDoc(collection(db, "rsvp_2"), {
        attendance,
        formName,
        guestCount,
        message,
        receptionPath,
        submissionDate: currentDate,
      });

      // Clear the form
      setFormName("");
      setCanAttend("");
      setAttendance("");
      setMessage("");
      setGuestCount(1);

      setSubmissionDate(currentDate);

      setSuccess(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Error submitting RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toUpperCaseEachWord = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

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
        className={`flex flex-col w-full items-center md:items-start px-10 ${
          canAttend === "yes" ? "pb-2" : "py-10"
        }`}
      >
        <h1 className="text-2xl md:text-[32px] lg:text-[32px] mb-2 md:mb-5 lg:mb-5">
          RSVP Form
        </h1>
        <p className="mb-4 text-sm xl:text-[15px] 2xl:text-[18px] leading-normal text-center md:text-start">
          Diharapkan kepada para tamu undangan untuk mengisi form kehadiran
          dibawah ini
        </p>
        <p className="mb-3 text-sm xl:text-[15px] 2xl:text-[18px] lg:mb-5">
          *undangan berlaku untuk 2 orang*
        </p>

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

        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col gap-2">
          <div className="mb-4">
            <p
              className="block text-sm xl:text-[15px] 2xl:text-[18px] mb-2 mt-4"
              htmlFor="name"
            >
              Nama Anda:
            </p>
            <input
              type="text"
              id="formName"
              name="formName"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full p-2 rounded text-white text-sm xl:text-[15px] 2xl:text-[18px]"
              style={{ backgroundColor: "rgba(58, 58, 48, 0.69)" }}
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div className="mb-4">
            <p
              className="block text-sm xl:text-[15px] 2xl:text-[18px] mb-2"
              htmlFor="attendance"
            >
              Konfirmasi Kehadiran:
            </p>
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
                  setGuestCount(1);
                }
              }}
              className="w-full p-2 rounded text-white text-sm xl:text-[15px] 2xl:text-[18px]"
              style={{ backgroundColor: "rgba(58, 58, 48, 0.69)" }}
            >
              <option value="">Pilih opsi</option>
              <option value="pemberkatan">Pemberkatan</option>
              <option value="resepsi">Resepsi</option>
              <option value="keduanya">Keduanya</option>
              <option value="no">Berhalangan Hadir</option>
            </select>
          </div>

          {canAttend === "yes" && (
            <>
              <div className="mb-4">
                <p
                  className="block text-sm xl:text-[15px] 2xl:text-[18px] mb-2"
                  htmlFor="guestCount"
                >
                  Jumlah Tamu yang Hadir:
                </p>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setGuestCount((prev) => Math.max(1, prev - 1))
                    }
                    style={{ backgroundColor: "rgba(58, 58, 48, 0.69)" }}
                    className="px-4 py-2 rounded-l text-white  hover:bg-gray-600 hover:text-white transition"
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
                    className="w-13 ps-3 text-center bg-transparent text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (guestCount >= 2) {
                        return; // Prevent increasing count beyond 2
                      }
                      setGuestCount((prev) => prev + 1);
                    }}
                    style={{ backgroundColor: "rgba(58, 58, 48, 0.69)" }}
                    className="px-4 py-2 rounded-r text-white  hover:bg-gray-600 hover:text-white transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="mb-4 margin-form">
            <p
              className="block text-sm xl:text-[15px] 2xl:text-[18px] mb-2"
              htmlFor="message"
            >
              Doa & Ucapan:
            </p>
            <textarea
              id="message"
              name="message"
              rows="3"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded text-white text-sm xl:text-[15px] 2xl:text-[18px]"
              style={{ backgroundColor: "rgba(58, 58, 48, 0.69)" }}
              placeholder="Masukkan doa dan ucapan Anda"
            />
          </div>

          <button
            type="submit"
            className="lg:h-[2.4rem] xl:h-[2.6rem] w-full md:w-3/12 px-4 py-2 rounded-md font-italiana bg-[#3A3A30] text-[#fff] hover:bg-[#171712] hover:text-white transition"
          >
            <p className="tracking-[1.5px] text-sm xl:text-[15px] 2xl:text-[18px]">
              {loading ? (
                <>
                  <span className="loader"></span> {/* Spinner */}
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Kirim"
              )}
            </p>
          </button>
        </form>
      </div>
    </>
  );
};

export default RsvpForm2;
