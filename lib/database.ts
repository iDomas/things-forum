import { db } from "./firebase";
import { AppUser } from "./model/AppUser";
import { DatabaseUser } from "./model/db/DatabaseUser";
import { DbPost, Post } from "./model/db/Post";
import { createIdFromTitle } from "./utils";
import { serverTimestamp } from "firebase/firestore";

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

const insertNewPost = ( { post, userContext } : { post: Post, userContext: AppUser }): Promise<void> => {
    const postId = createIdFromTitle(post.title);
    const dbPost: DbPost = {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    }
    const postsRef = db.collection(`posts/user/${userContext.uid}`).doc(postId).set(dbPost);
    return postsRef;
}

export { 
    insertNewUser,
    insertNewPost
}
