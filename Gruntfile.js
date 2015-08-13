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
      grunt: {
        files: ['Gruntfile.js'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['example/**/*.html'],
        options: {
          livereload: true
        }

      },
      testjs: {
        files: ['example/template.js', 'example/config.json', 'example/*.js'],
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
          'src/dist/mv.min.js': ['src/js/**/**.js']
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
      bower: {
        expand: true,
          src: ['bower_components/**'],
          dest: 'example/'
      },
      js: {
        expand: true,
        cwd: 'src/dist',
        src: ['mv.min.js'],
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
      'copy',
      'wiredep',
      'less',
      'connect',
      'watch'
  ]);

  grunt.registerTask('build', [
      'uglify'
  ]);
};
