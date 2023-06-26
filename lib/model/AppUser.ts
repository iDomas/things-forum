import firebase from "firebase/compat";
import { AuthState } from "../enum/AuthState";

export interface AppUser extends UserDetails {
    signOut: () => void;
    setUser: (user: any | undefined) => void;
}

export interface UserDetails extends UserPostDetails{
    firebaseUser: firebase.User | undefined;
    displayName: string;
    photoURL: string;
    uid: string;
    authState: AuthState;
}

export interface UserPostDetails {
    postIds: string[];
}
