import Navbar from '@/components/Navbar';
import { auth } from '@/lib/firebase';
import { resetUser, useUserContext } from '@/lib/userContext';
import '@/styles/globals.css'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import firebase from 'firebase/compat'
import { AuthState } from '@/lib/enum/AuthState';
import { insertNewUser } from '@/lib/database';
import { Toaster } from '@/components/ui/toaster';

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
                insertNewUser({ 
                    user: {
                        uid: user.uid,
                        displayName: user.displayName || 'Unknown',
                        photoURL: user.photoURL || '',
                        postIds: []
                    },
                    userContext: userContext
                });
            } else {
                userContext.setUser(resetUser(userContext));
            }
        });
        return () => subscriber();
    }, [])

    return (
        <>
            <Navbar user={userContext}/>
            <div className={`bg-slate-50 px-4 sm:px-16 md:px-48 lg:px-60 xl:px-80`}>
                <Component {...children} />
                <Toaster />
            </div>
        </>
    )
}

export default Root;