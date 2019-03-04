const gulp = require('gulp');

gulp.task('time', () => {
	let today = new Date(); 
	console.log(today);
});

gulp.task('jsMove', () => {
	return gulp.src('*.js')
		.pipe(gulp.dest('script'));
});

gulp.task('cssMove', () => {
	return gulp.src('*.css')
		.pipe(gulp.dest('style'));
})