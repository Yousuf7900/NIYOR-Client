import { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../components/Loading";
import { auth } from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const updateUserProfile = (name, photoURL) => {
        if (!auth.currentUser) {
            return Promise.reject(new Error("No authenticated user found"));
        }
        return updateProfile(auth.currentUser, {
            displayName: name || auth.currentUser.displayName || "",
            photoURL: photoURL || auth.currentUser.photoURL || "",
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                const userInfo = { email: currentUser.email };

                axiosPublic.post("/jwt", userInfo).then((res) => {
                    if (res.data.token) {
                        localStorage.setItem("access-token", res.data.token);
                        setLoading(false);
                    }
                });
            } else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [axiosPublic]);

    if (loading) {
        return <Loading text={"Preparing your experience..."} />;
    }

    const authInfo = {
        user,
        loading,
        logOut,
        googleSignIn,
        signIn,
        createUser,
        updateUserProfile,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
