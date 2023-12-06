import React, { useContext, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
            if (user) {
                navigate('/chats');
            }
        })
    }, [currentUser, navigate]);

    const value = {currentUser}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}