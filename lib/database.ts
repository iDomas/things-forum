import { db } from "./firebase";
import { AppUser } from "./model/AppUser";
import { DatabaseUser } from "./model/db/DatabaseUser";
import { DbPost, Post } from "./model/db/Post";
import { createIdFromTitle } from "./utils";
import { serverTimestamp } from "firebase/firestore";
import firebase from 'firebase/compat/app';

const initUser = ({ user, userUId } : { user: DatabaseUser, userUId: string }) => {
    if (userUId.length === 0) {
        throw new Error("User has no userUId");
    }
    db.collection('users').doc(userUId).set(user, { merge: true}); 
}

const insertNewPost = ( { post, userContext } : { post: Post, userContext: AppUser }): Promise<void> => {
    const postId = createIdFromTitle(post.title);
    const dbPost: DbPost = {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    }

    let batch = db.batch();
    const postsRef = db.collection(`posts/user/${userContext.uid}`).doc(postId);
    batch.set(postsRef, dbPost);

    const userRef = db.collection("users").doc(userContext.uid);
    batch.update(userRef, {
        postIds: firebase.firestore.FieldValue.arrayUnion(postId),
    });

    return batch.commit();
}

const getPostIds = ({ userUId, userContext } : { userUId: string, userContext: AppUser }) => {
    if (userUId.length === 0) {
        return;
    }

    console.log(userContext);
    
    const postsRef = db.collection(`/users`).doc(userUId);
    postsRef.get().then((doc) => {
        if (doc.exists && doc.data() !== undefined && doc.data()?.postIds !== undefined) {
            // userContext.postIds = doc.data()?.postIds;
            userContext.setUser({
                ...userContext,
                postIds: doc.data()?.postIds,
            });
        }
    });
}

export { 
    insertNewPost,
    initUser,
    getPostIds
}
