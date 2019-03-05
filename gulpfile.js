const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('time', () => {
	let today = new Date(); 
	console.log(today);
});

gulp.task('jsMove', () => {
	return gulp.src('*.js')
		.pipe(concat('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('script'));
});

gulp.task('cssMove', () => {
	return gulp.src('*.css')
		.pipe(concat('style.css'))
		.pipe(uglify())
		.pipe(gulp.dest('style'));
})
