import { PostCardComponent } from "@/components/PostCard";
import { AuthState } from "@/lib/enum/AuthState";
import { DbPost } from "@/lib/model/db/Post";
import { useUserData } from "@/lib/userContext";
import { usePostsData } from "@/lib/userUserDashboardContext";
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
    const [postLoadType, setPostLoadType] = useState<PostLoadType>(PostLoadType.INITIAL);
    const { userPosts } = usePostsData({ postLoadType });
    const [posts, setPosts] = useState<DbPost[]>([]);

    useEffect(() => {
        setPosts(userPosts);
    }, [userPosts, posts])

    const loadMore = () => {
        setPostLoadType(PostLoadType.LOAD);
    }

    return (
        <main className={`flex flex-col items-center container m-auto`}>
            <div className={`sm:px-16`}>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Personalised Dashboard</h2>
            </div>
            <div className={`flex flex-col items-center md:px-4 lg:px-16 xl:px-24 h-full w-full`}>
                { posts.length !== 0 && (
                    <>
                        { posts.length > 0
                            && posts.map((post) => 
                                <PostCardComponent key={post.id} post={post}/>
                            )
                        }
                        { posts.length % 5 === 0 && (
                            <div className={`py-4`}>
                                <Button
                                    onClick={loadMore}>
                                        Load more
                                </Button>
                            </div>
                        )}
                        { posts.length % 5 !== 0 && (
                            <p>No more posts!</p>
                        )}
                    </>
                )}
                { posts.length === 0 && (
                    <>
                        <p>You have no posts!</p>
                    </>
                )}
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