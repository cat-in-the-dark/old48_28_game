game.CrazyGirl = me.ObjectEntity.extend({
    init: function(x, y, settings){
        settings.image = "crazy_girl";
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        
        this.parent(x, y, settings);  
        this.gravity = 0.0;
        this.type = me.game.ENEMY_OBJECT;
        this.collidable = true;
        
        this.origVelocity = new me.Vector2d(3.0, 3.0);
        this.setMaxVelocity(this.origVelocity.x, this.origVelocity.y);
        
        this.hp = 3;
        
    },
    
    updateDirectionString: function() {
        if ( this.vel.y > 0.0 ) {
            this.directionString = "down";
        }
        if ( this.vel.y < 0.0 ) {
            this.directionString = "up";
        }
        if ( this.vel.x > 0.0 ) {
            this.directionString = "right";
        }
        if ( this.vel.x < 0.0 ) {
            this.directionString = "left";
        }
    },

    
    update: function() {
    
    }
});