import xss, { IFilterXSSOptions } from "xss";

const xssFilter = (content: string, otherFilterOptions?: IFilterXSSOptions) => {
    const xssFilterOpt: IFilterXSSOptions = {
        whiteList: {
            p: ['class', 'style'],
            span: ['class', 'style'],
        },
        ...otherFilterOptions,
    }
    return xss(content, xssFilterOpt)
}
export default xssFilter