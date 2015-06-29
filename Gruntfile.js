/**
 * Created by alex.depatie on 5/19/15.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: 'package.json',
    bower: {
      framework: {
        base: 'bower_components',
        dest: 'mv-framework/src/js/lib'
      }
    },
    connect: {
      server: {
        options: {
          livereload: 35729,
          open: true
        }
      }
    },
    watch: {
      example: {
        html: {
          files: ['index.html', 'partials/**/*.html'],
          options: {
            livereload: true
          }

        },
        js: {
          files: ['template.js', 'fields.json', 'scripts/**/*.js'],
          options: {
            livereload: true
          }
        },
        less: {
          files: ['styles/**/*.less'],
          tasks: ['less'],
          options: {
            livereload: true
          }
        }
      },
      framework: {
        js: {
          files: ['mv-framework/**/*.js'],
          options: {
            livereload: true
          }
        },
        less: {
          files: ['mv-framework/**/*.less'],
          tasks: ['less'],
          options: {
            livereload: true
          }
        }
      }
    },
    less: {
      example: {
        files: {
          '.tmp/main.css': 'styles/main.less'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      framework: {
        files: {
          'mv-framework/dist/mv.min.js': ['mv-framework/src/js/**/**.js']
        }
      }
    },
    wiredep: {
      dev: {
        src: ['template-example/index.html'],
        options: {
          directory: 'template-example/bower_components'
        }
      }
    }

  });

  grunt.loadNpmTasks('main-bower-files');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('example', [
      'wiredep',
      'less',
      'connect',
      'watch'
  ]);

  grunt.registerTask('framework', [
      'bower',
      'uglify'
  ]);
};