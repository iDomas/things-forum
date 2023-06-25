import Navbar from '@/components/Navbar';
import { auth } from '@/lib/firebase';
import { resetUser, useUserContext } from '@/lib/userContext';
import '@/styles/globals.css'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { AuthState } from '@/lib/enum/AuthState';
import { Toaster } from '@/components/ui/toaster';
import firebase from 'firebase/compat';
import { getPostIds, initUser } from '@/lib/database';
import { AuthModel } from '@/lib/auth/AuthModel';

const Root = ({ Component, children } : { Component: any, children: any }) => {
    const userContext = useUserContext();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const resolveAuthState = new Promise<AuthModel>((resolve, reject) => {
                if (!user) {
                    userContext.setUser(resetUser(userContext));
                    reject("Unauthorized");
                } 
                resolve({
                    user: user as firebase.User,
                    unsubscribe: unsubscribe
                })
            })

            resolveAuthState.then((authModel) => {
                const user = authModel.user as firebase.User;
                userContext.setUser({
                    ...userContext,
                    firebaseUser: user as firebase.User,
                    displayName: user.displayName || '',
                    photoURL: user.photoURL || '',
                    uid: user.uid || '',
                    authState: AuthState.LOGGED_IN
                })
                return authModel;
            }).then((authModel) => {
                const user = authModel.user as firebase.User;
                initUser({
                    user: {
                        displayName: user.displayName || '',
                        photoURL: user.photoURL || '',
                        uid: user.uid || ''
                    },
                    userUId: user.uid || ''
                })
                return authModel;
            }).then((authModel) => {
                const user = authModel.user as firebase.User;
                console.log(user.uid);
                
                getPostIds({ userUId: user.uid, userContext: userContext })
                return authModel;
            }).catch((error) => {
                console.log(error);
            });
        })

        return () => unsubscribe();
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