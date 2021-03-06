// generated on 2016-08-16 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
// const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/public/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/public/styles'));
    // .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/public/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/public/scripts'));
    // .pipe(reload({stream: true}));
});

function lint(files, options) {
  return gulp.src(files)
    // .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/public/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/public/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    // .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/public/img/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/public/img'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/public/fonts/**/*'))
    .pipe(gulp.dest('.tmp/public/fonts'))
    .pipe(gulp.dest('dist/public/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts'], () => {
  browserSync({
    notify: false,
    port: 9003,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      },
      index: "wei_temple.html"
    }
  });

  // gulp.watch([
  //   'app/*.html',
  //   'app/public/img/**/*',
  //   // '.tmp/public/fonts/**/*'
  // ]).on('change', reload);

  gulp.watch('app/public/styles/**/*.scss', ['styles']);
  gulp.watch('app/public/scripts/**/*.js', ['scripts']);
  // gulp.watch('app/public/fonts/**/*', ['fonts']);
  // gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9003,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  // gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/public/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/public/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('build_css', ['lint', 'html'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

/*单独压缩js*/
gulp.task('uglify_script', function() {
  /*gulp.src('app/public/scripts/carousel.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/hammer.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/jquery-3.0.0.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/cxselect.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/wei_upload.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/LCalendar.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/audioplayer.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/layer.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/jinniu.mobile.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/jquery.lazyload.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/components/calendar/js/cal_common.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));

  gulp.src('app/public/scripts/iscroll-probe.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));*/

  /*gulp.src('app/public/scripts/sortable.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));
  gulp.src('app/public/scripts/layer.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));
  gulp.src('app/public/scripts/fct_admin.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));
  gulp.src('app/public/scripts/content.min.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));*/

  // 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
    // 1\. 找到文件
  gulp.src('app/public/scripts/plugins/*.js')
    .pipe($.concat('jtools.js'))
  // 2\. 压缩文件
    .pipe($.uglify())
    // 3\. 另存压缩后的文件
    .pipe(gulp.dest('dist/js'))

/*  gulp.src('app/public/scripts/fastclick.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));*/

/*  gulp.src('app/public/scripts/fct_pc.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));*/

/*  gulp.src('app/public/scripts/layer.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'));*/

});

/* 单独压缩css */
gulp.task('uglify_css', function() {
  // gulp.src('app/public/scripts/components/calendar/css/cal_common.css')
  //   .pipe($.cssnano())
  //   .pipe(gulp.dest('dist/css'));

  // gulp.src('app/public/styles/dropzone.scss')
  //   .pipe($.plumber())
  //   .pipe($.sourcemaps.init())
  //   .pipe($.sass.sync({
  //     outputStyle: 'expanded',
  //     precision: 10,
  //     includePaths: ['.']
  //   }).on('error', $.sass.logError))
  //   .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
  //   .pipe($.sourcemaps.write())
  //   .pipe(gulp.dest('.tmp/public/styles'))
  //   .pipe(reload({stream: true}))
  //   .pipe($.cssnano())
  //   .pipe(gulp.dest('dist/css'));

  gulp.src('app/public/styles/pc.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/public/styles'))
    // .pipe(reload({stream: true}))
    .pipe($.cssnano())
    .pipe(gulp.dest('dist/css'));

  /*gulp.src('app/public/styles/print.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/public/styles'))
    // .pipe(reload({stream: true}))
    .pipe($.cssnano())
    .pipe(gulp.dest('dist/css'));

  gulp.src('app/fct_certificate/fct_certificate.css')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/public/styles'))
    // .pipe(reload({stream: true}))
    .pipe($.cssnano())
    .pipe(gulp.dest('dist/css'));*/

  // gulp.src('app/public/styles/pc_admin.scss')
  //   .pipe($.plumber())
  //   .pipe($.sourcemaps.init())
  //   .pipe($.sass.sync({
  //     outputStyle: 'expanded',
  //     precision: 10,
  //     includePaths: ['.']
  //   }).on('error', $.sass.logError))
  //   .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
  //   .pipe($.sourcemaps.write())
  //   .pipe(gulp.dest('.tmp/public/styles'))
  //   .pipe(reload({stream: true}))
  //   .pipe($.cssnano())
  //   .pipe(gulp.dest('dist/css'));
});
