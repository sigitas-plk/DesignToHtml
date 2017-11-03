module.exports = function(){
    rootDir = 'src/';
    return {
        sass: {
            in: rootDir +'sass/*.scss',
            watch: [rootDir+'sass/**/*',rootDir+'sass/*.scss'],
            out: 'css/',
            sassOpts:{
                outputStyle: 'compressed', //values: nested, expanded, compact, compressed
                precision: 3,
                errLogToConsole: true,
                sourceComments: false
            },
            pleeeaseOpts: {
                sass:false,
                minifier:false,
                autoprefixer: {browsers: ['last 3 version', '>1%']},
                pseudoElements: true,
                mqpacker: true
            }
        },
        ts: {
            in: rootDir + 'ts/*.ts',
            watch: [rootDir+'ts/**/*', rootDir+'ts/*.ts'],
            out: 'js/',
            tsOpts: {
                outFile: 'scripts.js'
            }
        },
        html: {
            in: rootDir + 'html/*.html',
            watch:  [rootDir + 'html/**/*',rootDir + 'html/*.html'],
            out: ''
        },
        browserSync: {
            /*  proxy: {
                target: 'http://m.local',
                ws: false
            },*/
            server: {
                baseDir: '',
                directory: true,
                index: "index.html"
            },
            open: false,
            notify: true,
            port: 3010,
            ui: false
        }
    }
};