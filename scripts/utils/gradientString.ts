import gradient from "gradient-string";

type Theme = 'cristal' | 'morning' | 'teen'| 'mind'

const logStringGradient = (msg: string, theme: Theme = 'morning') => {
    const selectGrad = gradient[theme]
    console.log(selectGrad(msg))
}
const getStringGradient = (msg: string, theme: Theme = 'morning') => {
    const selectGrad = gradient[theme]
    return selectGrad(msg)
}

export { logStringGradient, getStringGradient }