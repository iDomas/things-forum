import { create } from "zustand";
import { signOut } from "./auth/userLoginLogout";
import { AuthState } from "./enum/AuthState";
import { AppUser, UserDetails } from "./model/AppUser";

const useUserContext = create<AppUser>(
            (set) => ({
                    firebaseUser: undefined,
                    displayName: 'Unknown',
                    photoURL: 'https://github.com/shadcn.png',
                    uid: '',
                    authState: AuthState.LOGGED_OUT,
                    postIds: [],
                    signOut: () => signOut(),
                    setUser: (by: any | undefined) =>
                        set((state) => by ? ({...state, ...by}) : resetUser())
            })
    );

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

export { useUserContext, resetUser }
