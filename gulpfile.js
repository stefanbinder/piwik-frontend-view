'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglifyjs'),
    bowerfiles = require('bower-files');

// Modules for webserver and livereload
var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;


// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', { root: 'dist' });
});


var bowerJsFiles = ['bower_components/angular/angular.min.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/angular-translate/angular-translate.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'];

var bowerCssFiles = ['bower_components/bootstrap/dist/css/bootstrap.css']


gulp.task('default', ['dev', 'watch']);

// Dev task
gulp.task('dev', ['bower', 'scripts', 'views', 'styles', 'lint'], function() { });


// JSHint task
gulp.task('lint', function() {
  gulp.src('src/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('src/css/*.css')
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function() {
  //gulp.src('src/js/**/*.js')
  //.pipe(gulp.dest('dist/js'));
  gulp.src('src/js/**/*.js')
    .pipe(uglify('piwik.js', {outSourceMap: true, mangle: false}))
    .pipe(gulp.dest('dist/js/'));

  gulp.src('src/config.js')
    .pipe(gulp.dest('dist/'));
});

// Views task
gulp.task('views', function() {
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('dist/'));
});

gulp.task('bower', function() {
  gulp.src(bowerJsFiles)
    //.pipe(uglify('lib.js', {outSourceMap: true, mangle: false}))
    .pipe(gulp.dest('dist/js'));

  gulp.src(bowerCssFiles)
    .pipe(gulp.dest('dist/css'));

});


gulp.task('watch', ['lint'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);

  gulp.watch(['src/css/**/*.css'], [
    'styles'
  ]);

  gulp.watch(['src/**/*.html'], [
    'views'
  ]);

  gulp.watch(['src/js/**/*.js'], [
    'lint',
    'scripts'
  ]);

  gulp.watch('./dist/**').on('change', refresh.changed);

});



