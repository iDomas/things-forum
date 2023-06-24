import firebase from "firebase/compat";
import { AuthState } from "../enum/AuthState";

export interface AppUser {
    firebaseUser: firebase.User | undefined;
    displayName: string;
    photoURL: string;
    uid: string;
    authState: AuthState;
    postIds: string[];
    signOut: () => void;
    setUser: (user: AppUser | undefined) => void
}