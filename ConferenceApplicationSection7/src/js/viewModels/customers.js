/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['knockout', 'jquery', 'accUtils', 'ojs/ojrouter', 'text!../appData.json', 'ojs/ojarraydataprovider', 'ojs/ojbutton'],
 function(ko, $, accUtils, Router, appData) {
  
    function CustomerViewModel(params) {
      var self = this;

      var router = Router.rootInstance;
		//console.log(parent.travelTrips()[0]);//[0].fnamevalue());
    //let travelDetails = parent.travelTrips()[0];
    self.tripId = router.currentState().parameters.tripId;
    var tripDetails = JSON.parse(router.currentState().parameters.details);
		self.fnamevalue = ko.observable(tripDetails.fnamevalue);
		self.lnamevalue = ko.observable(tripDetails.lnamevalue);
		self.address1 = ko.observable(tripDetails.address1);
		self.address2 = ko.observable(tripDetails.address2);
		self.emailvalue = ko.observable(tripDetails.emailvalue);
		self.cityvalue = ko.observable(tripDetails.cityvalue);
		self.statevalue = ko.observable(tripDetails.statevalue);
		self.zipvalue = ko.observable(tripDetails.zipvalue);
		self.lengthofstay = ko.observable(tripDetails.lengthofstay);
			
		self.submit = function () {
			router.go('dashboard');
		};
		self.back = function () {
			router.go('register/'+self.tripId);
		};
			
    //self.dataprovider = new oj.ArrayDataProvider(parent.deptObservableArray, {keyAttributes: 'DepartmentId'});
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
	      accUtils.announce('Registration page loaded.');
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return CustomerViewModel;
  }
);
