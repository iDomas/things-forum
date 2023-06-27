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
        <main className={`flex flex-col justify-end h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Personalised Dashboard</h2>
            <div className={`flex flex-col  items-center h-5/6`}>
                <div className={`scale-smooth overflow-y-auto no-scrollbar h-full`}>
                    { posts.length > 0
                        && posts.map((post) => 
                            <PostCardComponent key={post.id} post={post}/>
                        )
                    }
                </div>
            </div>
        </main>
    )
}

const AnonymousDashboardPage = ({ }) => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </main>
    )
}

export default DashboardPage;