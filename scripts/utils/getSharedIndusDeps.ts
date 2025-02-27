import { readFileSync } from 'node:fs'
import asyncGlob from './asyncGlobMatches'
import { getPathFromRoot } from './fileSystem'

const getSharedIndusDeps = async () => {
    const depFiles = await asyncGlob([
        '**/products/**/package.json',
        '**/component-lib/**/package.json',
        '**/ui-engine/**/package.json',
        '**/form-core/**/package.json',
    ])
    return depFiles.reduce((acc, curr) => {
        console.log('curr=', curr);
        
        const filePath = getPathFromRoot(`indussoft-ui-framework/${curr}`)
        const pkgJsonFile = readFileSync(filePath, { encoding: 'utf-8' })
        const pkgJson = JSON.parse(pkgJsonFile)
        return [...acc, pkgJson.name]
    }, [])
}
 export default getSharedIndusDeps