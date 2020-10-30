/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
{
  baseUrl: 'js',

  // Path mappings for the logical module names
  // Update the main-release-paths.json for release mode when updating the mappings
  paths:
  //injector:mainReleasePaths
  {
    'knockout': 'libs/knockout/knockout-3.4.2.debug',
    'jquery': 'libs/jquery/jquery-3.3.1',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v5.1.0/debug',
    'ojL10n': 'libs/oj/v5.1.0/ojL10n',
    'ojtranslations': 'libs/oj/v5.1.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals',
    'customElements': 'libs/webcomponents/custom-elements.min',
    'proj4': 'libs/proj4js/dist/proj4-src',
    'css': 'libs/require-css/css',
  }
  //endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar', 'ojs/ojarraydataprovider'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded

    $(function() {

      function init() {
        oj.Router.sync().then(
          function () {
			  
			self.travelTrip = ko.observable();

			var deptArrayObservables = [{DepartmentId: ko.observable(), DepartmentName: ko.observable(), LocationId: ko.observable(), FoodAl: ko.observable(), Type: ko.observable()}];
			/*[{DepartmentId: 'Ron', DepartmentName: 'Swanson', LocationId: 45, FoodAl: 'None', Type: 'Leo'},
                     {DepartmentId: 'Thom', DepartmentName: 'Trinidad', LocationId: 40, FoodAl: 'None', Type:'Leo'},
                     {DepartmentId: 'Errin', DepartmentName: 'Martinez', LocationId: 42, FoodAl: 'Unions', Type: 'Leo'},
                     {DepartmentId: 'Yolanda', DepartmentName: 'Green', LocationId: 41, FoodAl: 'None', Type: 'Leo'}];
			var deptArrayObservables = deptArray.map(function(row) {
			  Object.keys(row).forEach(function(attr) {
				row[attr] = ko.observable(row[attr]);
			  });
			  return row;
			});*/
			self.deptObservableArray = ko.observableArray(deptArrayObservables);
			self.dataprovider = new oj.ArrayDataProvider(self.deptObservableArray);

			var testimonialArray = [
				{name:"Chuck World-Traveler", trip: "Y2K", comment:"HELP!!!  I'm stuck in the Y2K!"},
				{name:"Donny Baseball", trip: "Any", comment:"I would really love to see a trip that goes to the very first World Series"},
				{name:"Curtis Married", trip: "The day you met your spouse", comment: "It was a fantastic trip, except that I had to relive some high school days that I would rather forget."},
				{name:"Michele Quilter", trip: "Simplier times", comment:"Yep, quilts today are as good or better than they were back in the day."}
			];
			var testimonialArrayObservables = testimonialArray.map(function(row) {
				Object.keys(row).forEach(function(attr) {
					row[attr] = ko.observable(row[attr]);
				});
				return row;
			});
			self.testimonialObservableArray = ko.observableArray(testimonialArrayObservables);
    
			var tripsArray = [{
          tripId: 1,
          name: 'The day you were born', 
          image: 'charisse-kenion-415942-unsplash.jpg',
          price: '$750',
          description: 'You can go back in time to the day that started it all for you.  Witness the miracle of life; your life.  Take pictures for your social media feeds!'
        },
        {
          tripId: 2,
          name: 'The day you met your spouse', 
          image: 'charles-deluvio-651959-unsplash.jpg',
          price: '$950',
          description: 'Relive the moment you first set eyes upon your one and only.'
        },
        {
          tripId: 3,
          name: 'Y2K', 
          image:  'roven-images-601197-unsplash.jpg',
          price: '$625',
          description: 'There was a ton of hype about what would happen when the clock struck midnight in the year 2000.  See what transpired.'
        },
        {
          tripId: 4,
          name: 'Simplier times', 
          image: 'h-e-n-g-s-t-r-e-a-m-508476-unsplash.jpg',
          price: '$865',
          description: 'Why not go back in time when life was easier, no technology, less distractions.'
        },
        {
          tripId: 5,
          name: 'A future date',
          image: 'jazmin-quaynor-392995-unsplash.jpg',
          price: '$1195',
          description: 'Find out what your future could look like.'
		},
		{
          tripId: 6,
          name: 'Surfing Hawaii 1900', 
          image: 'rbBryan_Natural_Hist_Hawaii_1915_P16_2.jpg',
          price: '$1295',
          description: 'See where it all started by watch Hawaiians surf on wooden planks before anyone else in the world even knew what it was.'
    },
    {
        tripId: 7,
        name: 'See Aretha in Concert',
        image: 'Aretha.jpg',
        price: '$1500',
        description: 'See the legendary Aretha Franklin perform live at the Apollo Theater!!',
      }];
      
      var tripsArrayObservables = tripsArray.map(function(row) {
        Object.keys(row).forEach(function(attr) {
          row[attr] = ko.observable(row[attr]);
        });
        return row;
      });
      self.tripsObservableArray = ko.observableArray(tripsArrayObservables);	


            app.loadModule();
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('globalBody'));
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });

  }
);
