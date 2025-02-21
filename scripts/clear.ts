import path from 'path'
import { rimraf } from 'rimraf'

const rimrafFromRoot = async (paths: string | string[], { glob = true }: { glob?: boolean} = {})=> {
    const ROOT = path.resolve(__dirname, '../')
    if (Array.isArray(paths)) {
        const result = await rimraf(
            paths.map((path) => `${ROOT}/${path}`),
            { glob },
        )
        return result
    }
    await rimraf(`${ROOT}/${paths}`, { glob })
}

const clearBuild = async () => {
    const args = process.argv[2]
    console.log('args==',args);
    
    // await rimrafFromRoot('.build')

    // if (args === 'build') {
    //     await rimrafFromRoot('packages/**/dist')
    // } else if (args === 'all') {
    //     await rimrafFromRoot(['**/node_modules', '**/package-lock.json', '**/dist'])
    // } else {
    //     await rimrafFromRoot([
    //         'packages/**/node_modules',
    //         'packages/**/package-lock.json',
    //     ])
    // }
}

clearBuild()