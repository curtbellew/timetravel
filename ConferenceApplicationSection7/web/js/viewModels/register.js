/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * register module
 */
define(['knockout',
	'jquery', 'accUtils',
	'text!../appData.json',
	'ojs/ojrouter',
	'ojs/ojvalidation-base',
	'ojs/ojknockout',
	'ojs/ojinputtext',
	'ojs/ojlabel',
	'ojs/ojinputnumber',
	'ojs/ojvalidation-number',
	'ojs/ojbutton',
	'ojs/ojdatetimepicker',
	'ojs/ojvalidation-datetime',
	'ojs/ojselectcombobox',
	'ojs/ojtimezonedata',
	'ojs/ojvalidationgroup',
	'ojs/ojformlayout',
	'ojs/ojtable'],
	function (ko, $, accUtils, appData, Router, ValidationBase) {
		function SimpleModel() {
			//var self = this;
			self.data = JSON.parse(appData);
			var router = Router.rootInstance;
			self.details = ko.observable();

			self.tripName = ko.observable();
			self.image = ko.observable();
			self.description = ko.observable();
			self.price = ko.observable();

			self.max = ko.observable(10);
			self.min = ko.observable(1);
			self.step = ko.observable(10);

			if (!self.fnamevalue) {
				self.fnamevalue = ko.observable();
				self.lnamevalue = ko.observable();
				self.address1 = ko.observable();
				self.address2 = ko.observable();
				self.emailvalue = ko.observable();
				self.cemailvalue = ko.observable();
				self.cityvalue = ko.observable();
				self.statevalue = ko.observable();
				self.zipvalue = ko.observable();
				self.val = ko.observable(0);
				self.datevalue = ko.observable(ValidationBase.IntlConverterUtils.dateToLocalIso(new Date(2020, 1, 1)));
				self.lengthofstay = ko.observable(1);
				self.travelernumber = ko.observable(1);
				self.afnamevalue = ko.observable();
				self.alnamevalue = ko.observable();
				self.aagevalue = ko.observable();
				self.allergiesvalue = ko.observable();
				self.zvalue = ko.observable();
			}

	self.connected = function() {
		//accUtils.announce('Registration page loaded.');
		var component = document.querySelector("#notifications");
				component.innerHTML = "Register Loaded";
				let myGreeting = setTimeout(() => {
				component.innerHTML = "";
				}, 2000);
		// Implement if needed
      	};
			self.updateDetails = function (id) {
				var tripDetails = self.data[id - 1];
				if (tripDetails) {
					self.tripName(tripDetails.name);
					self.image(tripDetails.image);
					self.description(tripDetails.description);
				}
			}

			self.tripId = ko.computed(function () {
				var id = router.currentState().parameters.tripId;
				self.updateDetails(id);
				return id;
			}, this);

			self.groupValid = ko.observable();
			self.submit = function () {
				// validate the email matching validator 
				// that is on the second email field.
				document.getElementById("cetext-input").validate();

				var tracker = document.getElementById("tracker");

				if (tracker.valid === "valid") {
					// submit the form would go here
					self.details({
						"fnamevalue": self.fnamevalue(),
						"lnamevalue": self.lnamevalue(),
						"address1": self.address1(),
						"address2": self.address2(),
						"emailvalue": self.emailvalue(),
						"cemailvalue": self.cemailvalue(),
						"cityvalue": self.cityvalue(),
						"statevalue": self.statevalue(),
						"zipvalue": self.zipvalue(),
						"val": self.val(),
						"datevalue": self.datevalue(),
						"lengthofstay": self.lengthofstay(),
						"travelernumber": self.travelernumber()
					});
					router.go('customers/' + self.tripId() + '/' + JSON.stringify(self.details()));
					//alert("everything is valid; submit the form");
				}
				else {
					// show messages on all the components 
					// that have messages hidden.
					tracker.showMessages();
					tracker.focusOn("@firstInvalidShown");
				}
			};
			self.cancel = function () {
				self.fnamevalue = ko.observable();
				self.lnamevalue = ko.observable();
				self.address1 = ko.observable();
				self.address2 = ko.observable();
				self.emailvalue = ko.observable();
				self.cemailvalue = ko.observable();
				self.cityvalue = ko.observable();
				self.statevalue = ko.observable();
				self.zipvalue = ko.observable();
				self.val = ko.observable(0);
				self.datevalue = ko.observable(ValidationBase.IntlConverterUtils.dateToLocalIso(new Date(2020, 1, 1)));
				self.lengthofstay = ko.observable(1);
				self.travelernumber = ko.observable(1);
				self.afnamevalue = ko.observable();
				self.alnamevalue = ko.observable();
				self.aagevalue = ko.observable();
				self.allergiesvalue = ko.observable();
				self.zvalue = ko.observable();
				router.go('dashboard');
			};
			self.email = ko.observable();
			self.email2 = ko.observable();
			//3.3.3
			self.zippers = [{
				'validate': function (value) {
					if (isNaN(value) || value.length != 5) {
						throw new oj.ValidatorError(
							"Error", 'Zip code format incorrect: '+value+'.  The value must be a number that is 5 digits long eg (80831).');
					}
				},
			}];
			//3.3.1
			self.emailMatchValidator = [{
				'validate': function (value) {
					var firstEmail = self.emailvalue();
					var secondEmail = value;
					// "", undefined, null should all compare to equal
					if (!firstEmail)
						firstEmail = "";
					if (!secondEmail)
						secondEmail = "";

					if (firstEmail !== secondEmail) {
						throw new oj.ValidatorError(
							"Error", "Email fields do not match. "+firstEmail+' = '+secondEmail);
					}
				},
			}];
			this.testimonials = function (item, event) {
				router.go('testimonials');
			}

			this.isSmall = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
				oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));
			this.isLargeOrUp = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
				oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP));

			// For small screens: 1 column and labels on top
			// For medium screens: 2 columns and labels on top
			// For large screens or bigger: 2 columns and labels inline
			this.columns = ko.pureComputed(function () {
				return this.isSmall() ? 1 : 2;
			}, this);
			this.labelEdge = ko.pureComputed(function () {
				return this.isLargeOrUp() ? "start" : "top";
			}, this);

			self.clickedButton = ko.observable();
			self.buttonClick = function (event) {
				router.go('dashboard');
				return true;
			}

			//// NUMBER AND DATE CONVERTER ////
			var numberConverterFactory = ValidationBase.Validation.converterFactory("number");
			this.numberConverter = numberConverterFactory.createConverter();

			var dateConverterFactory = ValidationBase.Validation.converterFactory("datetime");
			this.dateConverter = dateConverterFactory.createConverter();


			/**
			 * Optional ViewModel method invoked after transition to the new View is complete.
			 * That includes any possible animation between the old and the new View.
			 */
			self.transitionCompleted = function () {
				// Implement if needed
			};

		};

		return SimpleModel;
	});
