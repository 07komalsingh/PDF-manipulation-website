import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb_zXtMYfI7tngJUwfqlbEMz6tfNG62AY",
  authDomain: "easydocuments-web.firebaseapp.com",
  projectId: "easydocuments-web",
  storageBucket: "easydocuments-web.appspot.com",
  messagingSenderId: "155896267765",
  appId: "1:155896267765:web:15028f3f06d41d8fd756bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Force account selection
provider.setCustomParameters({
  prompt: "select_account"
});

const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        // User does not exist, create a new record
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });
    }

    return result;
};

const monitorAuthState = (callback) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Check if user exists in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                callback(user);
            } else {
                // User record does not exist, handle accordingly
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};

export { auth, signInWithGoogle, monitorAuthState };
