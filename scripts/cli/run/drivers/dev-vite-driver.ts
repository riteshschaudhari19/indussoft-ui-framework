import { existsSync, readFileSync, writeFileSync, statSync} from 'node:fs'
import path from 'path'
import { glob } from 'glob'
import asynScript from '../../../utils/asynScript'
import * as spinner from '../../../utils/spinner'
import { getPathFromRoot } from '../../../utils/fileSystem'

const buildPath = path.resolve(__dirname, '../../../../', '.build')
const cloneDriver = async (driverName: string) => {
    spinner.start(`Cloning Driver ${driverName}`)
    if (!existsSync(`${buildPath}/${driverName}`)) {
        console.log('not exists');
        // await asynScript('rsync', [
        //     '-av',
        //     '--exclude',
        //     'dist',
        //     '--exclude',
        //     'package-lock.json',
        //     '--exclude',
        //     'node_modules',
        //     `drivers/${driverName}`,
        //     '.build',
        // ])
        spinner.succeed(`SuccessFully cloned ${driverName}`)
    } else {
        spinner.succeed(`Already driver ${driverName} has been cloned`)
    }
}

const variables = (productPkgName: string) => {
    console.log('productPkgName in variables:', productPkgName);
    
    return {
        '{{indus.product.package.name}}': productPkgName,
    }
}
const replaceVariables = (files: string[], variables: any) => {
    for (const file of files) {
        const content = readFileSync(file, 'utf-8')
        let updatedContent = ''
        Object.entries(variables).forEach(()=>{
            updatedContent = content.replace(/{{[^}]+}}/g, (m) => {
                console.log('m=', m);
                return variables[m] || m
            })
            console.log('updatedContent=>', updatedContent);
            
        })
        if (content !== updatedContent) {
            writeFileSync(file, updatedContent)
        }
    }
}
const preparePackages = (driverName: string, productPath: string) => {
    console.log('driverName=', driverName);
    console.log('productPath=', productPath);
    const productPkgStr = readFileSync(
        getPathFromRoot(`indussoft-ui-framework/packages/products/${productPath}/package.json`),
        'utf8',
    )
    console.log('productPkgStr=', productPkgStr);
    
    const vitePkg = getPackageJson(driverName)
    const productPkg = JSON.parse(productPkgStr)
    vitePkg.dependencies = {
        ...vitePkg.dependencies,
        [productPkg.name]: productPkg.version,
    }

    writeFileSync(
        getPathFromRoot(`indussoft-ui-framework/.build/${driverName}/package.json`),
        JSON.stringify(vitePkg),
    )
    replaceVariables(
        glob.sync(`.build/${driverName}/src/**/*`)
        .filter((fileName)=> {
            console.log('fileName=>', fileName);
            
            return !statSync(fileName).isDirectory()
        }),
        variables(productPkg.name)
    )
}
const run = (driverName: string) => {
    return `cd .build/${driverName} && npm run dev`
}
const installDriver = (driverName: string) => {
    return `npm install`
}
const getPackageJson = (driverName: string) => {
    const vitePkgStr = readFileSync(
        getPathFromRoot(`indussoft-ui-framework/.build/${driverName}/package.json`),
        'utf-8',
    )
    return JSON.parse(vitePkgStr)
}
const devViteDriver = {
    cloneDriver, 
    preparePackages,
    getPackageJson,
    run,
    variables, 
    replaceVariables,
    installDriver,
}

export default devViteDriver