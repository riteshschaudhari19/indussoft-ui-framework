import figlet from 'figlet'
import gradient from 'gradient-string'

const welcome = () => {
    const messsage = figlet.textSync('INDUSSOFT', {
        horizontalLayout : 'full',
        verticalLayout : 'default',
        width: 90,
        whitespaceBreak: true,
        font : 'Standard'
    })
    const stars = Array(19).fill('*').join('')
    console.log(gradient['morning'](stars + ' WELCOME TO '+ stars))
    console.log(gradient['retro'](messsage))
    console.log(gradient['morning'](Array(50).fill('=').join('')))
}

export default welcome