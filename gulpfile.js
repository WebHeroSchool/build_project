const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');

gulp.task('time', () => {
	let today = new Date(); 
	console.log(today);
});

gulp.task('jsMove', () => {
	return gulp.src('*.js')
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(concat('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('script'));
});

gulp.task('cssMove', () => {
	return gulp.src('*.css')
		.pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('style.css'))
        .pipe(cssnano())
		.pipe(gulp.dest('style'));
});

gulp.task('build', ['jsMove', 'cssMove']);
