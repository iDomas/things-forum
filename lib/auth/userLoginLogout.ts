import { auth, googleAuthProvider } from "../firebase"
import { UserDetails } from "../model/AppUser";

const login = ({ }): void => {
    auth.signInWithPopup(googleAuthProvider);
}

const signOut = async () => {
    auth.signOut();
}

export { login, signOut }