import {useState, useCallback} from 'react'
import { useMountedRef } from "../utils/mounted-ref"

type SuccessResponse = {status: 'success'; result: any}
type FailureResponse = {status: 'failed'; error: any}

export type SubmitResponse = SuccessResponse | FailureResponse
export const useSubmit = (onSubmit: any, getValues: any) => {
    const mountedRef = useMountedRef()
    const [submitting, setSubmitting] = useState(false)
    const [submitResponse, setSubmitResponse] = useState<SubmitResponse | undefined>(undefined)

    const submit = useCallback(async (data:any, event: React.FormEvent) => {
        if (event && event.preventDefault && event.isDefaultPrevented) {
            event.preventDefault()
        }
        setSubmitting(true)
        try {
            const result = await onSubmit(data, getValues)
            if (mountedRef.current === false) {
                return
            }
            setSubmitting(false)
            setSubmitResponse({status: 'success', result})
        } catch (error) {
            setSubmitting(false)
            setSubmitResponse({status: 'failed', error})
        }

    }, [mountedRef, onSubmit])
    return {
        submit,
        submitting,
        submitResponse
    }
}