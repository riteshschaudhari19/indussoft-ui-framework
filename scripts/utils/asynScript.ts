import { createWriteStream } from 'node:fs'
import execa from 'execa'
import * as spinner from './spinner'

const asynScript = async (cmd: string, args: readonly string[], {message, cwd, safe, successMsg, failureMsg} : {
    message?: string
    cwd?: string
    safe?: boolean
    successMsg?: string
    failureMsg?: string
} = {}) => {
    message && spinner.start(message)

    const childProcess = execa(cmd, args, {
        stdin: 'inherit',
        cwd: cwd || process.cwd(),
        env: { FORCE_COLOR: 'true'},
    })

    childProcess.stderr.pipe(createWriteStream('.indus-build-debug.log'))

    try {
        await childProcess
        const msg = successMsg || message
        msg && spinner.succeed(msg)
    } catch (error) {
        const msg = failureMsg || message
        msg && spinner.fail(msg)
        if (!safe) {
            console.error(error)
            process.exit()
        }
    } finally {
        childProcess && childProcess.cancel && childProcess.cancel()
    }
}

export default asynScript