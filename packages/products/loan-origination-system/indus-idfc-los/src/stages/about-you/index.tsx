import React from "react";
import { GenerateForm } from '@indussoft/ui-engine'
import { useStore } from "../../Store"

const AboutYou = () => {
    const {
        layoutData,
        fields
    } = useStore((state)=> {
        return {
            layoutData: state.layoutData,
            fields: state.fields
        }
    })
    console.log(fields,'...layoutData=', layoutData);
    
    return (
        <GenerateForm fields={fields} layout={layoutData.default} />
    )
}
export default AboutYou