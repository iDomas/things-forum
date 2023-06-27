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
            <Navbar user={userContext} />
            <LoadingComponent />
            <div className={`bg-slate-50 px-4 sm:px-16 md:px-48 lg:px-60 xl:px-80`}>
                <Component {...children} />
                <span className='z-20'>
                    <Toaster />
                </span>
            </div>
        </>
    )
}

export default Root;
