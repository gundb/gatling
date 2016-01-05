/**
 * Created by MetaSean on 20150625.
 */

var gulp = require('gulp')
	, shell = require('gulp-shell')
	, util = require('gulp-util');

gulp.task('default', ['devSteps']);

gulp.task('devStart', shell.task([
	"npm install",
	"nodemon src/server.js 4242"]
));

gulp.task('dogfood', shell.task([
  "git push gatling-gun head:master"]
));

gulp.task('start', shell.task([
	"npm install",
	"nodemon src/server.js 4242"]
));
