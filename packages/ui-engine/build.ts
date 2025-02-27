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
            cssModulesPlugin({
                inject: false,
                localsConvention: 'camelCaseOnly',
                filter: /\.module?\.css$/i,
                v2: true,
                v2CssModulesOption: {
                    dashedIndents: false,
                    // pattern: `indus_los_[local]_[hash]`,
                    /**
                     * Optional. the currently supported segments are:
                     * [name] - the base name of the css file, without extension
                     * [hash] - a hash of the full file path
                     * [local] - the original class name
                     */
                    pattern: `indus_form_[local]_[hash]`,
                },
            }),
        ],
    }
    removeDist()

    if (isWatch) {
        try {
            const ctx = await context({
                ...sharedConfig,
                mainFields: ['module', 'main'],
                outfile: 'dist/index.mjs',
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
            outfile: 'dist/index.cjs',
            platform: 'node',
            target: 'es2016',
        })
        await build({
            ...sharedConfig,
            mainFields: ['module', 'main'],
            outfile: 'dist/index.mjs',
            platform: 'browser',
            format: 'esm',
            target: 'es2016',
        })
    }
}

asyncBuild()