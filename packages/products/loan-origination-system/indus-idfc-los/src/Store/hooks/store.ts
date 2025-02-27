import { useContext } from "react";
import { useStore as useZustandStore } from "zustand";
import { StoreState } from "../store";
import { StoreContext } from "../StoreProvider";

export function useStore<T>(selector: (state: StoreState) => T): T {
    const store = useContext(StoreContext)
    if (!store) {
        throw new Error('Missing StoreProvider in the tree, wrap your app with StoreProvider')
    }
    return useZustandStore(store, selector)
}