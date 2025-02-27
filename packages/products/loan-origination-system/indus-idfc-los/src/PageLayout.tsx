import React, { useEffect, useRef } from "react"
import { StoreProvider, StoreType, useStore } from "./Store"
import ProductWizard from "./stages"
const PageLoadingShell = () => {
    return (<div>Loading...</div>)
}
const PageLayout = () => {
    const errorPage = useStore((state) => state.errorPage)
    if (errorPage.show) {
        return (
            <div>{'errorPage component here'}</div>
        )
    }
    return (
        <main>
            <section id="indusHeader">
                <div>{'HeaderComponent'}</div>
            </section>
            <section>
                <div className="container">
                    <ProductWizard />
                    {/* <Timeout /> */}
                </div>
            </section>
        </main>
    )
}
type MainComponentProps = {
    config: IndusConfig,
    data: {
        isLoading: boolean
        error?: any
        productData: any
    }
}
const App = ({data, config}: MainComponentProps) => {
    console.log('data, config=', data, config);
    
    const storeRef = useRef<StoreType>(null)
    useEffect(()=>{
        const {inAuth} = config.external || {}
        if (storeRef.current && inAuth ) {
            const {updateConfig = (_config: any)=> null} = storeRef.current.getState() || {}
            updateConfig(config)
        }
    },[config.external?.inAuth, storeRef.current])
    console.log('dfff=', data.productData);
    if (data.isLoading) {
        return <PageLoadingShell />
    }
    if (data.error) {
        return <div /> //TODO
    }
    
    return (
        <StoreProvider
            {...{...data.productData, config, }}
        >
            <PageLayout />
        </StoreProvider>
    )
}
export default App