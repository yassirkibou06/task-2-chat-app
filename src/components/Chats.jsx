import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if (!currentUser) {
            navigate('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": currentUser.email,
                "user-secret": currentUser.uid
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formData = new FormData();
                formData.append('email', currentUser.email);
                formData.append('username', currentUser.email);
                formData.append('secret', currentUser.uid);

                getFile(currentUser.photoURL).then((avatar) => {
                    formData.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/', formData, {
                        headers: {
                            "private-key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY
                        }
                    })
                        .then(() => setLoading(false))
                        .catch((error) => console.log(error));
                })
            })
    }, [currentUser, navigate]);
    console.log(currentUser);

    if (!currentUser || loading) {
        return 'Loading...';
    }

    return (
        <div className="bg-blue-500">
            <div className="flex items-center justify-between p-3 text-white">
                <div className="">
                    <h2 className='text-xl font-semibold'>👋Chat</h2>
                </div>
                <div onClick={handleLogout} className="cursor-pointer border-white border py-1 px-2 rounded-full">
                    <h2 className='font-semibold'>Logout</h2>
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={currentUser.email}
                userSecret={currentUser.uid}
            />
        </div>
    )
}

export default Chats;