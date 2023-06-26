import { AuthState } from "@/lib/enum/AuthState";
import { db } from "@/lib/firebase";
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
        

        
    }, [])

    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p>Personalised</p>
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