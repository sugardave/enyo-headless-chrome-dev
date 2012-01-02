enyo.kind({
	name: "WindowManager",
	kind: enyo.Object,
	inBrowser: false,
	uniqueCards: {},
	constructor: function(inArgs) {
		this.inherited(arguments);
		if (!window.PalmSystem) {
			this.inBrowser = true;
		}
	},
	openCard: function(name, inParams, forceNewCard, inWindow) {
		var path = inParams.path, browserKind = inParams.browserKind;
		if (forceNewCard) {
			// generate a unique name for the card
			if (!this.uniqueCards[name]) {
				this.uniqueCards[name] = 0;
			}
			
			name = name + "-" + (this.uniqueCards[name]++);
		}

		if (this.inBrowser) { // need to open a tab or create a kind
			var windows = enyo.windows.getWindows();
			if (windows.startup) { // window named startup means no other windows and we just started, load a kind
				enyo.create({
					kind: browserKind,
					windowParams: inParams
				});
				enyo.windows.renameWindow(windows.startup, name);  // rename the window so we fail the check next time
				return windows[name];
			} else { // already have used the startup window to load a kind, load a tab
				inWindow.open(path, name);
				return inWindow;
			}
		} else { // not in the browser, be normal
			window = enyo.windows.activate(path, name, inParams, inParams.dockMode ? {window: "dockMode"} : {});
			return window;
		}
	}
});