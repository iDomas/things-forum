import { PostCardComponent } from "@/components/PostCard";
import { AuthState } from "@/lib/enum/AuthState";
import { Post } from "@/lib/model/db/Post";
import { useUserData } from "@/lib/userContext";
import { usePostsData } from "@/lib/userPostsContext";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import '@/styles/scrollbar.css'

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
    const { userPosts } = usePostsData();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        setPostIds(userData?.postIds ?? []);
    }, [userData])

    useEffect(() => {
        setPosts(userPosts);
    }, [userPosts, posts])


    return (
        <main className={`flex h-full container m-auto`}>
            <div className={`pt-8`}>
                <div className={`sm:px-16`}>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Personalised <br /> Dashboard</h2>
                </div>
                <div className={`flex flex-col items-center md:px-4 lg:px-16 xl:px-24 h-full`}>
                    <div className={`h-full`}>
                        { posts.length > 0
                            && posts.map((post) => 
                                <PostCardComponent key={post.id} post={post}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

const AnonymousDashboardPage = ({ }) => {
    return (
        <main className={`flex flex-col justify-center h-full px-4 sm:px-16 md:px-48 lg:px-60 xl:px-80`}>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </main>
    )
}

export default DashboardPage;