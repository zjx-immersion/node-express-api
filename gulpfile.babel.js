import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import flow from 'gulp-flowtype';

const paths = {
    js: ['./src/**/*.js'],
    destination: './app',
    test: './test/**/*.js'
}

gulp.task('default', cb => {
    run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
    run('clean', 'flow', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
    rimraf(paths.destination, cb);
});

//gulp.task('flow', shell.task(['flow'], { ignoreErrors: true }));

// gulp.task('flow', () => {
//     return gulp.src('./node_modules')
//         .pipe(flow({ killFlow: false }));
// });

gulp.task('flow', () => {
    return gulp.src(paths.js)
        .pipe(flow({
            killFlow: false,
            declarations: './flow-typed'
        }));
});

gulp.task('babel', shell.task(['babel src --out-dir app']));

//#-------------------Test Coverage----------------------#//
import istanbul from 'gulp-istanbul';
import mocha from 'gulp-mocha';
import isparta from 'isparta';

gulp.task('pre-test-coverage', () => {
    return gulp.src(paths.js)
        .pipe(istanbul({ instrumenter: require('isparta').Instrumenter }))
        .pipe(istanbul.hookRequire());
})

gulp.task('test:coverage', ['pre-test-coverage'], () => {
        return gulp.src(paths.test)
            .pipe(mocha())
            .pipe(istanbul.writeReports())
            .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
    })
    //#------------------------------------------------------#//

let express;

gulp.task('server', () => {
    express = server.new(paths.destination);
});

gulp.task('restart', () => {
    express.start.bind(express)();
});

gulp.task('watch', () => {
    return watch(paths.js, () => {
        gulp.start('build');
    });
});