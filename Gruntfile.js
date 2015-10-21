'use strict';

module.exports = function(grunt) {

	var path = require('path');

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist',
        maven: 'dist'
	};
	
    // Project configuration.
    grunt.initConfig({
 
		pkg: grunt.file.readJSON('package.json'),
		
        bower: {
		    dev: {
                dest: './app/lib',
                css_dest: './app/lib',
                options: {
                    expand: true,
                    packageSpecific: {
                        bootstrap: {
                          files: [
                            "dist/fonts/glyphicons-halflings-regular.*",
                            "dist/css/*.*",
                            "dist/js/*.*"  
                          ]
                        }
                    }
                }
            }
		},

		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				autoWatch: true
			}
		}
    });

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-bower');
    
	// Default task.
	grunt.registerTask('default', ['karma']);
    
};
