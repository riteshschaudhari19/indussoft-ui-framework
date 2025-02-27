import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from './isomorphic-layout-effect'

/* A react hook for checking if your component is mounted*/
export const useMountedRef = () => {
    const mounted = useRef(true)
    useIsomorphicLayoutEffect(()=>{
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])
    return mounted
}