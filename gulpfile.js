//加载插件
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');//压缩HTML
var jsmin = require('gulp-uglify');//压缩js
var concat = require('gulp-concat');//合并文件
var rename = require('gulp-rename');//重命名

//默认任务，gulp后面不用带任务名
gulp.task('default',function(){
	gulp.run('htmls','jsys','hebing');
})
//创建任务
gulp.task('htmls',function(){
	//选中要压缩的html文件
	gulp.src('src/html/car.html')
	//压缩
		.pipe(htmlmin({
			collapseWhitespace:true,
		}))
	//输出文件
		.pipe(gulp.dest("dist/html"))
});
//创建压缩JS任务
gulp.task('jsys',function(){
	gulp.src(['src/js/*.js'])//除了可以写数组之外，还可以用通配符如['src/*.js']
	//合并文件
	.pipe(concat('all.js'))//合并后的文件名
	//压缩文件
	.pipe(jsmin({
			magle:false//是否修改变量名
			//magle:{except:['require','$','exports']}//magle可以有参数except，排除混淆关键字，里面的关键字不会被替换
		}))
		.pipe(gulp.dest('dist/js'))
})
//创建合并任务
gulp.task('hebing',function(){
	gulp.src('src/js/*.js')
		//合并文件
		.pipe(concat('all.js'))
		//输出文件
		.pipe(gulp.dest('dist/js'))
		//重命名,以免覆盖上面输出的文件（即仅合并，没压缩的文件，下面输出的是既合并又压缩的文件）
		.pipe(rename({suffix: "-min"}))//后缀名
		//压缩文件
		.pipe(jsmin())
		.pipe(gulp.dest('dist/js'))
})
