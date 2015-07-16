/**
 * Created by alex.depatie on 5/19/15.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: 'package.json',
    connect: {
      server: {
        options: {
          livereload: 35729,
          open: true,
          base: 'example'
        }
      }
    },
    watch: {
      html: {
        files: ['example/**/*.html'],
        options: {
          livereload: true
        }

      },
      testjs: {
        files: ['example/template.js', 'example/config.json', 'example/*.js'],
        tasks:['uglify'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['mv-framework/scripts/src/**/*.js'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['example/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    },
    less: {
      test: {
        files: {
          'example/template.css': 'example/template.less'
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
        src: ['example/index.html'],
        directory: 'example/bower_components'
      }
    },
    copy: {
      test: {
        expand: true,
          src: ['mv-framework/dist/*', 'bower_components/**'],
          dest: 'example/'
      }
    },
    clean: {
      test: ['example/mv-framework', 'example/bower_components']
    }
  });

  grunt.loadNpmTasks('main-bower-files');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'example'
  ]);

  grunt.registerTask('example', [
      'build',
      'clean',
      'copy:test',
      'wiredep',
      'less',
      'connect',
      'watch'
  ]);

  grunt.registerTask('build', [
      'uglify'
  ]);
};
