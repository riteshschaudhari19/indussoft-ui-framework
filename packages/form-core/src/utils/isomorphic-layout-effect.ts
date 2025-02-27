import { useEffect, useLayoutEffect } from 'react'

const canUseDOM = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined'

// A hook that resolves to useEffect on the server and useLayoutEffect on the client
export const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect