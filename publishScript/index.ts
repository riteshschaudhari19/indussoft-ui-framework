'use strict'
import { exec } from '@actions/exec'
// import { StringDecoder } from 'node:string_decoder'
// const { StringDecoder } = require()

// const { exec } = require('@actions/exec')

/**
 *
 * @param {string} cmd
 * @param {string[]} args
 * @param {{cwd?: string}} options
 * @returns Promise<string>
 */
// async function execWithOutput(cmd, args?:any) {
//   let output = ''
//   let errorOutput = ''

//   const stdoutDecoder = new StringDecoder('utf8')
//   const stderrDecoder = new StringDecoder('utf8')

//   const options: {
//     cwd?: any
//     listeners?: any
//   } = {}

//   /* istanbul ignore else */
//   // if (cwd !== '') {
//   //   options.cwd = cwd
//   // }

//   options.listeners = {
//     /**
//      *
//      * @param {Buffer} data
//      */
//     stdout: data => {
//       output += stdoutDecoder.write(data)
//     },
//     /**
//      *
//      * @param {Buffer} data
//      */
//     stderr: data => {
//       errorOutput += stderrDecoder.write(data)
//     },
//   }

//   const code = await exec(cmd, args, options)
//   console.log(JSON.stringify(code))
//   output += stdoutDecoder.end()
//   errorOutput += stderrDecoder.end()

//   if (code === 0) {
//     return output.trim()
//   }

//   throw new Error(
//     `${cmd} ${args.join(
//       ' '
//     )} returned code ${code} \nSTDOUT: ${output}\nSTDERR: ${errorOutput}`
//   )
// }
const publishScript = () => {
  const versionTo = 'patch'
  const COMMIT_MSG = `[sckip ci] chore(release): bumped ${versionTo} version by Ritesh`
  console.log(exec(`lerna --registry https://registry.npmjs.org publish --no-private ${versionTo} --yes --message="${COMMIT_MSG}"`))
}

publishScript()
// exports.execWithOutput = execWithOutput



// const publishScript = async () => {
//     const versionTo = 'patch'
//     try {
//         const COMMIT_MSG = `[sckip ci] chore(release): bumped ${versionTo} version by Ritesh`
//         const {stdout} = await exec
//     } catch (error) {
        
//     }
// }