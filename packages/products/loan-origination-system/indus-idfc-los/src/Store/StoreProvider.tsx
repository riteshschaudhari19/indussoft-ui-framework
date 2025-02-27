import React, { createContext, PropsWithChildren, useRef } from "react";
import { createStore, StoreProps } from "./store";

export type Store = ReturnType<typeof createStore>

export const StoreContext = createContext<Store | null>(null)

export const StoreProvider = ({
    children,
    customStoreRef,
    ...props
}: PropsWithChildren<StoreProps>) => {
    const storeRef = customStoreRef || useRef<Store>(null)
    if (!storeRef.current) {
        storeRef.current = createStore(props)
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}
