import React, { PropsWithChildren, createContext, useContext, useEffect, useReducer } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

export type ComponentRegistry<T extends string = string> = Record<T,React.FunctionComponent>
type UseMyFormReturn = UseFormReturn & {
    appContext?: any
    handleAppContext?: (appContext: any) => void
    customeRegistry?: ComponentRegistry
    dispatch?: React.Dispatch<ActionType>
}
type ActionType = { type: 'UPDATE_CONTEXT'; payload: any}

const initialState = {}
export const MyFormContext =  createContext<UseMyFormReturn>(null)
export const useMyFormContext = () => useContext(MyFormContext)

const reducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
        case 'UPDATE_CONTEXT':
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state;
    }
}

export const MyFormProvider = ({
    children,
    appContext,
    handleAppContext,
    ...props
}: PropsWithChildren<UseMyFormReturn>) => {
    const [state, dispatch] = useReducer(reducer, appContext || initialState)
    useEffect(() => {
        handleAppContext && handleAppContext(state)
    }, [state])
    return (
        <MyFormContext.Provider value={{
            ...props,
            appContext:state,
            dispatch
        }}>
            <FormProvider {...props}>{children}</FormProvider>
        </MyFormContext.Provider>
    )
}