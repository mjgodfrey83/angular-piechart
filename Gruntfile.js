module.exports = function(grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      dist: 'dist',
      test: 'test',
      filename: '<%= pkg.name %>',
      connect: {
         harness: {
            options: {
               port: 8000,
               hostname: 'localhost',
               livereload: true
            }
         },
         test: {
            options: {
               port: 8000,
               hostname: 'localhost'
            }
         }
      },
      karma: {
         options: {
            configFile: 'karma.conf.js'
         },
         unit: {
            autoWatch: true
         },
         travis: {
            singleRun: true,
            reporters: ['dots'],
            browsers: ['Firefox']
         }
      },
      protractor: {
         options: {
            configFile: 'protractorConf.js',
            keepAlive: true,
            noColor: false,
            args: {
               framework: 'jasmine2'
            }
         },
         e2e: {},
         travis: {
            options: {
               args: {
                  browser: 'Firefox'
               }
            }
         }
      },
      clean: {
         dist: ['<%= dist %>'],
         test: ['<%= test %>/<%= filename %>.js']
      },
      concat: {
         options: {
            banner: 'angular.module(\'charts\', [\'piechart\', \'linechart\']);\n\n'
         },
         dist: {
            src: ['src/piechart.js', 'src/linechart.js'],
            dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
         },
         test: {
            src: ['src/piechart.js', 'src/linechart.js'],
            dest: '<%= test %>/<%= filename %>.js'
         }
      },
      uglify: {
         dist: {
            src: ['<%= concat.dist.dest %>'],
            dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.min.js'
         }
      },
      watch: {
         harness: {
            files: ['src/*.js'],
            tasks: ['clean:test', 'concat:test'],
            options: {
               livereload: true
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-karma');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-protractor-runner');
   grunt.loadNpmTasks('grunt-contrib-connect');

   grunt.registerTask('default', ['karma:unit']);
   grunt.registerTask('build', ['clean:dist', 'concat:dist', 'uglify:dist']);
   grunt.registerTask('harness', ['clean:test', 'concat:test', 'connect:harness', 'watch:harness']);
   grunt.registerTask('e2e', ['clean:test', 'concat:test', 'connect:test', 'protractor:e2e']);

   return grunt;
};
