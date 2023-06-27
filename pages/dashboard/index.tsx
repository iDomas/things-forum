import { AuthState } from "@/lib/enum/AuthState";
import { useUserData } from "@/lib/userContext";
import { Metadata } from "next";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        setPostIds(userData?.postIds ?? []);
    }, [userData])


    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">Personalised Dashboard</h2>
            <p></p>
            <ul>
                { postIds.length > 0
                    && postIds.map((postId) => 
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