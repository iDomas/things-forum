import Navbar from '@/components/Navbar';
import { auth } from '@/lib/firebase';
import { resetUser, useUserContext } from '@/lib/userContext';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';
import { AuthState } from '@/lib/enum/AuthState';
import { Toaster } from '@/components/ui/toaster';
import firebase from 'firebase/compat';
import { initUser } from '@/lib/database';
import { useLoadingContext } from '@/lib/util/loadingContext';
import LoadingComponent from '@/components/util/loadingComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Things Forum",
    description: "A forum for things.",
}

const Root = ({ Component, children } : { Component: any, children: any }) => {
    const userContext = useUserContext();
    const loadingContext = useLoadingContext();
    const [canInit, setCanInit] = useState<boolean>(false);

    useEffect(() => {
        const setUserContext = ({ user } : { user: firebase.User | undefined })  => {
            if (user) {
                userContext.setUser({
                    firebaseUser: user as firebase.User,
                    displayName: user.displayName || '',
                    photoURL: user.photoURL || '',
                    uid: user.uid || '',
                    authState: AuthState.LOGGED_IN
                })
                setCanInit(true);
            } else {
                userContext.setUser(resetUser());
                console.log('user logged out');
                setCanInit(false);
            }
        }

        loadingContext.setLoading(true);
        auth.onAuthStateChanged((user) => {
            setUserContext({ user: user || undefined })
            loadingContext.setLoading(false);
        })
    }, [])

    useEffect(() => {
        if (canInit) {
            const initInFirestore = async (user: firebase.User) => {
                await initUser({
                    user: {
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || '',
                        uid: user.uid || '',
                        postIds: []
                    },
                    userUId: user.uid || ''
                })
            }
    
            if (userContext.firebaseUser) {
                initInFirestore(userContext.firebaseUser);
            }
        }
    }, [])

    return (
        <>
            <Navbar user={userContext} />
            <LoadingComponent />
            <div className={`bg-slate-50 px-4 sm:px-16 md:px-48 lg:px-60 xl:px-80`}>
                <Component {...children} />
                <span className='z-20'>
                    <Toaster />
                </span>
            </div>
        </>
    )
}

export default Root;