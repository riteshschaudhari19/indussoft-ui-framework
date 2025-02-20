import asyncCompose from "../../utils/asyncCompose";
import asynScript from "../../utils/asynScript";
import prepareDriver, { runDriver } from "./driver";
const buildDir = async () => {
    await asynScript('mkdir', ['.build'], { safe: true})
    await asynScript('rmraf', ['.build/.indus-*'], { safe: true})
}
const run = async () => {
    const composed = asyncCompose(
        // buildDir,
        prepareDriver,
        runDriver,
    )

    await composed()
}

export default run