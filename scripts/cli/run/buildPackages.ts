import { readFileSync } from 'node:fs'
import { getPathFromRoot } from "../../utils/fileSystem";
import { getCurrentProduct } from "../../utils/product"
import prompts from 'prompts';
import { getStringGradient } from '../../utils/gradientString';
import getSharedIndusDeps from '../../utils/getSharedIndusDeps';
import asynScript from '../../utils/asynScript';

const buildPackages = async () => {
    const currentProduct = getCurrentProduct();
    const pkgJson = readFileSync(
        getPathFromRoot(`indussoft-ui-framework/packages/products/${currentProduct}/package.json`),
        'utf8'
    )
    const pkg = JSON.parse(pkgJson)
    const { answer } = await prompts({
        type: 'select',
        name: 'answer',
        message: getStringGradient(`Do you want to build deps for ${pkg.indus.name} ?`),
        choices: [
            {
                title: 'Yes',
                value: 'yes'
            },
            {
                title: 'No',
                value: 'no'
            },
        ]
    })
    if (answer === 'yes') {
        const dependencies: string[] = []
        const sharedIndusDeps = await getSharedIndusDeps()
        Object.keys(pkg.dependencies).forEach((item) => {
            if (sharedIndusDeps.includes(item)) {
                dependencies.push(item)
            }
        })
        const fns = dependencies.map((item) => {
            const fn = async () => {
                await asynScript('lerna', ['run', 'build', `--scope=${item}`], {
                    message: `Build in progress: ${item}`,
                    successMsg: `Build Complete: ${item}`,
                })
            }
            return fn
        })
        for (const fn of fns) {
            await fn()
        }
    }
    const { result } = await prompts({
        type: 'select',
        name: 'result',
        message: getStringGradient(`Do you want to build ${pkg.indus.name} Product ?`),
        choices: [
            {
                title: 'Yes',
                value: 'yes'
            },
            {
                title: 'No',
                value: 'no'
            },
        ]
    })
    if (result === 'yes') {
        await asynScript('lerna', ['run', 'build', `--scope=${pkg.name}`], {
            message: `Build in progress: ${pkg.name}`,
            successMsg: `Build Complete: ${pkg.name}`,
        })
    }
}
export default buildPackages