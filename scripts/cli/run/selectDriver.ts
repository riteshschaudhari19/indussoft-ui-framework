import prompts from "prompts"
import { getStringGradient } from "../../utils/gradientString"
import { setCurrentDriver } from "../../utils/driver"

const selectDriver = async () => {
    const { driver } = await prompts({
        type: 'select',
        name: 'driver',
        message: getStringGradient('Select Driver'),
        choices: [
            {
                title: 'Vite App(Local Development)',
                value: 'dev-vite-driver'
            },
            {
                title: 'NextJS',
                value: 'nextjs'
            },
        ]
    })
    setCurrentDriver(driver)
}
export default selectDriver