import { AuthState } from "@/lib/enum/AuthState";
import { useUserContext } from "@/lib/userContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forum",
    description: "Read various topics about things.",
}

const ForumPage = ({ }) => {
    const userContext = useUserContext();

    return userContext.authState === AuthState.LOGGED_IN ? <PersonalisedForumPage /> : <AnonymousForumPage />
}

const PersonalisedForumPage = ({ }) => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">Forum</h2>
            <p>Personalised</p>
        </main>
    )
}

const AnonymousForumPage = ({ }) => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h2 className="text-3xl font-bold tracking-tight">Forum</h2>
        </main>
    )
}

export default ForumPage;