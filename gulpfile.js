'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plugins = require("gulp-load-plugins")({
      pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
      replaceString: /\bgulp[\-.]/
    }),
    dest = 'dist/js/';

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

// Dev task
gulp.task('dev', ['clean', 'views', 'styles', 'lint', 'browserify'], function() { });

// Clean task
gulp.task('clean', function() {
	gulp.src('./dist/views', { read: false }) // much faster
  .pipe(rimraf({force: true}));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('src/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('src/css/*.css')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  // .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  // .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('dist/css/'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['src/js/**/*.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('src/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from src/views
  gulp.src('src/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'));
});

gulp.task('watch', ['lint'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['src/js/*.js', 'src/js/**/*.js'],[
    'lint',
    'browserify'
  ]);
  // Watch our sass files

  gulp.watch(['src/css/**/*.css'], [
    'styles'
  ]);

  gulp.watch(['src/**/*.html'], [
    'views'
  ]);

  gulp.watch('./dist/**').on('change', refresh.changed);

});

gulp.task('default', ['dev', 'watch']);
