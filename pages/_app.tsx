import Navbar from '@/components/Navbar';
import { useUserData } from '@/lib/userContext';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';
import LoadingComponent from '@/components/util/loadingComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Things Forum",
    description: "A forum for things.",
}

const Root = ({ Component, children } : { Component: any, children: any }) => {
    const { userContext } = useUserData();

    return (
        <>
            <div className={`bg-slate-50  h-full`}>
                <Navbar user={userContext} />
                <LoadingComponent />
                <div className={`h-full pt-20 flex flex-col min-h-screen`}>
                    <Component {...children}/>
                    <span className='z-20'>
                        <Toaster />
                    </span>
                </div>
            </div>
        </>
    )
}

export default Root;
