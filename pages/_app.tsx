import Navbar from '@/components/Navbar';
import '@/styles/globals.css'

const Root = ({ Component, children } : { Component: any, children: any }) => {
    return (
        <div className='bg-slate-100'>
            <Navbar />
            <Component {...children} />
        </div>
    )
}

export default Root;