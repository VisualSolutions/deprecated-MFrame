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
        files: ['test/scripts/**/*.js', 'test/config.json', ],
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
        files: ['test/styles/less/*.less'],
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
        src: ['mv.min.js'],
        dest: 'test/scripts/lib'
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
