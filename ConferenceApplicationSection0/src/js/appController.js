/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojknockouttemplateutils', 'ojs/ojrouter', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider',
  'ojs/ojoffcanvas', 'ojs/ojmodule-element', 'ojs/ojknockout'],
  function (ko, moduleUtils, KnockoutTemplateUtils, Router, ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider, OffcanvasUtils) {
    function ControllerViewModel() {
      var self = this;

      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      self.homeTitle = ko.observable('Time Travel');

      // Handle announcements sent when pages change, for Accessibility.
      self.manner = ko.observable('polite');
      self.message = ko.observable();
      self.waitForAnnouncement = false;
      self.navDrawerOn = false;

      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

      /*
        @waitForAnnouncement - set to true when the announcement is happening.
        If the nav-drawer is ON, it is reset to false in 'ojclose' event handler of nav-drawer.
        If the nav-drawer is OFF, then the flag is reset here itself in the timeout callback.
      */
      function announcementHandler(event) {
        self.waitForAnnouncement = true;
        setTimeout(function () {
          self.message(event.detail.message);
          self.manner(event.detail.manner);
          if (!self.navDrawerOn) {
            self.waitForAnnouncement = false;
          }
        }, 200);
      };

      // Media queries for repsonsive layouts
      var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      // Router setup
      self.router = Router.rootInstance;
      self.router.configure({
        'dashboard': { label: 'Dashboard', isDefault: true },
        'register/{tripId}': { label: 'register' },
        'testimonials': { label: 'Testimonials' },
        'customers/{tripId}/{details}': { label: 'Customers' },
        'about': { label: 'About' },
        'survey': { label: 'Survey' },
        //'reviews': { label: 'Reviews' },
        'detail/{tripId}/{edit}': { label: 'Detail', value: 'detail' }
      });
      Router.defaults['urlAdapter'] = new Router.urlParamAdapter();

      self.loadModule = function () {
        self.moduleConfig = ko.pureComputed(function () {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          return moduleUtils.createConfig({
            viewPath: viewPath,
            viewModelPath: modelPath, params: { parentRouter: self.router, rootVM: self }
          });
        });
      };

      // Navigation setup
      var navData = [
        {
          name: 'Dashboard', id: 'dashboard',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
        },
        /* 2.4.5 */
        /*{
          name: 'Reviews', id: 'testimonials',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
        },*/
      /*{name: 'My Trips', id: 'about',
         iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-catalog-icon-24'},
      {name: 'Support', id: 'about',
         iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'},
      {name: 'Account', id: 'about',
         iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-edit-icon-24'},
      */{
          name: 'Survey', id: 'survey',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-edit-icon-24'
        },
        {
          name: 'About', id: 'about',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
        }

      ];
      self.navDataProvider = new ArrayDataProvider(navData, { keyAttributes: 'id' });

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () { OffcanvasUtils.close(self.drawerParams); });
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        self.navDrawerOn = true;
        return OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      document.getElementById('navDrawer').addEventListener("ojclose", onNavDrawerClose);

      /*
        - If there is no aria-live announcement, bring focus to the nav-drawer button immediately.
        - If there is any aria-live announcement in progress, add timeout to bring focus to the nav-drawer button.
        - When the nav-drawer is ON and annoucement happens, then after nav-drawer closes reset 'waitForAnnouncement' property to false.
      */
      function onNavDrawerClose(event) {
        self.navDrawerOn = false;
        if (!self.waitForAnnouncement) {
          document.getElementById('drawerToggleButton').focus();
          return;
        }

        setTimeout(function () {
          document.getElementById('drawerToggleButton').focus();
          self.waitForAnnouncement = false;
        }, 2500);
      }

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("OraTime Travel");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");


      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);


      // self.travelTrip = ko.observable();

      // var deptArrayObservables = [
      //   { DepartmentId: ko.observable(), 
      //     DepartmentName: ko.observable(), 
      //     LocationId: ko.observable(), 
      //     FoodAl: ko.observable(), 
      //     Type: ko.observable() }
      // ];
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
      // self.deptObservableArray = ko.observableArray(deptArrayObservables);
      // self.dataprovider = new ArrayDataProvider(self.deptObservableArray);

      // var testimonialArray = [
      //   { name: "Chuck World-Traveler", trip: "Y2K", comment: "HELP!!!  I'm stuck in the Y2K!" },
      //   { name: "Donny Baseball", trip: "Any", comment: "I would really love to see a trip that goes to the very first World Series" },
      //   { name: "Curtis Married", trip: "The day you met your spouse", comment: "It was a fantastic trip, except that I had to relive some high school days that I would rather forget." },
      //   { name: "Michele Quilter", trip: "Simplier times", comment: "Yep, quilts today are as good or better than they were back in the day." }
      // ];
      // var testimonialArrayObservables = testimonialArray.map(function (row) {
      //   Object.keys(row).forEach(function (attr) {
      //     row[attr] = ko.observable(row[attr]);
      //   });
      //   return row;
      // });
      // self.testimonialObservableArray = ko.observableArray(testimonialArrayObservables);

      // var tripsArray = [{
      //   tripId: 1,
      //   name: 'The day you were born',
      //   image: 'charisse-kenion-415942-unsplash.jpg',
      //   price: '$750',
      //   description: 'You can go back in time to the day that started it all for you.  Witness the miracle of life; your life.  Take pictures for your social media feeds!'
      // },
      // {
      //   tripId: 2,
      //   name: 'The day you met your spouse',
      //   image: 'charles-deluvio-651959-unsplash.jpg',
      //   price: '$950',
      //   description: 'Relive the moment you first set eyes upon your one and only.'
      // },
      // {
      //   tripId: 3,
      //   name: 'Y2K',
      //   image: 'roven-images-601197-unsplash.jpg',
      //   price: '$625',
      //   description: 'There was a ton of hype about what would happen when the clock struck midnight in the year 2000.  See what transpired.'
      // },
      // {
      //   tripId: 4,
      //   name: 'Simplier times',
      //   image: 'h-e-n-g-s-t-r-e-a-m-508476-unsplash.jpg',
      //   price: '$865',
      //   description: 'Why not go back in time when life was easier, no technology, less distractions.'
      // },
      // {
      //   tripId: 5,
      //   name: 'A future date',
      //   image: 'jazmin-quaynor-392995-unsplash.jpg',
      //   price: '$1195',
      //   description: 'Find out what your future could look like.'
      // },
      // {
      //   tripId: 6,
      //   name: 'Surfing Hawaii 1900',
      //   image: 'rbBryan_Natural_Hist_Hawaii_1915_P16_2.jpg',
      //   price: '$1295',
      //   description: 'See where it all started by watch Hawaiians surf on wooden planks before anyone else in the world even knew what it was.'
      // },
      // {
      //   tripId: 7,
      //   name: 'See Aretha in Concert',
      //   image: 'Aretha.jpg',
      //   price: '$1500',
      //   description: 'See the legendary Aretha Franklin perform live at the Apollo Theater!!',
      // }];

      // var tripsArrayObservables = tripsArray.map(function (row) {
      //   Object.keys(row).forEach(function (attr) {
      //     row[attr] = ko.observable(row[attr]);
      //   });
      //   return row;
      // });
      // self.tripsObservableArray = ko.observableArray(tripsArrayObservables);


    }

    return new ControllerViewModel();
  }
);
