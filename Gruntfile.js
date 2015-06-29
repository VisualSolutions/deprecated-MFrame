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
          base: 'test'
        }
      }
    },
    watch: {
      html: {
        files: ['test/**/*.html'],
        options: {
          livereload: true
        }

      },
      testjs: {
        files: ['test/template.js', 'test/config.json', 'test/*.js'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['mv-framework/scripts/src/**/*.js'],
        tasks:['uglify'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['test/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    },
    less: {
      test: {
        files: {
          'test/template.css': 'test/template.less'
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
        src: ['test/index.html'],
        directory: 'test/bower_components'
      }
    },
    copy: {
      test: {
        expand: true,
          src: ['mv-framework/dist/*', 'bower_components/**'],
          dest: 'test/'
      }
    },
    clean: {
      test: ['test/mv-framework', 'test/bower_components']
    }
  });

  grunt.loadNpmTasks('main-bower-files');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', [
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
