import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword, deleteUser} from 'firebase/auth';
import { app } from '../lib/firebase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    });

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signUp = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        return signOut(auth);
    };

    const resetPassword = async (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const setNewEmail = async (newEmail) => {
        return updateEmail(user, newEmail);
    };

    const setNewPassword = async (newPassword) => {
        return updatePassword(user, newPassword);
    };

    const deleteAccount = async () => {
        deleteUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout, loading, resetPassword, setNewEmail, setNewPassword, deleteAccount}}>
            {!loading && children}
        </AuthContext.Provider>
    );
    
}