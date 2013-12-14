
/* Game namespace */
me.game.MAIN_HERO_OBJECT = 4;

var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		girl_choice : ""
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
        
        me.entityPool.add("mainPlayer", game.PlayerEntity);
        me.entityPool.add("bullet", game.BulletEntity, true);
		me.entityPool.add("healthPack", game.HealthPack, true);
        
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.P, "punch");
        
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.INTRO, new game.IntroScreen());

		// Start the game.
		me.state.change(me.state.PLAY);
        //me.state.change(me.state.INTRO);
	},
    
    doPunch: function (source, direction) {
        var settings = {            
            image: "bullet",
            spriteheight: 24,
            spritewidth: 24
        };
        var obj = me.entityPool.newInstanceOf("bullet", source.x, source.y, direction, settings);
        
        me.game.add(obj, 4);
        me.game.sort();
    }
};
