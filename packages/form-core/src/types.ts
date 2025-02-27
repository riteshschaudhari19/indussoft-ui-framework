import { FieldValues, Resolver } from "react-hook-form"
import { DependsOn } from "./conditional-evaluation/types"

type Operator = 'equal' | 'in' | 'notEmpty'
type conditionalCopy = {
    field:{
        name: string
        value: any
        operator: Operator
    }
}
export type Field = {
    name: string
    type?: 'string' | 'number' | 'date'
    component: string
    defaultValue?: string | number | boolean
    value?: any
    props?: object
    dependsOn?: DependsOn
    conditionalCopy?: conditionalCopy
    colStyle?: any
}

export type Form<T extends Field> = {
    title?: string
    name?: string
    fields: FieldBag<T>
    onSubmit?: 
    | ((formData: any, getValues?: any) => Promise<unknown>)
    | ((formData: any) => void)
    initialValues?: FieldValues
    onValidate?: (field: object) => void
    validationSchema?: Resolver<FieldValues, any>
}

export type FieldBag<T> = {
    [key: string]: T
}