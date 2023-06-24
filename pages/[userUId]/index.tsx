import { useUserContext } from "@/lib/userContext";
import { useRouter } from "next/router";

const UserProfilePage = ({ }) => {
    const { query } = useRouter();
    const userContext = useUserContext();

    return (
        query.userUId === userContext.uid ? <UserLoggedIn /> : <UserNotLoggedIn />
    )
}

const UserNotLoggedIn = ({ }) => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h1>Forbidden!</h1>
        </main>
    )
}

const UserLoggedIn = ({ }) => {
    const userContext = useUserContext();

    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h1>Welcome {userContext.displayName}!</h1>
        </main>
    )
}

export default UserProfilePage;
