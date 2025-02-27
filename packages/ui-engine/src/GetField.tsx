import { InputField } from "@indussoft/antd-components"
import { ComponentRegistry, createField } from "@indussoft/form-core"
import { Field } from "@indussoft/form-core/src/types"

type ComponentType = 'text'
type MyInput = Field & {
    component : 'text',
    props: any
}
export type MyField =
| MyInput


// export type PresentationComponent =
// |   MyCollapcibleComponent
// |   ListRendererComponent

const MyComponentRegistry: ComponentRegistry<ComponentType> = {
    text: InputField,
} as const

const GetField = createField<MyField>({ MyComponentRegistry })
export default GetField