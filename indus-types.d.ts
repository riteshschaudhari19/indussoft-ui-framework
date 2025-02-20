declare module '*.less' {
    const resource: { [key: string]: string }
    export = resource
}
declare module '*.module.css'

declare interface IndusConfig {
    locale: string
    country: string
    API:{
        pageData: string
        save: string
        submit: string
        email: string
        session: string
    },
}