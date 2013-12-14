

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		// add our child score object at the top left corner
		this.addChild(new game.HUD.ScoreItem(520, 570));
	}
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
		
		// local copy of the global score
		this.health = -1;
        this.ammo = -1;
        this.cage = -1;

		// make sure we use screen coordinates
		this.floating = true;
        
        this.font32 = new me.BitmapFont("32x32_font", 32);
        this.font16 = new me.BitmapFont("16x16_font", 16);
        //this.font.set("right");
	},
    
    updateVars : function () {
        this.health = game.player.health;
        this.ammo =  game.player.ammo;
        this.cage = game.player.cage;
    },
    needHealthUp : function () {
        return this.health !== game.player.health;
    },
    needAmmoUp : function () {
        return this.ammo !== game.player.ammo;
    },
    needCageUp : function () {
        return this.cage !== game.player.cage;
    },

	/**
	 * update function
	 */
	update : function () {
		if( this.needHealthUp() || this.needAmmoUp() || this.needCageUp() ){
            this.updateVars();
            return true;
        }
        
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context, x, y) {
		// draw it baby !
        //console.log('drawed');
        //console.log(this.pos.x);
        //console.log(this.pos.y);
        
        //draw health
        this.font32.draw(context, this.health + '%', this.pos.x, this.pos.y);
        this.font16.draw(context, 'HEALTH', this.pos.x+20, this.pos.y+40);
        
        var dx = 140;
        //draw ammo
        this.font32.draw(context, this.ammo + '/' + this.cage, this.pos.x + dx, this.pos.y);
        this.font16.draw(context, 'AMMO', this.pos.x + dx + 35, this.pos.y+40);
        
        
	}

});
