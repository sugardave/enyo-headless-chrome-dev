enyo.kind({
	name: "Regular",
	kind: enyo.Component,
	components: [
		{name: "screen", kind: enyo.Control, components: [
			{kind: enyo.Pane, className: "enyo-fit", components: [
				{name: "firstView", kind: enyo.VFlexBox, components: [
					{kind: enyo.Header, content: "Regular view"},
					{kind: enyo.Spacer},
					{layoutKind: enyo.HFlexLayout, pack: "center", components: [
						{kind: enyo.Spacer},
						{name: "newCard", kind: enyo.Button, caption: "Open New Card", onclick: "openCard"},
						{kind: enyo.CheckBox, style: "margin-left: 15px;"},
						{content: "Force new card"},
						{kind: enyo.Spacer}
					]}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	ready: function() {
		this.$.screen.renderInto(document.body);
	},
	openCard: function() {
		var app = enyo.application.App;
		var card = {
			path: enyo.fetchAppRootPath() + "source/views/specialized/specialized.html",
			browserKind: "Specialized"
		};
		app.openCard("specialized", card, this.$.checkBox.getChecked());
	}
});