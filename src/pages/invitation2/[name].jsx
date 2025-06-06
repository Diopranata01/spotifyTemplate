// pages/invitation/[name].js
import WeddingInvitation2 from "@/components/WeddingInvitation2";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Invitation2({ guest, isInvited }) {
  return (
    <div>
      {isInvited ? (
        <WeddingInvitation2 guest={guest} />
      ) : (
        <div className="flex h-screen items-center justify-center">
          <h2>Sorry, you are not on the guest list.</h2>
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const guestCollection = collection(db, "guest_list_2");
  const guestQuery = query(guestCollection, orderBy("name", "asc"));
  const guestSnapshot = await getDocs(guestQuery);

  // Create paths for each guest
  const paths = guestSnapshot.docs.map((doc) => ({
    params: { name: doc.data().name.toLowerCase() }, // Use lowercase for URL consistency
  }));

  return {
    paths,
    fallback: 'blocking', // Allow for dynamic paths
  };
}

export async function getStaticProps({ params }) {
  const guestCollection = collection(db, "guest_list_2");
  const guestQuery = query(guestCollection);
  const guestSnapshot = await getDocs(guestQuery);

  // Check if the guest is invited
  const guests = guestSnapshot.docs.map((doc) => doc.data());

  // Normalize the params name
  const normalizedParamName = params.name.trim().toLowerCase();
  // console.log("Looking for guest:", normalizedParamName); // Debugging log

  // Find the guest with normalized names
  const guest = guests.find((g) => g.name.trim().toLowerCase() === normalizedParamName);
  // console.log("Found guest:", guest); // Debugging log
  const isInvited = !!guest;

  return {
    props: {
      guest: isInvited ? guest : null,
      isInvited,
    },
  };
}
