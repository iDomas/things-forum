import { UserDetails } from "../AppUser";

export interface DatabaseUser extends UserDetails {
    displayName: string;
    photoURL: string;
    uid: string;
}