/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['knockout', 'accUtils', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojarraydataprovider'],
 function(ko, accUtils) {
    function SurveyViewModel() {
    var self = this;
      self.connected = function() {
        //accUtils.announce('Survey page loaded.');
        var component = document.querySelector("#notifications");
				component.innerHTML = "Survey page Loaded";
				let myGreeting = setTimeout(() => {
				component.innerHTML = "";
				}, 2000);
        // Implement if needed
      };
    var deptArray = [
        {UserId: "michele@vandoozer.com", TripName: 'Aretha', AccomidationId: "Great", FoodId: "Great"},
        {UserId: "curt@bellew.com", TripName: 'Y2K', AccomidationId: "Good", FoodId: "Decent"},
        {UserId: "don@raikes.com", TripName: 'Birthday', AccomidationId: "Wonderful", FoodId: "Wonderful"},
        {UserId: "don@mauck.com", TripName: 'Kizmet', AccomidationId: "Awesome", FoodId: "Good"},
        {UserId: "monica@gaines.com", TripName: 'Surfing', AccomidationId: "Awesome", FoodId: "Awesome"},
        {UserId: "kent@boucher.com", TripName: 'Y2K', AccomidationId: "Good", FoodId: "Decent"},
        {UserId: "charles@adams.com", TripName: 'Birthday', AccomidationId: "Decent", FoodId: "Decent"},
        {UserId: "gary@harris.com", TripName: 'Birhday', AccomidationId: "Wonderful", FoodId: "Awesome"},
        {UserId: "nikola@jokic.com", TripName: 'Kizmet', AccomidationId: "Good", FoodId: "Decent"},
        {UserId: "jamal@murry.com", TripName: 'Aretha', AccomidationId: "Decent", FoodId: "Awesome"},
        {UserId: "mason@plumlee.com", TripName: 'Y2K', AccomidationId: "Awesome", FoodId: "Good"},
        {UserId: "paul@millsap.com", TripName: 'Surfing', AccomidationId: "Awesome", FoodId: "Decent"},
        {UserId: "phillip@lindsay.com", TripName: 'Surfing', AccomidationId: "Awesome", FoodId: "Decent"}/*,
        {DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
        {DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300},
        {DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
        {DepartmentId: 1009, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
        {DepartmentId: 1011, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
        {DepartmentId: 2011, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 3011, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 4011, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
        {DepartmentId: 5011, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
        {DepartmentId: 6011, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
        {DepartmentId: 7011, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
        {DepartmentId: 8011, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
        {DepartmentId: 9011, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
        {DepartmentId: 10011, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
        {DepartmentId: 11011, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
        {DepartmentId: 12011, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
        {DepartmentId: 13011, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300},
        {DepartmentId: 14011, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
        {DepartmentId: 15011, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
        {DepartmentId: 21022, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
        {DepartmentId: 22022, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 23022, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 24022, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
        {DepartmentId: 25022, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
        {DepartmentId: 26022, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
        {DepartmentId: 27022, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
        {DepartmentId: 28022, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
        {DepartmentId: 29022, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
        {DepartmentId: 310022, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
        {DepartmentId: 311022, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
        {DepartmentId: 312022, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
    {DepartmentId: 313022, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300}*/
  ];
       //self.dataprovider2 = new oj.ArrayDataProvider(deptArray, {keyAttributes: 'DepartmentId', implicitSort: [{attribute: 'DepartmentId', direction: 'ascending'}]});
       self.dataprovider = ko.observableArray(deptArray);
      //var self = this;
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
    return SurveyViewModel;
  }
);
