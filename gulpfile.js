var gulp = require("gulp");
var browserify = require("gulp-browserify");

gulp.task("build", function () {
    gulp.src("erfcinv.js")
        .pipe(browserify())
        .pipe(gulp.dest("app/scripts"))
});

gulp.task("default", ["build"]);