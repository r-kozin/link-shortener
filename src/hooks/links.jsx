import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { uuidv4 } from "@firebase/util";
import {
  setDoc,
  doc,
  collection,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { DASHBOARD } from "../lib/routes";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { query, where } from "firebase/firestore";
import { nanoid } from "nanoid";
import doesShortcodeExist from "../utils/doesShortcodeExist";

export function useAddLink() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function addLink(link) {
    setLoading(true);
    let newShortCode = nanoid(6);
    const shortLinkExists = await doesShortcodeExist(newShortCode);

    if (!shortLinkExists) {
      toast({
        title: "Error",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    } else {
      setLoading(true);
      const id = uuidv4();
      await setDoc(doc(db, "links", id), {
        ...link,
        id,
        date: Date.now(),
        shortCode: newShortCode,
        totalClicks: 0,
      });
      toast({
        title: "Link Created",
        description: "You have successfully created a link.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  }
  return { addLink, isLoading };
}

export function useGetLinks(uid = null) {
  const q = query(
    collection(db, "links"),
    orderBy("date", "desc"),
    where("uid", "==", uid)
  );
  const [links, isLoading, error] = useCollectionData(q);

  if (error) {
    throw error;
  }
  return { links, isLoading };
}

export function useDeleteLink(id) {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();

  async function deleteLink() {
    const res = window.confirm(
      "Are you sure you want to delete this link? Warning: This action cannot be undone."
    );
    if (res) {
      setLoading(true);
      await deleteDoc(doc(db, "links", id));
      toast({
        title: "Link deleted successfully!",
        status: "info",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  }
  return { deleteLink, isLoading };
}
