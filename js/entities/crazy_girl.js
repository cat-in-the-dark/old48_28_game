game.CrazyGirl = me.ObjectEntity.extend({
    init: function (x, y, settings) {
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
    
    updateDirectionString: function () {
        if (this.vel.y > 0.0) {
            this.directionString = "down";
        }
        if (this.vel.y < 0.0) {
            this.directionString = "up";
        }
        if (this.vel.x > 0.0) {
            this.directionString = "right";
        }
        if (this.vel.x < 0.0) {
            this.directionString = "left";
        }
    },
    
    findHero: function () {
        if (game.player) {
            return new me.Vector2d(
                me.game.player.pos.x
                    + me.game.player.width / 2
                    - this.pos.x - this.width / 2,
                me.game.player.pos.y
                    + me.game.player.height / 2
                    - this.pos.y - this.height / 2
            );
        }
        return;
    },

    
    update: function () {
    
    }
});