import Navbar from '@/components/Navbar';
import '@/styles/globals.css'

const Root = ({ Component, children } : { Component: any, children: any }) => {
    return (
        <>
            <Navbar />
            <div className={`bg-slate-100 sm:px-4 md:px-16 lg:px-48 xl:px-60`}>
                <Component {...children} />
            </div>
        </>
    )
}

export default Root;