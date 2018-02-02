var gulp = require('gulp-help')(require('gulp'));
var fileinclude = require('gulp-file-include');
var del = require('del');
var runSequence = require('run-sequence');
var sitemap = require('gulp-sitemap');
var fetch = require('node-fetch');
var rename = require('gulp-rename');

gulp.task('build', function (cb) {
    runSequence('copy-files', 'compile-template', 'build-sitemap', cb);
});

gulp.task('build-sitemap', function () {
    gulp.src('./delta/templates/src/*.html', {read: false})
        .pipe(sitemap({
            siteUrl: 'https://www.shuga.io',
            priority: 0.80,
            mappings: [
                {
                    pages: ['index.html'],
                    priority: 1.00,
                    getLoc(siteUrl, loc, entry) {
                        // Removes the file extension if it exists
                        return loc.endsWith("//") ? loc.slice(0, -1) : loc;
                    }
                },
                {
                    pages: ['signUp.html'],
                    priority: 0.64,
                }
            ]
        }))
        .pipe(gulp.dest('./delta/dist/', {overwrite: true}));
});

gulp.task('compile-template', function() {
    gulp.src(['./delta/templates/src/*.html'])
        .pipe(fileinclude())
        .pipe(gulp.dest('./delta/dist/', {overwrite: true}));
});

gulp.task('build-rewards', function() {
    fetchRedeemProducts().then(function(redeemProducts) {
        redeemProducts.results.map(function(redeemProduct) {
            // console.log(redeemProduct.name);
            gulp.src(['./delta/templates/modules/rewardItem.html'])
                .pipe(fileinclude({
                    context: {
                        reward: redeemProduct
                    }
                }))
                .pipe(rename(redeemProduct.id + '.html'))
                .pipe(gulp.dest('./delta/dist/products/', {overwrite: true}));
        });
    });
});

var fetchRedeemProducts = function() {
    return fetch('https://api.shuga.io/redeemProduct?page=0&pageSize=1000').then(function(res) {
        return res.json();
    }).then(function (json) {
        return json;
    });
}

gulp.task('copy-files', function() {
    gulp.src(['./delta/templates/src/**/*', "!./delta/templates/src/*"])
        .pipe(gulp.dest('./delta/dist/', {overwrite: true}));
});

gulp.task('clean', function () {
    del('./delta/dist');
});
