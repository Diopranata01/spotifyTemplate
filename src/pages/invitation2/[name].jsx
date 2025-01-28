// pages/invitation/[name].js
import WeddingInvitation2 from "@/components/Weddinginvitation2";
import fs from "fs";
import path from "path";

export default function Invitation2({ guest, isInvited }) {
  return (
    <div>
      {isInvited ? (
        <WeddingInvitation2 />
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
  const filePath = path.join(process.cwd(), "public", "guests_2.json");
  const jsonData = fs.readFileSync(filePath);
  const guests = JSON.parse(jsonData);

  // Create paths for each guest
  const paths = guests.map((guest) => ({
    params: { name: guest.name.toLowerCase() }, // Use lowercase for URL consistency
  }));

  return {
    paths,
    fallback: false, // Return 404 for any paths not returned by getStaticPaths
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "public", "guests_2.json");
  const jsonData = fs.readFileSync(filePath);
  const guests = JSON.parse(jsonData);

  // Check if the guest is invited
  const guest = guests.find((g) => g.name.toLowerCase() === params.name);
  const isInvited = !!guest;

  return {
    props: {
      guest: isInvited ? guest : null,
      isInvited,
    },
  };
}
