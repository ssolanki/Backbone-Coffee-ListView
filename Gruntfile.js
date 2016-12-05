module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-contrib-coffee');
grunt.loadNpmTasks('grunt-contrib-watch');

var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

  };

  // grunt.initConfig( grunt.util._.extend( taskConfig, {} ) );
  grunt.initConfig({
    coffee : {
      compile: {
        files: {
          './script.js': './script.coffee'
        }
      }
    },
    watch: {
      scripts: {
        files: './*.coffee', tasks: ['coffee']
      }
    }
  });

};
