import { Button } from "@/components/ui/button";
import { login, signOut } from "@/lib/auth/userLoginLogout";
import { AuthState } from "@/lib/enum/AuthState";
import { useUserContext } from "@/lib/userContext";

const LoginPage = () => {
    const userContext = useUserContext();
    return (
        userContext?.authState === AuthState.LOGGED_IN ? <LogoutComponent /> : <LoginComponent />
    )
}

const LoginComponent = () => {
    return (
        <main className={`flex flex-col justify-center h-screen`}>
            <h1 className="text-2xl">Logiin Page</h1>
            <Button onClick={() => login()}>
                Login
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
