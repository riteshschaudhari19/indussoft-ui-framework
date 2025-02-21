export const log = (pkgName: string) => {
    const plugin = {
        name: 'log',
        setup({ initialOptions, onEnd }: { initialOptions: any
            onEnd: any
         }) {
            onEnd((errors: string | any[])=>{
                if (errors?.length > 0) {
                    console.log(`Build failed for ${pkgName}, platform ${initialOptions.platform}!`)
                    return
                }
                console.log(`build complete package ${pkgName} for platform ${initialOptions.platform}`);
            })
        },
    }
    return plugin
}