/**
 * Created by darin on 12/9/2015.
 */
var gulp = require('gulp');
var exec = require('child_process').exec;


function runCommand(command) {
    return function (cb) {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        })
    }
}

gulp.task('default', function() {
    console.log('Running Gulp default task');
});

//Running tasks
gulp.task('start-mongo', runCommand('mongod --dbpath C:/Program Files/MongoDB/Server/3.0/bin'));
gulp.task('stop-mongo', runCommand('mongo --eval "use admin; db.shutdownServer();"'));
gulp.task('start-app', runCommand('node server.js'));
gulp.task('nodemon', runCommand('nodemon server.js'));