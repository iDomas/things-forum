import Navbar from '@/components/Navbar';
import { auth } from '@/lib/firebase';
import { resetUser, useUserContext } from '@/lib/userContext';
import '@/styles/globals.css'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat'
import { AuthState } from '@/lib/enum/AuthState';

const Root = ({ Component, children } : { Component: any, children: any }) => {
    const userContext = useUserContext();
    
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (user) => {
            if (user) {
                userContext.setUser({
                        ...userContext,
                        firebaseUser: user as firebase.User,
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || '',
                        uid: user.uid || '',
                        authState: AuthState.LOGGED_IN
                    })
            } else {
                userContext.setUser(resetUser(userContext));
            }
        });
        return () => subscriber();
    }, [])

    return (
        <>
            <Navbar user={userContext}/>
            <div className={`bg-slate-100 sm:px-4 md:px-16 lg:px-48 xl:px-60`}>
                <Component {...children} />
            </div>
        </>
    )
}

export default Root;