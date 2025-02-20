import { writeFileSync, readFileSync } from 'node:fs'
import { getPathFromRoot } from './fileSystem'

const fileName = '.indus-selected-product'
const setCurrentProduct = (product: string, clientName: string) => {
    const selectedProductPath = product + '/' + clientName
    writeFileSync(getPathFromRoot(`indussoft-ui-framework/.build/${fileName}`), selectedProductPath)
}
const getCurrentProduct = () => {
    const prodct = readFileSync(getPathFromRoot(`indussoft-ui-framework/.build/${fileName}`), 'utf-8')
    return prodct
}
 export { setCurrentProduct, getCurrentProduct }