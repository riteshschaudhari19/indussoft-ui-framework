import { glob } from 'glob'

const asyncGlob = async (pattern: string | string[]) => {
    try {
        const mathces = await glob(pattern, {
            mark: true,
            ignore: '**/node_modules/**',
        })
        return mathces
    } catch (error) {
        console.log(error);
        throw error
    }
}
export default asyncGlob