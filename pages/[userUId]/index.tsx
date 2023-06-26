import { useUserContext } from "@/lib/userContext";
import { useRouter } from "next/router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AuthState } from "@/lib/enum/AuthState";
import ProfileImageComponent from "@/components/ProfileImage";

const UserProfilePage = ({ }) => {
    const userContext = useUserContext();

    return (
        userContext.authState === AuthState.LOGGED_IN ? <UserLoggedIn /> : <UserNotLoggedIn />
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
        <main className={`flex flex-col justify-center items-center h-screen`}>
            <div className="h-40 w-40 mb-12">
                <ProfileImageComponent photoURL={userContext.photoURL} />
            </div>

            <p className="mb-4">Welcome!</p>
            <h1 className="text-4xl font-semibold">{userContext.displayName}</h1>
        </main>
    )
}

export default UserProfilePage;
