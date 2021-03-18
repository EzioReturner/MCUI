const gulp = require('gulp');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const gulpLess = require('gulp-less');
const cssnano = require('gulp-cssnano');
const through2 = require('through2');

const paths = {
  dest: {
    lib: 'lib', // commonjs 文件存放的目录名
    esm: 'esm', // ES module 文件存放的目录名
    dist: 'dist', // umd文件存放的目录名 
  },
  styles: 'components/**/*.less', // 样式文件路径
  scripts: ['components/**/*.{ts,tsx}', '!components/**/demo/*.{ts,tsx}'], // 脚本文件路径
};

/**
 * 编译脚本文件
 * @param {*} babelEnv babel环境变量
 * @param {*} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(
      /**
       * @description 在处理scripts任务中，截住style/index.js，生成style/css.js，并通过正则将引入的less文件后缀改成css。
       * 
       */
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 文件内容处理
          file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
 function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}


/**
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 */
 function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
 }

 /**
 * 拷贝less文件
 */
function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

/**
 * 生成css文件
 */
 function less2css() {
  return gulp
    .src(paths.styles)
    .pipe(gulpLess()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

 // 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildScripts = gulp.series(compileCJS, compileESM);

// 并行任务 后续加入样式处理 可以并行处理
const build = gulp.parallel(buildScripts, copyLess, less2css);

exports.build = build;

exports.default = build;
