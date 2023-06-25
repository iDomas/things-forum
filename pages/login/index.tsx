import { Button } from "@/components/ui/button";
import { login, signOut } from "@/lib/auth/userLoginLogout";
import { AuthState } from "@/lib/enum/AuthState";
import { AppUser } from "@/lib/model/AppUser";
import { useUserContext } from "@/lib/userContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login or Sign Up",
    description: "Access forum.",
}

const LoginPage = () => {
    const userContext = useUserContext();

    return (
        userContext?.authState === AuthState.LOGGED_IN ? <LogoutComponent /> : <LoginComponent userContext={userContext}/>
    )
}

const LoginComponent = ({ userContext } : { userContext: AppUser }) => {

    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h1 className="text-2xl">Login Page</h1>
            <p>We use Google auth, with same button login and sign up.</p>
            <Button onClick={() => login({ userContext })}>
                Login / Sign Up
            </Button>
        </main>
    );
}

const LogoutComponent = () => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h1 className="text-2xl">Sign Out</h1>
            <Button onClick={() => signOut()}>
                Log Out
            </Button>
        </main>
    )
}

export default LoginPage;
