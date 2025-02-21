const mapChoice = (choices: string[]) => {
    return choices.map((choice: string)=>({title: choice, value: choice}))
}
export default mapChoice