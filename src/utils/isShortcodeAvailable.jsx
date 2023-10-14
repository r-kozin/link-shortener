import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";

export default async function isShortcodeAvailable(shortCode) {
    const [shortCodeAvailable, setShortCodeAvailable] = useState(true);
    const [shortCodeID, setShortCodeID] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const q = query(collection(db, "links"), where("shortCode", "==", shortCode));
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size > 0) {
        setShortCodeAvailable(false);
        querySnapshot.forEach((doc) => {
            setShortCodeID(doc.id);
            setLoading(false);
        });
    } else {
        setShortCodeAvailable(true);
        setLoading(false);
    }

    return { shortCodeAvailable, shortCodeID, isLoading }
}