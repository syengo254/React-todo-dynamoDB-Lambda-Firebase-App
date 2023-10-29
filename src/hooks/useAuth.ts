import React from 'react';

import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, getAuth, signOut } from 'firebase/auth'
import { app } from "../firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function UseAuth() {
  const [user, setUser] = React.useState<User | null>(auth.currentUser);

  const unSubAuthChanges = onAuthStateChanged(auth, () => {
    setUser(auth.currentUser);
  });

  async function SignIn() {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e);
    }
  }

  async function SignOut() {
    try {
      unSubAuthChanges();
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  }

  return { isLoggedIn: !!user, user, SignIn, SignOut }
}
