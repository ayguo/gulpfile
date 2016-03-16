/**
 * 环境要求
 * 最新版 nodejs
 * 全局安装
 * npm install gulp -g
 * 目录安装
 * npm install gulp --save-dev
 * 组件安装
 * npm install gulp-sass gulp-minify-css gulp-uglify gulp-rename gulp-concat gulp-autoprefixer gulp-imagemin --save-dev
 */


'use strict';

// gulp
var gulp = require('gulp');
// sass
var sass = require('gulp-sass');
// css压缩
var minifyCss = require('gulp-minify-css');
// js压缩
var uglify = require('gulp-uglify');
// 重命名
var rename = require('gulp-rename');
// 合并文件
var concat = require('gulp-concat');
// css3前缀补全
var autoprefixer = require('gulp-autoprefixer');
// 图片压缩
var imagemin = require('gulp-imagemin');





var path = './dev/';		//开发目录
var dist = './publish/';	//发布目录


// 路径
var paths = {
	src: {
		css: path + '**/css/*.scss',
		js: path + '**/js/*.js',
		image: path + '**/img/*'
	}
};


// js压缩
gulp.task('jsMin', function () {
	return gulp.src(paths.src.js)
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(dist));
});

// 图片处理
gulp.task('image', function () {
	gulp.src(paths.src.image)
		.pipe(imagemin())
		.pipe(gulp.dest(dist));
})


// 编译sass文件 
gulp.task('sass', function() {
	return gulp.src(paths.src.css)
		// 编译sass文件
		.pipe(sass())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		// 压缩css文件
		.pipe(rename({suffix: '.min'}))
		.pipe(minifyCss())
		.pipe(gulp.dest(dist));
});


// 执行默认
gulp.task('default', function(){
	gulp.run('sass', 'jsMin', 'image');

	gulp.watch(
		[
			paths.src.css,
			paths.src.js,
			paths.src.image
		], 
		function(){
			gulp.run('sass', 'jsMin', 'image');
		}
	);
});








