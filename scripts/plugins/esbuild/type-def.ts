import { execSync } from 'node:child_process'
const cache = new Set<string>()

export const loadTypeDef = (name: string) => {
    const plugin = {
        name: `typedef-${name}`,
        setup(build: any) {
            build.onStart(()=>{
                if (cache.has(name) && build.initialOptions.platform !== 'neutral') {
                    return
                }
                try {
                    execSync('npm run build-ts', { stdio: 'pipe' })
                } catch (e) {
                    return { errors: [{ text: e.stdout.toString() }]}
                }
                cache.add(name)
            })
        },
    }
    return plugin
}