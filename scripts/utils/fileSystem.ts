import fs from 'node:fs'
import path from 'node:path'

const getDirectories = (path: string): string[] => {
    return fs.readdirSync(path).filter((dirent)=>{
        return fs.statSync(path + '/' + dirent).isDirectory
    })
}

const getPathFromRoot = (dirPath: string)=> {
    return path.resolve(__dirname + '../../../../' + dirPath)
}

export { getDirectories, getPathFromRoot }