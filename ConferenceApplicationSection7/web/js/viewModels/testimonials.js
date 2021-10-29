/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your testimonials ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'accUtils', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojlabel', 
      'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojdialog'],
 function(oj, ko, $, accUtils) {
  
    function IncidentsViewModel() {
      var self = this;

      self.trip = ko.observable("");
      self.name = ko.observable("");
      self.comment = ko.observable("");
      var testimonialArray = [
        {name:"Chuck World-Traveler", trip: "Y2K", comment:"HELP!!!  I'm stuck in the Y2K!"},
        {name:"Donny Baseball", trip: "Any", comment:"I would really love to see a trip that goes to the very first World Series"},
        {name:"Curtis Married", trip: "The day you met your spouse", comment: "It was a fantastic trip, except that I had to relive some high school days that I would rather forget."},
        {name:"Michele Quilter", trip: "Simplier times", comment:"Yep, quilts today are as good or better than they were back in the day."},
		{name:"Don Mauck", trip: "Aretha Franklin", comment:"Too far from the stage, couldn't see a darn thing."}
      ];

	  //2.2.1
	  /*setTimeout(function(){ 
		document.querySelector('#modalDialog1').open();
	  }, 4000);*/

      self.comments = ko.observableArray(testimonialArray);

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
        accUtils.announce('Reviews page loaded.');
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

      self.submit = function () {
        var newComment = {
          name: self.name(),
          trip: self.trip(),
          comment: self.comment()
        };
        
        self.comments.push(newComment);
        let statusDiv = document.querySelector('#statusMsg');
        setTimeout(function(){ statusDiv.innerHTML = "Trip review added!"; }, 20);
        setTimeout(function(){ statusDiv.innerHTML = ""; }, 600);
        self.name("");
        self.trip("");
        self.comment("")
      };
	  
		// 3.2.1 
		$('a.favorite').keydown(function(event){
			
			event.preventDefault();
			var href = $(this).attr('href');
			var text = $(this).text();
			window.open(href, text);
		});
		//3.2.3
		let localnavdata = parent.navDataSource;// = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
		let openDiagBoolean = true;
		self.openDiag = function () {
			let thedia = document.querySelector('#modalDialog2');
			if (openDiagBoolean) {
				thedia.open();
				openDiagBoolean = false;
			}
			//let diabutton = document.querySelector('#dialogbutton');
			//diabutton.removeAttribute('data-bind');
			//console.log('modal '+document.querySelector('#modalDialog1'));
			//document.querySelector('#modalDialog1').open();
		};
		
		//3.2.2
		self.valueChangeListner = function(event, data){
			console.log(event);
		};
	}
    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
	//ko.applyBindings(null, document.getElementById('dialogWrapper'));
	//ko.cleanNode(document.getElementById('dialogWrapper'));
    //ko.applyBindings(new SimpleModel(), document.getElementById('dialogWrapper'));
    return new IncidentsViewModel();
  }
);
