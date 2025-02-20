import React, { useEffect, useState } from 'react'
// import { useParam, useSearchParam } from 'react-router-dom'
import * as ProductAPI from '{{indus.product.package.name}}'
// import '{{indus.product.package.name}}/dist/index.css'

const Driver = ({abc}) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        try {
            // make an api call here to get data
            setData()
        } catch (e) {
            setError(e)
            setLoading(false)
        }
    }, [])

    return (
        <>
        <ProductAPI.ProductPage config={'config'} data={{isLoading:loading, productData:data}} />
        <div>I am driver</div>
        </>
    )
}
export default Driver