game.CrazyGirl = me.ObjectEntity.extend({
    init: function (x, y, settings) {    
        settings.image = "crazy_girl";
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        this.parent(x, y, settings);
        
        this.updateColRect(8, 32, 8, 32);
        this.weapon = game.panel.SPOON;
        this.damage = game.getRandomInt(10,15);
        this.weaponColdown = 450;
        this.isWeaponColdown = false;
        this.health = game.getRandomInt(1,5);
        this.activateDist = 450;
        this.minDist = 32;
        this.attackDist = 40;
        
        this.directionString = "up";

        this.renderable.addAnimation("up-run",      [0, 1]);
        this.renderable.addAnimation("right-run",   [3, 4]);
        this.renderable.addAnimation("down-run",    [6, 7]);
        this.renderable.addAnimation("left-run",    [9, 10]);
        
        this.renderable.addAnimation("up-idle",     [2]);
        this.renderable.addAnimation("right-idle",  [5]);
        this.renderable.addAnimation("down-idle",   [8]);
        this.renderable.addAnimation("left-idle",   [11]);
        
        this.renderable.setCurrentAnimation(this.directionString + "-idle");
        this.renderable.animationspeed = 8;
               
        this.name = "Crazy girl";
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
    
    doPunch: function() {
        var that = this;
        if (!this.isWeaponColdown) {
            this.isWeaponColdown = true;
            setTimeout(function(){
                that.isWeaponColdown = false;    
            },this.weaponColdown);
        }
    },
    
    isItTimeToDie: function() {
        if (this.health <= 0) {
            var blood = new game.Blood(this.pos.x, this.pos.y, new Object());
            me.game.add(blood, this.z - 1);

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
        dist = direction.length();
        if (dist < this.activateDist && dist > this.minDist) {
            this.renderable.setCurrentAnimation(this.directionString + '-run');
            direction.normalize();
            vel.x = direction.x * this.accel.x;
            vel.y = direction.y * this.accel.y;
        }
        return vel;
    },
    
    update: function () {
        var res = me.game.collideType(this, me.game.MAIN_HERO_OBJECT);
        if (res && (res.type == me.game.MAIN_HERO_OBJECT) && !this.isWeaponColdown) {
            this.doPunch();
            game.hitObject(this.GUID, res.obj.GUID);
        }
        
//        var solidtest = me.game.collideType(this, me.game.ENEMY_OBJECT);
//        if (solidtest) {
//            this.pos.x -= solidtest.x;
//            this.pos.y -= solidtest.y;
//        }
        
        this.updateDirectionString();
        if (!this.knocked) {
            var vel = this.calcVel();
            this.vel.x += vel.x;
            this.vel.y += vel.y;
        }
                
        if (this.vel.x != 0 || this.vel.y != 0) {
            this.updateMovement();
            this.parent(this);
            return true;
        } else {
            this.renderable.setCurrentAnimation(this.directionString + '-idle');
            return false;
        }        
    }
});