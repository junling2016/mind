import gulp from 'gulp'
import sass from 'gulp-sass'
import minifyCss from 'gulp-clean-css'
import rename from 'gulp-rename'

gulp.task('sass', () => {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'))
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
})

gulp.task('default', gulp.series('sass', 'watch'))
