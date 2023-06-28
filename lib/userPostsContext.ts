import { useEffect, useState } from "react";
import { DbPost } from "./model/db/Post";
import { useUserData } from "./userContext";
import { AuthState } from "./enum/AuthState";
import { db } from "./firebase";
import { mapPost } from "./utils";
import { PostLoadType } from "./enum/PostLoadType";

const usePostsData = (
        { postLoadType } : { postLoadType: PostLoadType }
    ) => {
    const { userData } = useUserData();
    const [userPosts, setUserPosts] = useState<DbPost[]>([]);
    const [lastVisible, setLastVisible] = useState<any>();

    
    useEffect(() => {
        let unsubscribe: any;
        
        if (userData?.authState === AuthState.LOGGED_IN
            && userData?.uid
        ) {
            if (PostLoadType.NOT_LOAD === postLoadType) {
                return;
            }
            if (PostLoadType.RESET === postLoadType) {
                setUserPosts([]);
                setLastVisible(undefined);
                return;
            }
            if (PostLoadType.INITIAL === postLoadType && !lastVisible) {
                const postsRef = db.collection(`posts`);
                const firstQuery = postsRef
                    .where('authorUid', '==', userData.uid)
                    .orderBy('createdAt', 'desc')
                    .limit(5);
                unsubscribe = firstQuery.onSnapshot((querySnapshot) => {        
                    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                    const posts = querySnapshot.docs.map((doc) => mapPost(doc));
                    setUserPosts(posts);
                })
                return unsubscribe;
            }
            if (PostLoadType.LOAD === postLoadType && lastVisible) {
                let next = db.collection(`posts/user/${userData.uid}`)
                    .where('authorUid', '==', userData.uid)
                    .orderBy('createdAt', 'desc')
                    .startAfter(lastVisible)
                    .limit(5);

                next.onSnapshot((nextQuerySnapshot) => {
                    const posts = nextQuerySnapshot.docs.map((doc) => mapPost(doc));
                    setLastVisible(nextQuerySnapshot.docs[nextQuerySnapshot.docs.length - 1]);
                    setUserPosts([...userPosts, ...posts]);
                })
            }
        }

        return unsubscribe;
    }, [userData, postLoadType])

    return { userPosts }
}

export { usePostsData };
