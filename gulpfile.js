var gulp = require('gulp')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')
var minifyCss = require('gulp-minify-css')

gulp.task('sass', function() {
	return gulp
		.src('source/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist'))
});

gulp.task('watch', function() {
	gulp.start('sass')
	gulp.watch('source/*.*', ['sass']);
});