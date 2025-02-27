import { useCallback, Dispatch } from "react"
import { UseFormProps, useForm } from "react-hook-form"
import { Field, FieldBag } from "../types"
import { useSubmit } from "./submit"

type PartialField = Pick<Field, 'defaultValue'>
export type FormInput<T extends PartialField> = {
    fields?: FieldBag<T>
    props?: UseFormProps
    onSubmit: (data:any, getValues?: any) => any
}
export const useMyForm = <T extends PartialField>({
    fields = {},
    props = {
        mode: 'all'
    },
    onSubmit,
}: FormInput<T>) => {
    const defaultValues = Object.entries(fields).reduce((acc, [key, body])=>{
        if (body?.defaultValue) {
            return Object.assign(acc, { [key]: body.defaultValue})
        }
        return acc
    }, {})
    const { ...methods } = useForm({
        defaultValues,
        mode: props?.mode || 'all',
        ...props
    })
    const {handleSubmit, getValues } = methods
    const { submit, submitResponse, submitting } = useSubmit(onSubmit, getValues)
    const submitHook = useCallback(handleSubmit(submit), [onSubmit])

    return {
        methods: { ...methods, forceSubmitHandler: handleSubmit},
        submit: submitHook,
        submitResponse,
        submitting,
    }
}