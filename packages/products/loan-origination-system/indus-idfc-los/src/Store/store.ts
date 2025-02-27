import React from "react"
import { createStore as createZustandStore } from "zustand"

export type StoreProps = {
    config: any
    showModal?: boolean
    customStoreRef?: React.MutableRefObject<any>
    // screenData: any
    fields: any
    stageJson: any
    layoutData: any
    productData: any
    // formData: any
    // appMetaData: {
    //     inAuthId?: string
    // }
    // registry: {
    //     [key: string]: {
    //         order: {
    //             id: string
    //             title: string
    //             icon?: string
    //         }[]
    //     }
    // }
    errorPage?: {
        show: boolean
        message: string
        analytics: any
        errorType?: string
    }
}
export type StoreActions = {
    updateConfig: (config: any) => any
    showErrorPage: (msg: string, analytics?: {element: string; details:string}) => any
    toggleModal: () => any
}
export type StoreState = StoreProps & StoreActions

export const createStore = (initProps?: Partial<StoreProps>) => {
    console.log('initProps=>', initProps);
    
    const DEFAULT_PROPS: StoreProps = {
        config: initProps?.config || {},
        layoutData: initProps?.layoutData,
        fields: initProps?.stageJson?.fields,
        stageJson: initProps?.stageJson,
        errorPage: { show: false, message: '', analytics: {}},
        // appMetaData: initProps?.config?.appMetaData,
        // formData: initProps?.formData,
        productData: initProps?.productData || null,
        // screenData: initProps?.screenData || null,
        // registry: initProps?.registry
    }
    return createZustandStore<StoreState>()((set)=>{
        return {
            ...DEFAULT_PROPS,
            ...initProps,
            updateConfig: (config) => {
                set({ config })
            },
            toggleModal: () => {
                set((state)=> ({showModal: !state.showModal}))
            },
            showErrorPage: (msg, analytics?: { element: string; details?: string }) => set(()=>({
                errorPage: { show:true, message: msg, analytics: { ...analytics }}
            }))
        }
    })
}