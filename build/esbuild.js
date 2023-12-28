require('esbuild').build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/val2color.js',
    bundle: true,
    minify: false,
    platform: 'neutral',
    format: 'esm',
    target: 'es2020',
    chunkNames: '[name]-[hash]',
    tsconfig: 'tsconfig.json'
}).catch(() => process.exit(1))
