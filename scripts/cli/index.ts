import prompts from 'prompts'
import welcome from "./welcome"
import run from './run'
import build from './build'
import { getStringGradient } from '../utils/gradientString'
const exit = () => process.exit(1)
const start = async () => {
    welcome()
    const { ans } = await prompts([
        {
            type: 'select',
            message: getStringGradient('MENU'),
            name: 'ans',
            choices: [
                {
                    title: 'Run a Product',
                    value: 'run'
                },
                {
                    title: 'Exit',
                    value: 'exit'
                }
            ]

        }
    ])

    switch (ans) {
        case 'run':
            await run()
            break;
        case 'build':
            await build()
            break;
        default:
            console.log('invalid option..');
            exit()
            break;
    }
}

start()