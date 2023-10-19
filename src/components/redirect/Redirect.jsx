import { Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import isShortcodeAvailable from "../../utils/isShortcodeAvailable";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const Redirect = () => {
  const { shortCode } = useParams();
  console.log(shortCode);
  const [shortLinkExists, setShortLinkExists] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  checkShortCode();

  let body = "";

  async function getLongLink(shortCodeID) {
    const q = doc(db, "links", shortCodeID);
    const docSnap = await getDoc(q);
    let totalClicks = docSnap.data().totalClicks;
    await updateDoc(q, { totalClicks: totalClicks += 1 });
    window.location.href = docSnap.data().link;
  }

  async function checkShortCode() {
    const {
      shortCodeAvailable,
      shortCodeID,
      isLoading: shortCodeLoading,
    } = await isShortcodeAvailable(shortCode);
    if (!shortCodeLoading) {
      setShortLinkExists(!shortCodeAvailable);
      if (shortLinkExists) {
        getLongLink(shortCodeID);
      }
      setLoading(false);
    }
  }

  if (shortLinkExists !== null) {
    if (shortLinkExists) {
      body = (
        <div>
          <Text>Redirecting...</Text>
          <Spinner color="red" size={"lg"} />
        </div>
      );
    } else {
      body = <Text>Short link does not exist</Text>;
    }
  }

  return (
    <>
      {isLoading ? (
        <>
          <Text>Loading...</Text>
          <Spinner size={"lg"} color="red" />
        </>
      ) : (
        body
      )}
    </>
  );
};
