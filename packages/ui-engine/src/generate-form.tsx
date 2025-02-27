import React from "react";
import { ComponentRegistry, MyFormProvider } from "@indussoft/form-core";
import { useMyForm } from "@indussoft/form-core";
import GetField, { MyField } from "./GetField";
import { useRef } from "react";
import { Form } from "@indussoft/form-core/src/types";
import xssFilter from "./xssFilter";
type sectionProps = {
    title?: string
    header?: string
    footer?: string
    layout: {name: string, colStyle?: string} []
    fields: Record<string, MyField>  // fields: Record<string, MyField | PresentationComponent>
}
const RenderSection = ({title, header, layout, fields, footer}: sectionProps) => {
    return (
        <div>
            <span>{title}</span>
            {header && (
                <div>{React.createElement('span', {
                    dangerouslySetInnerHTML: { __html: xssFilter(header)}
                })}</div>
            )}
            <div>
                {layout.map(({name, colStyle})=>{
                    if (!fields[name]) {
                        return null
                    }
                    const myFieldProps = fields[name] as MyField
                    console.log('name', name);
                    console.log('myFieldProps=',myFieldProps);
                    
                    
                    return <GetField
                        key={name}
                        name={name}
                        {...myFieldProps}
                        colStyle={colStyle}
                    />
                })}
            </div>
            {footer && (
                <div>{React.createElement('span', {
                    dangerouslySetInnerHTML: { __html: xssFilter(footer)}
                })}</div>
            )}
        </div>
    )
}
export type GenerateFormProps = Form<MyField> & {
    appContext?: any
    layout: {
        sections: Record<string, any>,
        order: string[]
    }
    customeRegistry?: ComponentRegistry,
    buildSchema?: (fields: any, appContext?: () => any) => Form<MyField>['validationSchema']
}
const GenerateForm = ({
    initialValues,
    appContext,
    customeRegistry,
    onSubmit,
    buildSchema,
    fields,
    layout: {order, sections},
}: GenerateFormProps) => {
    const contextRef = useRef(null)
    const setAppContext = (val: any) => {
        if (val) {
            contextRef.current = val
        }
    }
    const getAppContext = () => {
        return contextRef.current || null
    }
    const { methods, submit, submitting, submitResponse } = useMyForm({
        fields: initialValues,
        props: {
            mode: 'onTouched',
            resolver: buildSchema && buildSchema(fields, getAppContext)
        },
        onSubmit,
    })
    return(
        <MyFormProvider
            {...methods}
            handleAppContext={setAppContext}
            customeRegistry={customeRegistry}
            appContext={appContext}
        >
            <form>
                {order.map((section) => {
                    const {
                        title,
                        header,
                        fields: fieldLayout,
                    } = sections[section]
                    return (
                        <RenderSection
                            title={title}
                            header={header}
                            fields={fields}
                            layout={fieldLayout}
                        />
                    )
                })}
            </form>
        </MyFormProvider>
    )
}
export default GenerateForm