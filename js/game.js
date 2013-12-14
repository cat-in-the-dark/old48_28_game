
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
    player: {
        health : 100,
        ammo: 48,
        cage: 12
    },
	
	
	// Run on page load.
	"onload" : function () {
        
    //registry panel resize callback to video engine
    game.panel.init();
    //patch the engine. Get resize callback
    me.video.panelResize = game.panel.onResize;
        
	// Initialize the video.
	if (!me.video.init("screen", 864, 640, true, 'auto')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
        game.panel.resourceLoad();
        game.panel.clear();
        
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		me.state.change(me.state.PLAY);
	}
};
