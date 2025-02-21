import prompts from "prompts";
import { getDirectories, getPathFromRoot } from "../../utils/fileSystem";
import { getStringGradient } from "../../utils/gradientString";
import mapChoice from '../../utils/mapChoice'
import { setCurrentProduct } from "../../utils/product";

const selectProduct = async () => {
    const PRODUCT_PATH = 'indussoft-ui-framework/packages/products'
    // const questions = [
    //     {
    //         type: 'select',
    //         name: 'product',
    //         message: getStringGradient('Select Product'),
    //         choices: mapChoice(getDirectories(getPathFromRoot(PRODUCT_PATH)))
    //     },
    //     {
    //         type: 'select',
    //         name: 'client',
    //         message: getStringGradient('Select Client'),
    //         choices: (product: string) => {
    //             return mapChoice(
    //                 getDirectories(getPathFromRoot(PRODUCT_PATH + '/' + product))
    //             )
    //         }
    //     },
    // ]
    const { product, client } = await prompts([
        {
            type: 'select',
            name: 'product',
            message: getStringGradient('Select Product'),
            choices: mapChoice(getDirectories(getPathFromRoot(PRODUCT_PATH)))
        },
        {
            type: 'select',
            name: 'client',
            message: getStringGradient('Select Client'),
            choices: (product: string) => {
                return mapChoice(
                    getDirectories(getPathFromRoot(PRODUCT_PATH + '/' + product))
                )
            }
        },
    ])
    setCurrentProduct(product, client)
}
export default selectProduct