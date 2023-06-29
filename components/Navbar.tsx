import { AuthState } from "@/lib/enum/AuthState";
import { AppUser } from "@/lib/model/AppUser";
import Link from "next/link";
import { useState } from "react";
import AvatarComponent from "./Avatar";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

const NavLink = ({ to, linkText, children }:  { to: string, linkText?: string, children?: any }) => {
    return (
        <>
            {
                linkText && !children && (
                    <Link href={to} className={`text-slate-400 mx-4 transition duration-300 ease-in-out hover:scale-110 hover:text-slate-700 active:text-amber-500`}>
                        { linkText }
                    </Link>
                )
            }
            {
                !linkText && children && (
                    <Link href={to} className={`transition duration-300 ease-in-out hover:scale-110`}>
                        { children }
                    </Link>
                )
            }
        </>
    )
}

const MobileNavLink = ({ to, close, className, linkText, children } : { to: string, close: any, className?: any, linkText?: string, children?: any }) => {
    return (
        <>
            { !linkText && children && (
                <Link href={to} onClick={close} className={className}>
                    {children}
                </Link>
            )}
            { linkText && !children && (
                <Link href={to} onClick={close} className={`text-2xl font-light my-2 active:text-amber-500`} >
                    {linkText}
                </Link>
            )}
        </>
    )
}

const MobileNav = ({ open, setOpen, user }:  { open: any, setOpen: any, user: AppUser | undefined}) => {
    const close = () => setOpen(false);
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md`}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <Link href={"/"} onClick={close}>
                    <span className={`text-2xl font-bold text-slate-600`}>THINGS</span>
                </Link>
            </div>
            <div className="flex flex-col ml-4 h-50">
                <div className={`flex justify-center items-center mt-8`} >
                    { user && user.authState === AuthState.LOGGED_IN && (
                        <MobileNavLink to={`/${user.uid}`} close={close}>
                            <Avatar >
                            { 
                                user && user.photoURL && (
                                    <AvatarImage src={user.photoURL}></AvatarImage>
                                ) 
                            }
                            </Avatar>
                        </MobileNavLink>
                    )
                    }
                </div>
                { user && user.authState === AuthState.LOGGED_IN && (
                        <MobileNavLink 
                            to={"/write-a-thing"} 
                            linkText={`Write A Thing`} 
                            close={close}>
                        </MobileNavLink>
                    )
                }
                { user && user.authState === AuthState.LOGGED_IN && (
                        <MobileNavLink 
                            to={"/dashboard"} 
                            close={close}
                            linkText={`Dashboard`}>
                        </MobileNavLink>
                    )
                }
                <MobileNavLink 
                    to={"/forum"} 
                    close={close}
                    linkText={`Forum`}>
                </MobileNavLink>

                { user?.authState === AuthState.LOGGED_OUT && ( 
                    <MobileNavLink 
                        to={"/login"} 
                        close={close}
                        linkText={`Login / Sign Up`}>
                    </MobileNavLink>                 
                )}

                { user?.authState === AuthState.LOGGED_IN && (   
                    <MobileNavLink 
                        to={"/login"} 
                        close={close}
                        linkText={`Sign Out`}>
                    </MobileNavLink>                 
                )}
            </div>
        </div>
    )
}


const Navbar = ({ user } : { user: AppUser | undefined }) => {
    const [open, setOpen] = useState(false);

    return (
        <nav className={`absolute w-full flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center`}>
            <MobileNav open={open} user={user} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center justify-center">
                <Link href={"/"} className={`transition duration-300 ease-in-out hover:scale-110`}>
                    <span className="text-xl font-bold">THINGS</span>
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
                    <NavLink to="/forum" linkText='Forum'></NavLink>
                    { user && user.authState === AuthState.LOGGED_IN && (
                        <NavLink to="/dashboard" linkText={`Dashboard`}></NavLink>
                        )
                    }
                    { user && user.authState === AuthState.LOGGED_IN && (
                            <NavLink to="/write-a-thing" linkText={`Write a Thing`}></NavLink>
                        )
                    }
                    
                    <span className="mx-4"></span>
                    { user && user.authState === AuthState.LOGGED_IN && (
                            <div className={`transition duration-300 ease-in-out hover:scale-110`}>
                                <AvatarComponent user={user} />
                            </div>
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

