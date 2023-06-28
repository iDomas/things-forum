import { useUserData } from "@/lib/userContext";
import { AuthState } from "@/lib/enum/AuthState";
import ProfileImageComponent from "@/components/ProfileImage";

const UserProfilePage = ({ }) => {
    const { userContext } = useUserData();

    return (
        userContext.authState === AuthState.LOGGED_IN ? <UserLoggedIn /> : <UserNotLoggedIn />
    )
}

const UserNotLoggedIn = ({ }) => {
    return (
        <main className={`flex flex-col container h-full m-auto`}>
            <h1>Forbidden!</h1>
        </main>
    )
}

const UserLoggedIn = ({ }) => {
    const { userContext } = useUserData();

    return (
        <main className={`container flex flex-col items-center m-auto h-full`}>
            <div className="h-40 w-40 mb-12">
                <ProfileImageComponent photoURL={userContext.photoURL} />
            </div>

            <p className="mb-4">Welcome!</p>
            <h1 className="text-4xl font-semibold">{userContext.displayName}</h1>
        </main>
    )
}

export default UserProfilePage;
