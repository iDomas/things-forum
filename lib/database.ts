import { db } from "./firebase";
import { AppUser } from "./model/AppUser";
import { DatabaseUser } from "./model/db/DatabaseUser";

const insertNewUser = ( { user, userContext } : { user: DatabaseUser, userContext: AppUser }) => {
    const usersRef = db.collection("users")
    usersRef.doc(userContext.uid).get().then((doc) => {
        if (!doc.exists) {
            usersRef.doc(userContext.uid).set(user);
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

export { insertNewUser }