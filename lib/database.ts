import { db } from "./firebase";
import { AppUser } from "./model/AppUser";
import { DbPost, Post } from "./model/db/Post";
import { createIdFromTitle } from "./utils";
import { serverTimestamp } from "firebase/firestore";
import firebase from 'firebase/compat/app';

const insertNewPost = ( { post, userContext } : { post: Post, userContext: AppUser }): Promise<void> => {
    const postId = createIdFromTitle(post.title);
    const dbPost: DbPost = {
        ...post,
        id: postId,
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
    insertNewPost,
    getPostIds,
}
