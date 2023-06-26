import { getPostIds } from "@/lib/database";
import { AuthState } from "@/lib/enum/AuthState";
import { useUserContext } from "@/lib/userContext";
import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard of things.",
}

const DashboardPage = () => {
    const userContext = useUserContext();
    
    return userContext?.authState === AuthState.LOGGED_IN ? <PersonalisedDashboardPage /> : <AnonymousDashboardPage />
}

const PersonalisedDashboardPage = ({ }) => {
    const userContext = useUserContext();

    useEffect(() => {
        if (userContext && userContext.postIds.length === 0) {
            const getIds = async () => {
                const { postIds } = await getPostIds({ userUId: userContext.uid });
                userContext.setUser({
                    postIds: [...postIds]
                })
            }

            getIds();
        }
        
    }, [])

    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p>Personalised</p>
            <ul>
                { userContext && userContext.postIds 
                    && userContext.postIds.map((postId) => 
                        <li key={postId}>{postId}</li>
                    )
                }
            </ul>
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