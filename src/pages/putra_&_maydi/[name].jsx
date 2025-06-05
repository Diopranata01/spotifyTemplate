// pages/invitation/[name].js
import WeddingInvitation from "@/components/WeddingInvitation";
import RedirectPageNotFound from "@/components/RedirectPageNotFound";
import { findGuestByName, getAllGuests } from "../../../lib/api/guest";
import WeddingInvitationPutra from "@/components/WeddingInvitationPutra";

export default function Invitation({ guest, isInvited }) {
  return (
    <div>
      {isInvited ? (
        <WeddingInvitationPutra />
      ) : (
        <>
          <RedirectPageNotFound />
        </>
      )}
    </div>
  );
}


export async function getStaticPaths() {
  const guests = await getAllGuests("putra");

  const paths = guests.map((guest) => ({
    params: { name: guest.name.toLowerCase() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const guest = await findGuestByName(params.name, "putra");
  const isInvited = !!guest;

  return {
    props: {
      guest: isInvited ? guest : null,
      isInvited,
    },
  };
}
