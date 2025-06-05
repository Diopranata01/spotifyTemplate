import { db } from "@/../lib/firebase";
import { storage } from "@/../lib/storageApp";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

// lib/api/guest.js
export async function getAllGuests(listKey) {
  const guestCollection = collection(
    db,
    listKey ? `guest_list_${listKey}` : "guest_list"
  );

  const guestQuery = query(guestCollection, orderBy("name", "asc"));
  const guestSnapshot = await getDocs(guestQuery);
  return guestSnapshot.docs.map((doc) => doc.data());
}

export async function findGuestByName(name, listKey) {
  const guests = await getAllGuests(listKey);
  const normalizedParamName = name.trim().toLowerCase();

  const guest = guests.find(
    (g) => g.name.trim().toLowerCase() === normalizedParamName
  );

  return guest || null;
}

export async function getImageUrl(path) {
  const imageRef = ref(storage, path);
  return await getDownloadURL(imageRef);
}