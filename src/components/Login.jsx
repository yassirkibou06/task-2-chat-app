import React from 'react';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import "firebase/compat/app"
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';


const Login = () => {
    return (
        <div className='text-black grid grid-cols-home w-full h-screen'>
            <div className='bg-gray-100'>
                <h2 className='text-xl font-bold pl-5 mt-5 text-blue-500'>CWA</h2>
                <div className='w-full'>
                    <img className='object-cover w-full h-full' src="/assets/Conversation-rafiki.png" alt="jj" />
                </div>
                <p className='text-center font-medium tracking-widest text-gray-500 text-sm'>Welcome to Chat<span className='text-blue-500'>With</span>All</p>
            </div>
            <div className='flex flex-col justify-center items-center shadow-sm space-y-5'>
                <div onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} className='flex items-center justify-center space-x-2 text-blue-500 bg-blue-100 py-2 w-[250px] rounded-3xl cursor-pointer'>
                    <FaGoogle />
                    <h3 className='font-medium'>Sign in with Google</h3>
                </div>
                <div 
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())} className='flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 w-[250px] rounded-3xl cursor-pointer'>
                    <FaFacebookF />
                    <h3 className='font-medium'>Sign in with Facebook</h3>
                </div>
            </div>
        </div>
    )
}

export default Login