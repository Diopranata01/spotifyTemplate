// pages/invitation/[name].js
import WeddingInvitation from "@/components/WeddingInvitation";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Invitation({ guest, isInvited }) {
  return (
    <div>
      {isInvited ? (
        <WeddingInvitation />
      ) : (
        <>
          <div className="flex h-screen items-center justify-center">
            <h2>Sorry, you are not on the guest list.</h2>
          </div>
        </>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const guestCollection = collection(db, "guest_list");
  const guestQuery = query(guestCollection, orderBy("name", "asc"));
  const guestSnapshot = await getDocs(guestQuery);

  // Create paths for each guest
  const paths = guestSnapshot.docs.map((doc) => ({
    params: { name: doc.data().name.toLowerCase() }, // Use lowercase for URL consistency
  }));

  return {
    paths,
    fallback: false, // Return 404 for any paths not returned by getStaticPaths
  };
}

export async function getStaticProps({ params }) {
  const guestCollection = collection(db, "guest_list");
  const guestQuery = query(guestCollection);
  const guestSnapshot = await getDocs(guestQuery);

  // Check if the guest is invited
  const guests = guestSnapshot.docs.map((doc) => doc.data());
  const guest = guests.find((g) => g.name.toLowerCase() === params.name);
  const isInvited = !!guest;

  return {
    props: {
      guest: isInvited ? guest : null,
      isInvited,
    },
  };
}
