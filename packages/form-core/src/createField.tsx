import { ControllerProps } from "react-hook-form"
import { Field } from "./types"
import { Fragment, createElement } from "react"
import { ComponentRegistry } from "./hooks/form-context"
import { useMyFormContext } from "./hooks/form-context"
type MakeFieldProps = {
    MyComponentRegistry: ComponentRegistry
}
const createField = <Props extends Field>({
    MyComponentRegistry,
}:MakeFieldProps) => {
    const Field = ({
        name,
        component:type,
        props = {},
        rules,
        colStyle,
    }: Props & Pick<ControllerProps,  'rules'>) => {
        const { customeRegistry, register, dispatch } = useMyFormContext()
        const component = MyComponentRegistry[type] || Fragment
        if (type === 'custom') {
            const component = customeRegistry[name] || Fragment
            return // write function with createElement with component
        }

        const regMethods = register(name, rules)
        return (
            createElement(component, {
                ...props,
                ...regMethods,
            } as any)
        )
    }
    return Field
}
export default createField