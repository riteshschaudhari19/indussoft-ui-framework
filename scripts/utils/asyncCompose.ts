type Func = (param: any) => void

const asyncCompose = (...fns: Func[]) => {
    return async (initialInput?:any) => {
        let result = initialInput;
        for (const fn of fns) {
            result = await fn(result)
        }
        return result
    }
}

export default asyncCompose