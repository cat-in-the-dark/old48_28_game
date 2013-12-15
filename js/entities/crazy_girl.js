game.CrazyGirl = me.ObjectEntity.extend({
    init: function (x, y, settings) {    
        settings.image = "crazy_girl";
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        
        
        this.weapon = game.panel.HAND;
        this.damage = Math.floor(Math.random()*10 + 5);
        this.health = Math.floor(Math.random()*5 + 1);
        
        this.name = "Crazy girl";
        this.parent(x, y, settings);
        this.gravity = 0.0;
        this.type = me.game.ENEMY_OBJECT;
        this.collidable = true;
        
        this.origVelocity = new me.Vector2d(3.0, 3.0);
        this.setMaxVelocity(this.origVelocity.x, this.origVelocity.y);
        
        
        game.objectsPool[this.GUID] = this;
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

    punched: function(damage) {
        this.health -= damage;  
    },
    
    isItTimeToDie: function() {
        if (this.health <= 0) {
            me.game.remove(this);
            delete game.objectsPool[this.GUID];
            return {name: this.name};
        }
        return;
    },
    
    update: function () {
    
    }
});