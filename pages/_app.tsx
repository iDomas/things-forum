import '@/styles/globals.css'

const Root = ({ Component, children } : { Component: any, children: any }) => {
    return (
            <Component {...children} />
    )
}

export default Root;