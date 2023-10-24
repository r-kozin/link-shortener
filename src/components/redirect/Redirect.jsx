import { Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isShortcodeAvailable from "../../utils/isShortcodeAvailable";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export const Redirect = () => {
  const { shortCode } = useParams();
  const [shortLinkExists, setShortLinkExists] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [shortCodeID, setShortCodeID] = useState(null);
  checkShortCode();

  //get long link once short link exists
  useEffect(() => {
    getLongLink(shortCodeID);
  }, [shortLinkExists]);

  let body = "";

  //get long link funciton
  async function getLongLink(shortCodeID) {
    const q = doc(db, "links", shortCodeID);
    const docSnap = await getDoc(q);
    let totalClicksCurr = docSnap.data().totalClicks;
    await updateDoc(q, { totalClicks: totalClicksCurr += 1 }); //increment total clicks
    window.location.href = docSnap.data().link;
  }

  //check if short link exists
  async function checkShortCode() {
    const {
      shortCodeAvailable,
      shortCodeID,
      isLoading: shortCodeLoading,
    } = await isShortcodeAvailable(shortCode);
    if (!shortCodeLoading) {
      setShortLinkExists(!shortCodeAvailable);
      setShortCodeID(shortCodeID);
      setLoading(false);
    }
  }

  //render body
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
