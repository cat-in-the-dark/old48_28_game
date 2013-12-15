game.CrazyGirl = me.ObjectEntity.extend({
    init: function (x, y, settings) {    
        settings.image = "crazy_girl";
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        
        this.weapon = game.panel.HAND;
        this.damage = game.getRandomInt(10,15);
        this.health = game.getRandomInt(1,5);
        this.activateDist = 450;
        
        this.directionString = "up"
        this.name = "Crazy girl";
        this.parent(x, y, settings);
        this.gravity = 0.0;
        this.type = me.game.ENEMY_OBJECT;
        this.collidable = true;
        
        this.origVelocity = new me.Vector2d(2.0, 2.0);
        this.setMaxVelocity(this.origVelocity.x, this.origVelocity.y);
        this.setVelocity(this.origVelocity.x, this.origVelocity.y);
        
        this.setFriction(0.40, 0.40);
        this.knocked = false;
        this.knockTimeout = 100;
        
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
                game.player.pos.x
                    + game.player.width / 2
                    - this.pos.x - this.width / 2,
                game.player.pos.y
                    + game.player.height / 2
                    - this.pos.y - this.height / 2
            );
        }
        return;
    },

    punched: function(damage) { 
        this.health -= damage;
        var vectorToHero = this.findHero();
        var knockback = 5;
        this.vel.x += vectorToHero.x * knockback * -0.5;
        this.vel.y += vectorToHero.y * knockback * -0.5;
        this.knocked = true;
        var that = this;
        setTimeout(function(){
            that.knocked = false;
        }, this.knockTimeout);
    },
    
    isItTimeToDie: function() {
        if (this.health <= 0) {
            me.game.remove(this);
            delete game.objectsPool[this.GUID];

            var rand = game.getRandomInt (0,4);
            me.audio.play(this.deathSounds[rand]);

            return {name: this.name};
        }
        return;
    },
    
    calcVel: function () {
        var direction = this.findHero();
        var vel = new me.Vector2d(0.0, 0.0);
        var dist = direction.length();
        if (dist < this.activateDist && dist > 0) {
            //this.renderable.setCurrentAnimation(this.directionString + '-run');
            direction.normalize();
            vel.x = direction.x * this.accel.x;
            vel.y = direction.y * this.accel.y;
           // this.direction = direction;
        }
        return vel;
    },
    
    update: function () {
        if (!this.knocked) {
            var vel = this.calcVel();  
            this.vel.x += vel.x;
            this.vel.y += vel.y;
        }
        if (this.vel.x != 0 || this.vel.y != 0) {
            this.updateMovement();
            return true;
        }
        //this.renderable.setCurrentAnimation(this.directionString + '-idle');
        return false;
    }
});