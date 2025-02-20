import { existsSync, readFileSync, writeFileSync, statSync} from 'node:fs'
import { getCurrentDriver } from '../../utils/driver'
import { getCurrentProduct } from '../../utils/product'
import { getPathFromRoot } from '../../utils/fileSystem'
import getSharedIndusDeps from '../../utils/getSharedIndusDeps'
import execa from 'execa'
const prepareDriver = async () => {
    const selectedDriver = getCurrentDriver()
    const selectedProductPath = getCurrentProduct()
    console.log('selectedDriver=', selectedDriver);
    
    try {
        const importedDriver = await import(`./drivers/${selectedDriver}`)
        const driver = importedDriver.default || importedDriver
        // await driver.cloneDriver(selectedDriver)
        await driver.preparePackages(selectedDriver, selectedProductPath)
    } catch (error) {
        console.error('Failed to prepare driver', error)
        process.exit(1)
    }
}

export const runDriver = async () => {
    const selectedDriver = getCurrentDriver()
    const selectedProductPath = getCurrentProduct()
    console.log(selectedProductPath, '<=selectedProductPath ... selectedDriver=', selectedDriver);
    const importedDriver = await import(`./drivers/${selectedDriver}`)
    const driver = importedDriver.default || importedDriver

    const productPkgStr = readFileSync(
        getPathFromRoot(`indussoft-ui-framework/packages/products/${selectedProductPath}/package.json`),
        'utf8',
    )
    const productPkg = JSON.parse(productPkgStr)
    const dependencies: string[] = []
    const sharedIndusDeps = await getSharedIndusDeps()
    const driverPkgJson = driver.getPackageJson(selectedDriver)
    const overallDepsToWatch = [
        ...Object.keys(driverPkgJson.dependencies),
        ...Object.keys(productPkg.dependencies),
    ]
    overallDepsToWatch.forEach((item)=>{
        if (sharedIndusDeps.includes(item)) {
            dependencies.push(item)
        }
    })
    const packagesToWatch = dependencies.map((dep)=>{
        return dep.split('/')[1]
    })
    .join(',')
    const process2 = execa(
        'concurrently',
        [
            driver.installDriver(selectedDriver),
        ],
        {
            stdio: 'inherit',
        },
    )
    await process2
    const process = execa(
        'concurrently',
        [
            '--names',
            'watch:build,vite-driver',
            '-c',
            'cyan,green',
            `lerna run build:watch --scope=@indussoft/{${packagesToWatch},${
                productPkg.name.split('/')[1]
            }}`,
            driver.run(selectedDriver),
        ],
        {
            stdio: 'inherit',
        },
    )
    await process
}
export default prepareDriver