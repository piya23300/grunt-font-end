/*
 * grunt-contrib-sass
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Sindre Sorhus, contributors
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    // variable
    path_file: {
      dev: {
        css: '../../src/css',
        js: '../../src/js',
        coffee: '../../src/js/coffee',
        sass: '../../src/css/sass',
      },
      pro: {
        css: '../../assets/css',
        js: '../../assets/js',
      },
    },

    pkg: grunt.file.readJSON('package.json'),

    // create path for develoment and production
    mkdir: {
      all: {
        options: {
          create: [
          '<%= path_file.dev.css %>', '<%= path_file.pro.css %>', 
          '<%= path_file.dev.js %>', '<%= path_file.pro.js %>',
          '<%= path_file.dev.sass %>',
          '<%= path_file.dev.coffee %>'
          ]
        }
      }
    },

    //--------------------------------- 
    //--------------- js -------------- 
    //--------------------------------- 
    //valid syntax of js
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['Grunfile.js', '<%= path_file.dev.js %>/**/*.js'],
    },
    // js.min
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          '<%= path_file.pro.js %>/magic.min.js': '<%= path_file.dev.js %>/*.js'
        }
      }
    },

    //coffee valid snytex
    coffeelint:{
      app: ['<%= path_file.dev.coffee %>/*.coffee'],
    },
    //coffee compiler
    coffee: {
      compile: {
        expand: true,
        flatten: true,
        cwd: '<%= path_file.dev.js %>',
        src: ['<%= path_file.dev.coffee %>/*.coffee'],
        dest: '<%= path_file.dev.js %>',
        ext: '.js'
      },
    },

    //--------------------------------- 
    //--------------- css -------------- 
    //--------------------------------- 
    //compass with sass
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= path_file.dev.sass %>',
          cssDir: '<%= path_file.dev.css %>',
          // sassDir: 'sass',
          // cssDir: 'css',
          watch: false
          // environment: 'production'
        }
      }
    },
    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          '<%= path_file.pro.css %>/style.min.css': '<%= path_file.dev.css %>/*.css'
        }
      }
    },

    //--------------------------------- 
    //--------------- auto run -------------- 
    //--------------------------------- 
    // configure watch to auto update ------------------------------------------
    watch: {

      // for stylesheets, watch css and less files
      //cssmin
      cssmin: {
        files: ['<%= path_file.dev.css %>/*.css'],
        tasks: ['cssmin']
      },
      compass: {
        files: ['<%= path_file.dev.sass %>/*.sass'],
        tasks: ['compass']
      },

      // for scripts, run jshint and uglify
      scripts: {
        files: '<%= path_file.dev.js %>/*.js',
        tasks: ['jshint', 'uglify']
      },
      coffee: {
        files: '<%= path_file.dev.coffee %>/*.coffee',
        tasks: ['coffeelint', 'coffee']
      }
    }
    // clean: {
    //   test: [
    //     'test/tmp',
    //     '.sass-cache'
    //   ]
    // },
    // nodeunit: {
    //   tests: ['test/*_test.js']
    // },
    // sass: {
    //   options: {
    //     //debugInfo: true,
    //     compass: true,
    //     style: 'expanded'
    //   },
    //   compile: {
    //     files: {
    //       'test/tmp/scss.css': ['test/fixtures/compile.scss'],
    //       'test/tmp/sass.css': ['test/fixtures/compile.sass'],
    //       'test/tmp/css.css': ['test/fixtures/compile.css']
    //     }
    //   }
    // }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');

  grunt.loadNpmTasks('grunt-mkdir');


  // grunt.registerTask('mkdir', grunt.file.mkdir);
  grunt.registerTask('dev', ['coffeelint', 'coffee', 'jshint', 'uglify', 'cssmin', 'compass']);
};
