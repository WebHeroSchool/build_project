const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('time', () => {
	let today = new Date(); 
	console.log(today);
});

gulp.task('jsMove', () => {
	return gulp.src('*.js')
		.pipe(sourcemaps.init())
			.pipe(concat('index.js'))
			.pipe(babel({
	            presets: ['@babel/env']
	        }))
			.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('script'));
});

gulp.task('cssMove', () => {
	return gulp.src('*.css')
		.pipe(sourcemaps.init())
	        .pipe(concat('style.css'))
	        .pipe(cssnano())
	    .pipe(sourcemaps.write())
		.pipe(gulp.dest('style'));
});

gulp.task('default', ['jsMove', 'cssMove']);
