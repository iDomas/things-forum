import firebase from "firebase/compat";

export interface AuthModel {
    user: firebase.User | undefined;
    unsubscribe: () => void;
}