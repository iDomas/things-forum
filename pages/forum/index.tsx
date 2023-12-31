import { PostCardComponent } from "@/components/PostCard";
import { db } from "@/lib/firebase";
import { DbPost } from "@/lib/model/db/Post";
import { mapPost } from "@/lib/utils";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
    title: "Forum",
    description: "Read various topics about things.",
}

const ForumPage = ({ }) => {
    return <ForumComponent />
}

const ForumComponent = ({ }) => {
    return (
        <main className={`container flex justify-center h-full m-auto`}>
            <div className={`flex flex-col items-center md:px-4 lg:px-16 xl:px-24 h-full w-full`}>
                <h2 className="text-3xl font-bold tracking-tight py-4">Forum</h2>
                <PostComponent />
            </div>
        </main>
    )
}

const PostComponent = ({ }) => {
    const [posts, setPosts] = useState<DbPost[]>([]);

    useEffect(() => {
        let unsubscribe: any;

        const fetchPosts = async () => {
            unsubscribe = db.collection('/posts')
                .orderBy('createdAt', 'desc')
                .limit(10)
                .onSnapshot((snapshot) => {
                    const posts = snapshot.docs.map(mapPost);
                    setPosts(posts);
            })
        }

        fetchPosts();
        return unsubscribe;
    }, [])

    return posts.length > 0
                && posts.map((post) => 
                    <PostCardComponent key={post.id} post={post}/>
                )
}

export default ForumPage;