import { create } from "zustand";
import { signOut } from "./auth/userLoginLogout";
import { AuthState } from "./enum/AuthState";
import { AppUser, UserDetails } from "./model/AppUser";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { insertNewUser } from "./database";

const useUserData = () => {
    const [user] = useAuthState(auth as any);
    const [userData, setUserData] = useState<AppUser>();
    
    const userContextInit = create<AppUser>(
        (set) => ({
            firebaseUser: user as any,
            displayName: user?.displayName || '',
            photoURL: user?.photoURL || 'https://github.com/shadcn.png',
            uid: user?.uid || '',
            authState: user ? AuthState.LOGGED_IN : AuthState.LOGGED_OUT,
            postIds: [],
            signOut: () => signOut(),
            setUser: (by: any | undefined) =>
            set((state) => {
                const userData = by ? ({...state, ...by}) : resetUser();
                setUserData(userData);
                return userData;
            })
        })
    );

    const userContext = userContextInit();

    useEffect(() => {
        let unsubscribe: any;

        if (user) {
            const ref = db.collection('users').doc(user.uid);
            unsubscribe = ref.onSnapshot((doc) => {
                if (doc.exists) {
                    setPostIds({ userContext, doc });
                } else {
                    insertNewUser({ userContext });
                }
            })
        }

        return unsubscribe;
    }, [user])

    return { userContext, userData }
}

const setPostIds = ({ userContext, doc } : { userContext: AppUser, doc: any }) => {
    if (userContext) {
        const { postIds } = doc?.data() as any;
        if (!postIds) {
            userContext.setUser({
                postIds: [...postIds]
            })
        } else {
            userContext.setUser({
                postIds: []
            })
        }
    }
}


const resetUser = (): UserDetails => {
    console.log('resetUser');
    
    return {
        firebaseUser: undefined,
        displayName: '',
        photoURL: '',
        uid: '',
        authState: AuthState.LOGGED_OUT,
        postIds: []
    }
}

export { useUserData, resetUser }
