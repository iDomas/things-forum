import { auth, googleAuthProvider } from "../firebase"
import { AppUser } from "../model/AppUser";

const login = ({ userContext } : { userContext: AppUser }): void => {
    auth.signInWithPopup(googleAuthProvider);
}

const signOut = async () => {
    auth.signOut();
}

export { login, signOut }