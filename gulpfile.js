//подклюние плагина gulp
var gulp = require('gulp');
var webserver = require('gulp-webserver-io');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');

//Задача для gulp по умолчанию:
gulp.task('default', ['webserver'], function () {
	gulp.watch('site/**/*', ['build']);
	gulp.watch('site/sass/**/*.scss', ['sass']);
});

//Новая задача для gulp 'build':
gulp.task('build', function () {
	return gulp.src('site/*.html').pipe(gulp.dest('../public'));
});

//Новая задача 'webserver', перед которой выполнится ['build']
gulp.task('webserver', ['build'], function() {
	gulp.src('../public').pipe(webserver({
		livereload: true,
		open: true
	}));
});

//Перемещение и сжатие картинок
gulp.task('images', function () {
	gulp.src('site/images/*').pipe(imagemin()).pipe(gulp.dest('../public/images'));
});

//Препроцессор css
gulp.task('sass', function () {
	return gulp.src('site/sass/main.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('../public/css'));
});