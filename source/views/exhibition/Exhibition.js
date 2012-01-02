enyo.kind({
	name: "Exhibition",
	kind: enyo.Component,
	components: [
		{name: "screen", kind: enyo.Control, className: "enyo-fit", components: [
			{kind: enyo.Pane, components: [
				{name: "firstView", components: [
					{kind: enyo.Header, content: "Exhibition view"}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	ready: function() {
		this.$.screen.renderInto(document.body);
	}
});