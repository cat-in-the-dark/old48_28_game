
/* Game namespace */
me.game.MAIN_HERO_OBJECT = 4;
me.game.ASSISTANT_OBJECT = 5;

var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		girl_choice : ""
	},
    //this is for bullets and kill list
    // ATTENTION - this values will be replaced by object GUID when in was created
    MAIN_HERO_ID: 0,
    DOCTOR_GIRL_ID: 1,
    SHUTER_GIRL_ID: 2,
    
    objectsPool: {},
	
	
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
        me.entityPool.add("crazy-girl", game.CrazyGirl);
        me.entityPool.add("bullet", game.BulletEntity, true);
		me.entityPool.add("healthPack", game.HealthPack, true);
		me.entityPool.add("ammoPack", game.AmmoPack, true);
        me.entityPool.add("assistant", game.AssistantEntity, true);
        
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
    
    doPunch: function (id, source, direction) {
        var settings = { 
            id: id,
            image: "bullet",
            spriteheight: 24,
            spritewidth: 24
        };
        var obj = me.entityPool.newInstanceOf("bullet", source.x, source.y, direction, settings);
        
        me.game.add(obj, 4);
        me.game.sort();
    },
    
    hitObject: function (whoHitId, targetId, damage) {
        damage = damage || 1;
        console.log(whoHitId, targetId);
        if (!targetId || !game.objectsPool[targetId]){ return; }
        
        var puncher = this.objectsPool[whoHitId];
        var obj = this.objectsPool[targetId];
        obj.punched(damage);
        var dieInfo;
        if (dieInfo = obj.isItTimeToDie()){
            game.panel.kill(puncher.name, puncher.weapon, dieInfo.name);
            console.log('Die ' + dieInfo.name);
        }
    }
};
