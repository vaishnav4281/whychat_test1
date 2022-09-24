import { StrictMode, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "app/hooks";

import { Authentication, Home } from "pages";
import { Toast } from "components";
import { useLocalStorage } from "hooks";
import { auth, db } from "services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getPendingMsg, getToastMsg } from "toastSlice";
import { login } from "features/authentication";
import { User } from "interfaces";
import { getUserState } from "features/authentication/userSlice";

const App = () => {
  const [authUser] = useAuthState(auth);
  const { user: currentUser } = useAppSelector(getUserState);

  const pendingMsg = useAppSelector(getPendingMsg);
  const toastMsg = useAppSelector(getToastMsg);
  const darkmode = useAppSelector((state: any) => state.theme.value.darkmode);

  const dispatch = useAppDispatch();

  const [keepSignedIn, setKeepSignedIn] = useLocalStorage(
    "keepSignedIn",
    false
  );

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  useEffect(() => {
    if (!authUser) return;
    const userDocRef = doc(db, "users", authUser.uid);

    const unsub = onSnapshot(userDocRef, async (snapshot) => {
      console.log("dispatched");
      console.log(snapshot.data());
      dispatch(login(snapshot.data()));
    });

    return () => {
      unsub();
      console.log(authUser);
    };
  }, [authUser]);

  return (
    <StrictMode>
      <BrowserRouter>
        <AnimatePresence>
          {/* Loading Toast */}
          {pendingMsg && <Toast type="loading" msg={pendingMsg} />}

          {/* Notification Toast */}
          {toastMsg && <Toast durationMS={3000} msg={toastMsg} />}
        </AnimatePresence>

        {authUser && Object.entries(currentUser).length ? (
          <motion.div
            className="flex"
            animate={{ opacity: 1, x: 0, y: 0 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <Home />
          </motion.div>
        ) : (
          <Authentication
            keepSignedIn={keepSignedIn}
            setKeepSignedIn={setKeepSignedIn}
          />
        )}
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
