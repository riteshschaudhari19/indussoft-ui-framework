import { BuildOptions, Loader, build, context } from 'esbuild'
import fs from 'fs-extra'
import cssModulesPlugin from 'esbuild-css-modules-plugin'
import { loadTypeDef } from '../../scripts/plugins/esbuild/type-def'
import { peerDependencies, devDependencies, name } from './package.json'
import { log } from '../../scripts/plugins/esbuild/log'

const loader: Record<string, Loader> = {
    '.ts': 'tsx',
    '.json': 'json',
    '.png': 'file',
    '.jpeg': 'file',
    '.jpg': 'file',
    '.svg': 'file',
}
const OUTPUT_DIR = 'dist'
const removeDist = () => {
    try {
        fs.removeSync(OUTPUT_DIR)
    } catch (e) {
        console.error(e)
    }
}

const asyncBuild = async () => {
    const isWatch = process.argv.includes('--watch')
    const sharedConfig: BuildOptions = {
        entryPoints: ['index.tsx'],
        minify: !isWatch,
        bundle: true,
        minifySyntax: !isWatch,
        sourcemap: !!isWatch,
        external: [
            ...Object.keys(peerDependencies),
            ...Object.keys(devDependencies),
        ].concat([
            'create-shared-react-context',
            'react-helmet',
            'use-sync-external-store',
            '@emotions/*',
        ]),
        loader: {
            ...loader
        },
        plugins: [
            log(name),
            loadTypeDef(name),
        ],
    }
    removeDist()

    if (isWatch) {
        try {
            const ctx = await context({
                ...sharedConfig,
                mainFields: ['module', 'main'],
                outfile: 'dist/esm/index.js',
                platform: 'neutral',
                format: 'esm'
            })
            await ctx.watch()
            console.log(`Started ${name} in watch mode...`);
        } catch (e) {
            console.log(e);
        }
    } else {
        await build({
            ...sharedConfig,
            outfile: 'dist/cjs/index.js',
            platform: 'node',
            target: 'es2016',
        })
        await build({
            ...sharedConfig,
            mainFields: ['module', 'main'],
            outfile: 'dist/esm/index.js',
            platform: 'browser',
            format: 'esm',
            target: 'es2016',
        })
    }
}

asyncBuild()