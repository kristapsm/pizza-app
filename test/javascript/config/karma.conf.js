// Karma configuration
// Generated on Mon Sep 15 2014 11:04:13 GMT+0300 (FLE Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../../',


    // frameworks to use
    frameworks: ['jasmine'],
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter


    // list of files / patterns to load in the browser
    files: [
	  'web-app/js/lib/angular/angular.js',
	  'web-app/js/lib/angular/angular-route.js',
	  'web-app/js/lib/angular/angular-resource.js',
	  'web-app/js/lib/angular/angular-mocks.js', 
	  'web-app/js/lib/angular/angular-animate.js', 
	  'web-app/js/lib/angular/angular-cookies.js',
	  'web-app/js/lib/sortable.js',
	  'test/javascript/lib/bower_components/jquery/dist/jquery.js',
      'web-app/js/*.js',
      'web-app/js/lib/*.js',
	  'test/javascript/unit/controllersSpec.js',
	  'test/javascript/unit/filterSpec.js',
	  'test/javascript/unit/directivesSpec.js',
	  'test/javascript/unit/servicesSpec.js',
	  'test/javascript/unit/appSpec.js',
    ],


    // list of files to exclude
    exclude: [
	'web-app/js/bla.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
		'web-app/js/controllers.js' : 'coverage',
		'web-app/js/filters.js' : 'coverage',
		'web-app/js/directives.js' : 'coverage',
		'web-app/js/services.js' : 'coverage',
		'web-app/js/app.js' : 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],

	coverageReporter : {
		type: 'html',
		dir : 'test/javascript/unit/coverage/',
	},

    // web server port
    port: 8001,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

	
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome','PhantomJS'],
	plugins: [
		 'karma-jasmine',
		 'karma-chrome-launcher',
		 'karma-firefox-launcher',
		 'karma-phantomjs-launcher',
		 'karma-coverage'
	]	,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
