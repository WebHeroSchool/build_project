const env = require('gulp-env');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

const paths = {
	src: {
		styles: '*.css',
		scripts: '*.js'
	},
	build: {
		build: 'build',
		styles: 'build/style',
		scripts: 'build/script'
	},
	buildName: {
		styles: 'index.min.css',
		scripts: 'index.min.js'
	} 
}

env({
  file: '.env',
  type: 'ini',
});

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
			.pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.build.scripts));
});

gulp.task('cssMove', () => {
	return gulp.src([paths.src.styles])
		.pipe(sourcemaps.init())
	        .pipe(concat(paths.buildName.styles))
	        .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
	    .pipe(sourcemaps.write()) 
		.pipe(gulp.dest(paths.build.styles));
});

gulp.task('clean', () => {
	return gulp.src(paths.build.build, {read: false})
        .pipe(clean());
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
