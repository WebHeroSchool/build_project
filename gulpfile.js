const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
	src: {
		styles: '*.css',
		scripts: '*.js'
	},
	build: {
		styles: 'style',
		scripts: 'script'
	},
	buildName: {
		styles: 'index.min.css',
		scripts: 'index.min.js'
	} 
}

gulp.task('time', () => {
	let today = new Date(); 
	console.log(today);
});

gulp.task('jsMove', () => {
	return gulp.src([paths.src.scripts])
		.pipe(sourcemaps.init())
			.pipe(concat(paths.buildName.scripts))
			.pipe(babel({
	            presets: ['@babel/env']
	        }))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.build.scripts));
});

gulp.task('cssMove', () => {
	return gulp.src([paths.src.styles])
		.pipe(sourcemaps.init())
	        .pipe(concat(paths.buildName.styles))
	        .pipe(cssnano())
	    .pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.build.styles));
});

gulp.task('build', ['jsMove', 'cssMove']);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(paths.src.styles, ['cssMove-watch']);
	gulp.watch(paths.src.scripts, ['jsMove-watch']);
});

gulp.task('cssMove-watch', ['cssMove'], () => browserSync.reload());
gulp.task('jsMove-watch', ['jsMove'], () => browserSync.reload());

gulp.task('dev', ['build', 'browser-sync']);
gulp.task('prod', ['build']);
