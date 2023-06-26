import { UserPostDetails } from "../AppUser";

export interface DatabaseUser extends UserPostDetails {
    displayName: string;
    photoURL: string;
    uid: string;
}