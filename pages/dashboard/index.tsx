import { PostCardComponent } from "@/components/PostCard";
import { AuthState } from "@/lib/enum/AuthState";
import { DbPost, Post } from "@/lib/model/db/Post";
import { useUserData } from "@/lib/userContext";
import { usePostsData } from "@/lib/userPostsContext";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import '@/styles/scrollbar.css'
import { Button } from "@/components/ui/button";
import { PostLoadType } from "@/lib/enum/PostLoadType";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard of things.",
}

const DashboardPage = () => {
    const { userContext } = useUserData();
    
    return userContext?.authState === AuthState.LOGGED_IN ? <PersonalisedDashboardPage /> : <AnonymousDashboardPage />
}

const PersonalisedDashboardPage = ({ }) => {
    const { userData } = useUserData();
    const [postIds, setPostIds] = useState<string[]>([]);
    const [postLoadType, setPostLoadType] = useState<PostLoadType>(PostLoadType.INITIAL);
    const { userPosts } = usePostsData({ postLoadType });
    const [posts, setPosts] = useState<DbPost[]>([]);


    useEffect(() => {
        setPostIds(userData?.postIds ?? []);
    }, [userData])

    useEffect(() => {
        setPosts(userPosts);
    }, [userPosts, posts])

    const loadMore = () => {
        setPostLoadType(PostLoadType.LOAD);
    }

    return (
        <main className={`flex justify-center container m-auto`}>
            <div className={`pt-8`}>
                <div className={`sm:px-16`}>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Personalised Dashboard</h2>
                </div>
                <div className={`flex flex-col items-center md:px-4 lg:px-16 xl:px-24 h-full`}>
                    { posts.length !== 0 && (
                        <>
                            <div>
                                { posts.length > 0
                                    && posts.map((post) => 
                                        <PostCardComponent key={post.id} post={post}/>
                                    )
                                }
                            </div>
                            <div className={`py-4`}>
                                <Button
                                    onClick={loadMore}>
                                        Load more
                                </Button>
                            </div>
                        </>
                    )}
                    { posts.length === 0 && (
                        <>
                            <p>You have no posts!</p>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

const AnonymousDashboardPage = ({ }) => {
    return (
        <main className={`flex flex-col container h-full m-auto`}>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p>You must be logged in!</p>
        </main>
    )
}

export default DashboardPage;