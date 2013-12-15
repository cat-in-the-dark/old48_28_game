function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
        
        this.health = 3;
        
        this.deathSounds = ['mob_die1', 'mob_die2', 'mob_die3', 'mob_die4', 'mob_die5'];
        
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
        this.isItTimeToDie();
    },
    
    isItTimeToDie: function() {
        if (this.health <= 0) {
            console.log(this.GUID + 'Die');
            me.game.remove(this);
            delete game.objectsPool[this.GUID];
            
            var rand = getRandomInt (0,4);
            console.log(rand);
            me.audio.play(this.deathSounds[rand]);
        }
    },
    
    update: function () {
    
    }
});