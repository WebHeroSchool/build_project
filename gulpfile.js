const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

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
		.pipe(gulp.dest('style'));
})
