import { create } from "zustand";

export interface LoadingContext {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

const useLoadingContext = create<LoadingContext>((set) => ({
    isLoading: false,
    setLoading: (isLoading: boolean) => set(() => ({ isLoading }))
}))

export { useLoadingContext }