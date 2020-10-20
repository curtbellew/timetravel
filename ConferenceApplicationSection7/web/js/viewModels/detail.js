/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * View Model for detail screen
 */
define(['knockout', 'jquery', 'text!../appData.json', 'ojs/ojknockout', 'ojs/ojbutton'
], function (ko, $, appData) {

  /**
   * The view model for the main content view template
   */
  function detailContentViewModel(params) {
    var self = this;

    var data = JSON.parse(appData);
    var router = oj.Router.rootInstance;
    var parent = params.parentVM;

    self.tripId = ko.observable("default");
    self.tripName = ko.observable("default");
    self.image = ko.observable("default");
    self.description = ko.observable("default");
    self.price = ko.observable("default");
    // var lView = ko.dataFor(document.getElementById('listview'));
    // var trip = parent.dataProvider.data[0];

    // self.name = trip.name;
    // self.image = trip.image
    // self.description = trip.description;
    // self.price = trip.price;

    this.updateDetails = function (id) {
      var tripsData = data // parent.tripsObservableArray();
      var tripDetails = tripsData[id - 1];
      if (tripDetails) {
        self.tripId(tripDetails.tripId);
        self.tripName(tripDetails.name);
        self.image(tripDetails.image);
        self.description(tripDetails.description);
        self.price(tripDetails.price);
      }
    }

    var tripId = ko.computed(function () {
      var id = router.currentState().parameters.tripId;
      self.updateDetails(id);
      return id;
    }, this);

    this.bookTrip = function (event, item) {
      router.go('register/' + self.tripId());
    }
    this.availability = function (event, item) {
      //var id = item.tripId;
      //self.selectedTrip = id;
      //router.go('register/'+id);
      router.go('testimonials');
    }
    this.testimonials = function (event, item) {
      router.go('testimonials');
    }

    var node = document.querySelector("#notifications");
    var busyContext = oj.Context.getContext(node).getBusyContext();
    busyContext.whenReady().then(function () {
      var component = document.querySelector("#notifications");
      component.innerHTML = "Content Loaded";
      let trap = $('a.trap');
      $('a.trap').keydown(function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        var text = $(this).text();
        window.open(href, text);
      });
    });

    this.allTrips = function (event) {
      router.go('dashboard');
    }
    this.review = function (event) {
      router.go('about');
    }
  }

  return detailContentViewModel;
});
