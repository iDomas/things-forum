import { AuthState } from "@/lib/enum/AuthState";
import { AppUser } from "@/lib/model/AppUser";
import Link from "next/link";
import { useState } from "react";
import AvatarComponent from "./Avatar";
import { Button } from "./ui/button";

const NavLink = ({ to, linkText, children }:  { to: string, linkText?: string, children?: any }) => {
    return (
        <>
            {
                linkText && !children && (
                    <Link href={to} className={`mx-4`}>
                        { linkText }
                    </Link>
                )
            }
            {
                !linkText && children && (
                    <Link href={to}>
                        { children }
                    </Link>
                )
            }
        </>
    )
}

const MobileNav = ({ open, setOpen, user }:  { open: any, setOpen: any, user: AppUser | undefined}) => {
    const close = () => setOpen(false);
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md`}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <Link href={"/"} onClick={close}>
                    <span className="text-2xl font-semi-bold">THINGS</span>
                </Link>
            </div>
            <div className="flex flex-col ml-4 h-50">
                <div className={`flex justify-center items-center mt-8`} >
                    { user && user.authState === AuthState.LOGGED_IN && (
                            <AvatarComponent user={user} />
                        )
                    }
                </div>
                { user && user.authState === AuthState.LOGGED_IN && (
                        <Link href={"/write-a-thing"} className={`my-2`}  onClick={close}>
                            <span className="text-2xl font-light my-4">
                                Write A Thing
                            </span>
                        </Link>
                    )
                }
                <Link href={"/dashboard"} className={`my-2`}  onClick={close}>
                    <span className="text-2xl font-light my-4">
                        Dashboard
                    </span>
                </Link>
                <Link href={"/Forum"} className={`my-2`}  onClick={close}>
                    <span className="text-2xl font-light my-4">
                        Forum
                    </span>
                </Link>

                { user?.authState === AuthState.LOGGED_OUT && (
                    <Link href={"/login"} className={`my-2`}  onClick={close}>
                        <span className="text-2xl font-light my-4">
                            Login/Sign Up
                        </span>
                    </Link>                    
                    )
                }
            </div>
        </div>
    )
}


const Navbar = ({ user } : { user: AppUser | undefined }) => {
    const [open, setOpen] = useState(false);

    return (
        <nav className={`absolute w-full flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center`}>
            <MobileNav open={open} user={user} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <Link href={"/"}>
                    <span className="text-xl font-semi-bold">THINGS</span>
                </Link>
            </div>
            <div className={`w-9/12 flex justify-end items-center`}>
                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex items-center">
                    { user && user.authState === AuthState.LOGGED_IN && (
                            <NavLink to="/write-a-thing" linkText={`Write a Thing`}></NavLink>
                        )
                    }
                    { user && user.authState === AuthState.LOGGED_IN && (
                        <NavLink to="/dashboard" linkText={`Dashboard`}></NavLink>
                        )
                    }
                    
                    <NavLink to="/forum" linkText='Forum'></NavLink>
                    <span className="mx-4"></span>
                    { user && user.authState === AuthState.LOGGED_IN && (
                            <AvatarComponent user={user} />
                        )
                    }
                    { user?.authState === AuthState.LOGGED_OUT && (
                            <NavLink to={`/login`}>
                                <Button>Login / Sign Up</Button>
                            </NavLink>                        
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
export { NavLink };

