import { db } from "./firebase";
import { AppUser } from "./model/AppUser";
import { DbPost, Post } from "./model/db/Post";
import { createIdFromTitle } from "./utils";
import { serverTimestamp } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { DatabaseUser } from "./model/db/DatabaseUser";

const insertNewUser = ( { userContext } : { userContext: AppUser }) => {
    const userRef = db.collection("users").doc(userContext.uid);
    const newUser: DatabaseUser = {
        uid: userContext.uid,
        displayName: userContext.displayName,
        photoURL: userContext.photoURL,
        postIds: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    }
    userRef.set(newUser)
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}


const insertNewPost = ( { post, userContext } : { post: Post, userContext: AppUser }): Promise<void> => {
    const postId = createIdFromTitle(post.title);
    const dbPost: DbPost = {
        ...post,
        id: postId,
        author: userContext.displayName,
        authorUid: userContext.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    }

    return db.runTransaction((transaction: any) => {
        const userRef = db.collection('/users').doc(userContext.uid);
        return transaction.get(userRef as any).then((doc: any) => {
            if (doc.exists) {
                db.collection(`posts`).add(dbPost);

                transaction.update(userRef as any, {
                    postIds: firebase.firestore.FieldValue.arrayUnion(postId),
                });
            }
        })
    })
}

const getPostIds = async ({ userUId } : { userUId: string }) => {
    const usersDoc = await db.collection('users').doc(userUId).get();

    let postIds: string[] = [];
    if (usersDoc.exists) {
        const usersData = usersDoc.data();
        if (usersData) {
            postIds = usersData.postIds;
        }
    }

    return { postIds }
}

export { 
    insertNewUser,
    insertNewPost,
    getPostIds,
}
