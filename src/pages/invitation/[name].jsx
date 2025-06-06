// pages/invitation/[name].js
import WeddingInvitation from "@/components/WeddingInvitation";
import RedirectPageNotFound from "@/components/RedirectPageNotFound";
import { findGuestByName, getAllGuests } from "../../../lib/api/guest";

export default function Invitation({ guest, isInvited }) {
  return (
    <div>
      {isInvited ? (
        <WeddingInvitation />
      ) : (
        <>
          <RedirectPageNotFound />
        </>
      )}
    </div>
  );
}


export async function getStaticPaths() {
  const guests = await getAllGuests();

  const paths = guests.map((guest) => ({
    params: { name: guest.name.toLowerCase() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const guest = await findGuestByName(params.name);
  const isInvited = !!guest;

  return {
    props: {
      guest: isInvited ? guest : null,
      isInvited,
    },
  };
}
