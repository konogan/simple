/**
 * [exports description]
 *
 * @param  {Object} grunt [description]
 */
module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: {
        src: ['www']
      }
    },
    copy: {
      css:
           {expand: true, cwd: 'src/css/', src: ['**'], dest: 'www/css/'},
      // libs:
      //      {expand: true, cwd: 'src/js/libs/', src: ['**'], dest: 'www/js/libs/'},
      imgs:
          {expand: true, cwd: 'src/imgs/', src: ['**'], dest: 'www/imgs/'},
      html:
          {expand: true, cwd: 'src/', src: ['*.html'], dest: 'www/'}
    },
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        files: {
          'www/js/app.js': ['src/js/app.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['browserify'],
        options: {
          port: 9000,
          livereload: true
        }
      }
    },
    open: {
      dev: {
        path: 'http://127.0.0.1/simple/www',
        app: 'Google Chrome'
      }
    }
  });
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'copy', 'browserify', 'open', 'watch']);
};
