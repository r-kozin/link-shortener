import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default async function doesShortcodeExist(shortCode) {
    const q = query(collection(db, "links"), where("shortCode", "==", shortCode));
    const querySnapshot = await getDocs(q)

    return !querySnapshot.size > 0
}