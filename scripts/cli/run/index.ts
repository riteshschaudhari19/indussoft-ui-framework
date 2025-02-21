import asyncCompose from "../../utils/asyncCompose";
import asynScript from "../../utils/asynScript";
import buildPackages from "./buildPackages";
import prepareDriver, { runDriver } from "./driver";
import selectDriver from "./selectDriver";
import selectProduct from "./selectProduct";
buildPackages
selectDriver
const buildDir = async () => {
    await asynScript('mkdir', ['.build'], { safe: true})
    await asynScript('rmraf', ['.build/.indus-*'], { safe: true})
}
const run = async () => {
    const composed = asyncCompose(
        buildDir,
        selectProduct,
        // bootstrap,
        selectDriver,
        buildPackages,
        prepareDriver,
        runDriver,
    )

    await composed()
}

export default run