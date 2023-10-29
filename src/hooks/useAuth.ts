import React from 'react';

import { User, GoogleAuthProvider, signInWithPopup, getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { app } from "../firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function UseAuth() {
  const [user, setUser] = React.useState<User | null>(auth.currentUser);
  const [checkingAuth, setCheckingAuth] = React.useState(true);

  async function SignIn() {
    try {
      const userCreds = await signInWithPopup(auth, provider);
      if (userCreds.user) {
        setUser(userCreds.user);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function SignOut() {
    try {
      // unSubAuthChanges();
      await signOut(auth);
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      if (!user) {
        setUser(auth.currentUser);
        if (checkingAuth) {
          setCheckingAuth(false);
        }
      }
    });
    return unsub;
  }, [user, checkingAuth]);

  return { isLoggedIn: !!user, user, SignIn, SignOut, checkingAuth }
}
