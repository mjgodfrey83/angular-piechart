module.exports = function(grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      dist: 'dist',
      filename: 'angular-piechart',
      karma: {
         unit: {
            configFile: 'karma.conf.js',
            autoWatch: true
         }
      },
      clean: {
         dist: ['<%= dist %>']
      },
      copy: {
         dist: {
            src: ['src/piechart.js'],
            dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'
         }
      },
      uglify: {
         dist: {
            src: ['<%= copy.dist.dest %>'],
            dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.min.js'
         }
      }
   });

   grunt.loadNpmTasks('grunt-karma');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   grunt.registerTask('default', ['karma']);
   grunt.registerTask('build', ['clean', 'copy', 'uglify']);

   return grunt;
};
