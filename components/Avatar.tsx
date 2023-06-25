import { AppUser } from "@/lib/model/AppUser";
import { useUserContext } from "@/lib/userContext";
import { NavLink } from "./Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const AvatarComponent = ({ user } : { user: AppUser}) => {
    return (
        <DropdownMenuProfile user={user} />
    )
}

export default AvatarComponent;

const DropdownMenuProfile = ({ user } : { user: AppUser }) => {
    let userContext = useUserContext();

    let signOut = () => {
        userContext.signOut();
        userContext.setUser(undefined);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar >
                    { 
                        user && user.photoURL && (
                            <AvatarImage src={user.photoURL}></AvatarImage>
                        ) 
                    }
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <NavLink to={`/${user.uid}`}>
                            Profile
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={signOut}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
