/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'jquery', 'text!../appData.json', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojlistview'],
	function (ko, $, appData, ArrayDataProvider) {

		function DashboardViewModel(params) {
			
			var self = this;

			//console.log(appData);
			self.data = JSON.parse(appData);

			var router = oj.Router.rootInstance;
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
			self.connected = function () {
				// Implement if needed
			};

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
			self.disconnected = function () {
				// Implement if needed
			};

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
			self.transitionCompleted = function () {
				// Implement if needed
			};

			var data = [{
				tripId: 1,
				name: 'Birthday!  The day you were born.',
				image: 'charisse-kenion-415942-unsplash.jpg',
				price: '$750',
				description: 'You can go back in time to the day that started it all for you.  Witness the miracle of life; your life.  Take pictures for your social media feeds!',
				buttonText: 'Birthday (More Details)'//2.4.4
				//buttonText: 'More Details'//3.2.4
			},
			{
				tripId: 2,
				name: 'Kizmet.  The day you met your spouse',
				image: 'charles-deluvio-651959-unsplash.jpg',
				price: '$950',
				description: 'Relive the moment you first set eyes upon your one and only.',
				buttonText: 'Kizmet (More Details)'//2.4.4
				//buttonText: 'More Info'//3.2.4
			},
			{
				tripId: 3,
				name: 'Y2K',
				image: 'roven-images-601197-unsplash.jpg',
				price: '$625',
				description: 'There was a ton of hype about what would happen when the clock struck midnight in the year 2000.  See what transpired.',
				buttonText: 'Y2K (More Details)'//2.4.4
				//buttonText: 'Additional Info'//3.2.4
			},
			{
				tripId: 4,
				name: 'Simpler times',
				image: 'h-e-n-g-s-t-r-e-a-m-508476-unsplash.jpg',
				price: '$865',
				description: 'Why not go back in time when life was easier, no technology, less distractions.',
				//buttonText: 'Simple Times'//2.4.4
				buttonText: 'Simpler Times (More Details)'//3.2.4
			},
			{
				tripId: 5,
				name: 'A future date',
				image: 'jazmin-quaynor-392995-unsplash.jpg',
				price: '$1195',
				description: 'Find out what your future could look like.',
				buttonText: 'The Future (More Details)'//2.4.4
				//buttonText: 'Details'//3.2.4
			},
			{
				tripId: 6,
				name: 'Surfing Hawaii 1900',
				image: 'rbBryan_Natural_Hist_Hawaii_1915_P16_2.jpg',
				price: '$1295',
				description: 'See where it all started by watch Hawaiians surf on wooden planks before anyone else in the world even knew what it was.',
				buttonText: 'Surfing Hawaii (More Details)'//2.4.4
				//buttonText: 'Info'
			},
			{
				tripId: 7,
				name: 'Aretha in Concert',
				image: 'Aretha.jpg',
				price: '$1500',
				description: 'See the legendary Aretha Franklin perform live at the Apollo Theater!!',
				buttonText: 'Aretha Franklin (More Details)'//2.4.4
				//buttonText: 'Concert Details'//3.2.4
			}];
			this.dataProvider = new ArrayDataProvider(self.data,
				{
					keys: self.data.map(function (value) {
						return value.tripId;
					})
				});

			this.viewDetail = function (event, item) {
				var id = item.tripId;
				router.go('detail/' + id);
			}
			// 2.1.1 2.1.2 
			self.helpout = function () {
				window.open('http://my.oracle.com', 'help');
			}

// 1.4.13 
//MINE
			let myTooltip = function () {
				let myTipLink = document.getElementById("myTipLink");
				myTipLink.addEventListener('focus', (event) => {
					doMyPopup(event.target);
				});
				myTipLink.addEventListener('blur', (event) => {
					unDoMyPopup(event.target);
				});
				myTipLink.addEventListener('mouseover', (event) => {
					doMyPopup(event.target);
				});
				myTipLink.addEventListener('mouseout', (event) => {
					unDoMyPopup(event.target);
				});
			}
			let doMyPopup = function(node) {
				let myTooltip = document.getElementById('myTooltip');
				myTooltip.style.display = 'inline';
				//node.style.background = 'pink'; 
			}
			let unDoMyPopup = function(node) {
				let myTooltip = document.getElementById('myTooltip');
				myTooltip.style.display = 'none';
				//node.style.background = 'white'; 
			}
			
			
//JET
			function TooltipHelper(rootElement, helpDataAttr) {
				this.Init(rootElement, helpDataAttr);
			  }
			  var data = (function () {
				var attributes = new WeakMap();
			  
				return function (el, attr, val) {
				  var elAttrs = attributes.get(el);
				  var isSetOperation = arguments.length > 2;
			  
				  if (isSetOperation) {
					if (!elAttrs) attributes.set(el, elAttrs = {});
					elAttrs[attr] = val;
				  } else {
					return datasetOrCachedAttrsValue();
				  }
			  
				  function datasetOrCachedAttrsValue() {
					var attrVal = el.dataset[attr];
			  
					return typeof attrVal !== 'undefined' ?
								attrVal :
								elAttrs && elAttrs[attr];
				  }
				};
			  }());
			  
			  TooltipHelper.prototype.Init = function (rootElement, helpDataAttr) {
				this._AUTO_TIMEOUT = 300000;
				this._OPEN_DELAY = 500;
				this._CONTEXT_NODE = 'tooltip-context-node';
			  
				this._helpDataAttr = !helpDataAttr ? 'data-title' : helpDataAttr;
				this._rootElement = rootElement;
			  
				var uniqueId = 'id' + (new Date()).getTime();
				var tooltipPopup = document.createElement('oj-popup');
				tooltipPopup.setAttribute('id', uniqueId);
				tooltipPopup.style.maxWidth = '340px';
				rootElement.appendChild(tooltipPopup);
				this._tooltipPopupId = tooltipPopup.getAttribute('id');
			  
				var callbackClearTimeout = this._handleClearTimeout.bind(this);
				var callbackSetTimeout = this._handleSetTimeout.bind(this);
				var callbackCleanup = this._handleCleanup.bind(this);
			  
				tooltipPopup.position =
				{
				  my: { horizontal: 'start', vertical: 'top' },
				  offset: { x: 0, y: 10 },
				  at: { horizontal: 'start', vertical: 'end' }
				};
			  
				tooltipPopup.initialFocus = 'none';
				tooltipPopup.autoDismiss = 'focusLoss';
				tooltipPopup.modality = 'modeless';
				tooltipPopup.addEventListener('ojOpen', callbackSetTimeout);
				tooltipPopup.addEventListener('ojClose', callbackCleanup);
				tooltipPopup.addEventListener('ojBeforeClose', callbackClearTimeout);
				tooltipPopup.addEventListener('ojFocus', callbackClearTimeout);
				tooltipPopup.addEventListener('mouseenter', callbackClearTimeout);
			  
				var callbackOpen = this._callbackOpen = this._handleOpen.bind(this);
				this._callbackClose = this._handleClose.bind(this);
			  
				rootElement.addEventListener('mouseenter', callbackOpen, true);
				rootElement.addEventListener('focus', callbackOpen, true);
			  };
			  
			  TooltipHelper.prototype._handleOpen = function (event) {
				var target = event.target;
				var titleContext = this._getTitleContext(target);
			  
				var tooltipPopupId = this._tooltipPopupId;
				var popup = document.getElementById(tooltipPopupId);
			  
				if (titleContext) {
				  var oldNode = data(popup, this._CONTEXT_NODE);
			  
				  if (oldNode && oldNode === titleContext.node) { return; }
			  
				  setTimeout(function () {
					data(popup, this._CONTEXT_NODE, titleContext.node);
					var content = this._getContentNode(popup);
					content.innerHTML = titleContext.title;
					popup.open(target);
				  }.bind(this),
				  this._OPEN_DELAY);
				}
			  };
			  
			  TooltipHelper.prototype._getContentNode = function (popup) {
				var content = popup.querySelector('.oj-popup-content');
				return content;
			  };
			  
			  TooltipHelper.prototype._handleSetTimeout = function () {
				this._timeoutId = window.setTimeout(this._callbackClose, this._AUTO_TIMEOUT);
			  };
			  
			  TooltipHelper.prototype._handleClearTimeout = function () {
				var timeoutId = this._timeoutId;
				delete this._timeoutId;
				window.clearTimeout(timeoutId);
			  };
			  
			  TooltipHelper.prototype._handleCleanup = function (event) {
				var popup = event.target;
				data(popup, this._CONTEXT_NODE, null);
			  };
			  
			  TooltipHelper.prototype._handleClose = function () {
				var tooltipPopupId = this._tooltipPopupId;
				var popup = document.getElementById(tooltipPopupId);
			  
				var isOpen = !popup.isOpen();
				if (!isOpen) {
				  popup.close();
				}
			  };
			  
			  TooltipHelper.prototype._getTitleContext = function (node) {
				var helpDataAttr = this._helpDataAttr;
				var i = 0;
				var MAX_PARENTS = 5;
			  
				while ((node !== null) && (i++ < MAX_PARENTS)) {
				  if (node.nodeType === 1) {
					var title = node.getAttribute(helpDataAttr);
					if (title && title.length > 0) { return { title: title, node: node }; }
				  }
				  node = node.parentNode;
				}
				return null;
			  };
			  
			  TooltipHelper.prototype.destroy = function () {
				var callbackOpen = this._callbackOpen;
				delete this._callbackOpen;
			  
				var callbackClose = this._callbackClose;
				delete this._callbackClose;
			  
				var rootElement = this._rootElement;
				delete this._rootElement;
			  
				rootElement.removeEventListener('mouseenter', callbackOpen, true);
				rootElement.removeEventListener('focus', callbackOpen, true);
				rootElement.removeEventListener('mouseleave', callbackClose, true);
			  
				var tooltipPopupId = this._tooltipPopupId;
				delete this._tooltipPopupId;
			  
				var popup = document.getElementById(tooltipPopupId);
				popup.remove();
			  };
			  
			  require(['knockout', 'ojs/ojbootstrap', 'ojs/ojknockout', 'ojs/ojpopup'], function (ko, Bootstrap) {
				Bootstrap.whenDocumentReady().then(function () {
				  var root = document.getElementById('popupWrapper');
				  var tooltipHelper = new TooltipHelper(root);
				  myTooltip();
				});
			  });



		}

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
		return DashboardViewModel;
	}
);
