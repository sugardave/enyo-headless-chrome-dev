enyo.kind({
	name: "App",
	kind: enyo.Object,
	constructor: function(inArgs) {
		this.inherited(arguments);
		enyo.application.WindowManager = this.windowManager = new WindowManager();
		enyo.application.app = this;
	},
	startup: function(inParams) {
		var params = inParams || {}; // start building the window parameters we want
		var cardName;

		params = enyo.mixin(params, enyo.windowParams);  // add the existing window parameters
		if (!params || Object.keys(params).length == 0) { // no parameters
			
			cardName = "regular";

			// set default params
			params.path = enyo.fetchAppRootPath() + "source/views/regular/regular.html";
			params.browserKind = "Regular"; // the name of the kind if needed for browser launch of first window
		} else {
			// do special things based on params (Exhibition mode, for example)
		}

		this.openCard(cardName, params, params.forceNewCard);
	},
	relaunch: function() {
		// just run the startup again
		this.startup();
	},
	openCard: function(name, inParams, forceNewCard, inWindow) {
		this.windowManager.openCard(name, inParams, forceNewCard, inWindow ? inWindow : window);
	}
})