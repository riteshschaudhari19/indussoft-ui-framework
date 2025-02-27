import { useContext } from "react"
import { StoreContext } from "../StoreProvider"

export const useStoreActions = () => {
    const store = useContext(StoreContext)
    const toggleModal = () => {
        store.setState((state)=>({showModal: !state.showModal}))
    }
    const showErrorPage = (msg: string, analytics?:{element:string; detail?:string}, errorType?: string) => {
        store.setState(()=>({
            errorPage: {
                show: true,
                message: msg,
                analytics: {...analytics},
                errorType,
            },
        }))
    }

    return {
        toggleModal,
        showErrorPage,
    }
}