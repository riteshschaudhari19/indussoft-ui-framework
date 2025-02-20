import { writeFileSync, readFileSync } from 'node:fs'
import { getPathFromRoot } from './fileSystem'

const fileName = '.indus-selected-driver'
const setCurrentDriver = (driver: string) => {
 writeFileSync(getPathFromRoot(`indussoft-ui-framework/.build/${fileName}`), driver)
}
const getCurrentDriver = () => {
    const driver = readFileSync(getPathFromRoot(`indussoft-ui-framework/.build/${fileName}`), 'utf-8')
    return driver
}
 export { setCurrentDriver, getCurrentDriver }