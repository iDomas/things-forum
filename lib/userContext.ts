import { create } from "zustand";
import { signOut } from "./auth/userLoginLogout";
import { AuthState } from "./enum/AuthState";
import { AppUser } from "./model/AppUser";

const useUserContext = create<AppUser>(
            (set) => ({
                    firebaseUser: undefined,
                    displayName: 'Unknown',
                    photoURL: 'https://github.com/shadcn.png',
                    uid: '',
                    authState: AuthState.LOGGED_OUT,
                    postIds: [],
                    signOut: () => signOut(),
                    setUser: (by: AppUser | undefined) => set((state) => by ? by : resetUser(state))
            })
    );

const resetUser = (state: AppUser): AppUser => {
    return {
        ...state,
        firebaseUser: undefined,
        displayName: '',
        photoURL: '',
        uid: '',
        authState: AuthState.LOGGED_OUT,
        postIds: []
    }
}

export { useUserContext, resetUser }
