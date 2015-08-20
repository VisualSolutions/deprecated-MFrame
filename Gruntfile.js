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
      grunt: {
        files: ['Gruntfile.js'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['test/**/*.html'],
        options: {
          livereload: true
        }

      },
      testjs: {
        files: ['test/scripts/**/*.js', 'test/config.json'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify', 'copy:js'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['test/styles/less/*.less', 'src/less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      }
    },
    less: {
      test: {
        files: {
          'test/styles/template.css': 'test/styles/less/template.less'
        }
      },
      build: {
        files: {
          'src/dist/mframe.css': 'src/less/mframe.less'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      framework: {
        files: {
          'src/dist/mframe.min.js': ['src/js/**/**.js']
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
      bower: {
        expand: true,
          src: ['bower_components/**'],
          dest: 'test/'
      },
      js: {
        expand: true,
        cwd: 'src/dist',
        src: ['mframe.min.js'],
        dest: 'test/scripts/lib'
      },
      less: {
        expand: true,
        cwd: 'src/dist',
        src: ['mframe.css'],
        dest: 'test/styles'
      }
    },
    clean: {
      test: ['test/scripts/lib/mv-framework', 'test/bower_components']
    }
  });

  grunt.loadNpmTasks('main-bower-files');

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', [
      'build',
      'clean',
      'less',
      'copy',
      'wiredep',
      'connect',
      'watch'
  ]);

  grunt.registerTask('build', [
      'uglify'
  ]);
};
