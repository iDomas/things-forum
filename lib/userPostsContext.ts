import { useEffect, useState } from "react";
import { DbPost } from "./model/db/Post";
import { useUserData } from "./userContext";
import { AuthState } from "./enum/AuthState";
import { db } from "./firebase";
import { mapPost } from "./utils";

const usePostsData = () => {
    const { userData } = useUserData();
    const [userPosts, setUserPosts] = useState<DbPost[]>([]);

    useEffect(() => {
        let unsubscribe: any;

        if (userData?.authState === AuthState.LOGGED_IN && userData?.uid) {
            const ref = db.collection(`posts/user/${userData.uid}`);
            const query = ref.orderBy('createdAt', 'desc').limit(5);
            unsubscribe = query.onSnapshot((querySnapshot) => {
                const posts = querySnapshot.docs.map((doc) => mapPost(doc));
                setUserPosts(posts);
            })
        }

        return unsubscribe;
    }, [userData])

    return { userPosts }
}

export { usePostsData };
