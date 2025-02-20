import ora from 'ora'

const instance = ora()

const start = (msg?: string) => {
    instance.start(msg)
}
const succeed = (msg?: string) => {
    instance.succeed(msg)
}
const fail = (msg?: string) => {
    instance.fail(msg)
}
const stop = () => {
    instance.stop()
}

export { start, stop, succeed, fail }