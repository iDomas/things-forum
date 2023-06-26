import { useLoadingContext } from '@/lib/util/loadingContext';
import PacmanLoader from 'react-spinners/PacmanLoader';

export const LoadingComponent = ({ }) => {
    const loadingContext = useLoadingContext();

    return (
        <>
            { loadingContext.isLoading && (
                    <>
                        <div className={`absolute z-30`}>
                            <div className={`w-screen h-screen flex items-center justify-center`}>
                                <PacmanLoader size={50} color={`orange`} loading={loadingContext.isLoading} />
                            </div>
                        </div>
                        <div className={`absolute m-auto left-0 right-0 z-10 bg-slate-200 opacity-50`}>
                            <div className={`w-screen h-screen flex items-center justify-center`}>
                                
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default LoadingComponent;