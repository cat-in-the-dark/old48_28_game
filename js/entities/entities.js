game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {        
        settings.image = "main_hero";
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        this.parent(x, y, settings);
        this.name = "Boy";
        this.weapon = game.panel.PISTOLETO;
        this.damage = 1;
        
        game.MAIN_HERO_ID = this.GUID;
        
        this.CAGE_SIZE = 12;
        this.health = 100;
        this.ammo = 48;
        this.cage = this.CAGE_SIZE; 
        this.isWeaponCooldown = false;
        this.weaponCooldownTime = 800;// ms
        this.weaponShutTime = 150;
        this.lastBoom = false; //  to update animation after shooting
        
        this.gravity = 0.0;
        this.origVelocity = new me.Vector2d(5.0, 5.0);
        this.setVelocity(this.origVelocity.x, this.origVelocity.y);
        this.direction = new me.Vector2d(0.0, -1.0);
        this.bulletDirection = {
            x: 0.0,
            y: -1.0
        }
        
        this.directionString = "up";
        var directions = [ "up", "right", "down", "left" ];

        this.renderable.addAnimation("up-run",      [0, 1]);
        this.renderable.addAnimation("right-run",   [5, 6]);
        this.renderable.addAnimation("down-run",    [10, 11]);
        this.renderable.addAnimation("left-run",    [15, 16]);
        
        this.renderable.addAnimation("up-idle",     [2]);
        this.renderable.addAnimation("right-idle",  [7]);
        this.renderable.addAnimation("down-idle",   [12]);
        this.renderable.addAnimation("left-idle",   [17]);
            
        this.renderable.addAnimation("up-punch",    [3, 4]);
        this.renderable.addAnimation("right-punch", [8, 9]);
        this.renderable.addAnimation("down-punch",  [13, 14]);
        this.renderable.addAnimation("left-punch",  [18, 19]);

        this.renderable.setCurrentAnimation(this.directionString + "-idle");
        this.renderable.animationspeed = 8;

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.type = me.game.MAIN_HERO_OBJECT;
        game.objectsPool[this.GUID] = this;
        game.player = this;
        this.updateColRect(8, 32, 8, 32);
        console.log(this);
    },
    
    checkMovement: function () {
        var tempDir = new me.Vector2d(0.0, 0.0);
        //Prepare movement
        if (me.input.isKeyPressed('left')) {
            this.directionString = "left";
            tempDir.x = -1.0;
            this.bulletDirection.x = -1.0;
            this.bulletDirection.y = 0.0;
        }
        if (me.input.isKeyPressed('right')) {
            this.directionString = "right";
            tempDir.x = 1.0;
            this.bulletDirection.x = 1.0;
            this.bulletDirection.y = 0.0;
        }
        if (me.input.isKeyPressed('down')) {
            this.directionString = "down";
            tempDir.y = 1.0;
            this.bulletDirection.x = 0.0;
            this.bulletDirection.y = 1.0;
        }
        if (me.input.isKeyPressed('up')) {
            this.directionString = "up";
            tempDir.y = -1.0;
            this.bulletDirection.x = 0.0;
            this.bulletDirection.y = -1.0;
        }

        //move
        if (tempDir.x != 0.0 || tempDir.y != 0.0) {
            this.vel.x += tempDir.x * this.accel.x * me.timer.tick;
            this.vel.y += tempDir.y * this.accel.y * me.timer.tick;
            this.direction = tempDir;
        }
    },
    
    checkPunch: function() {
        if (me.input.isKeyPressed('punch')){
            if (!this.isWeaponCooldown && this.checkAmmo() && me.input.isKeyPressed('punch')) { //check weapon cooldown 
                this.isWeaponCooldown = true;
                var that = this;
                setTimeout(function(){
                    that.isWeaponCooldown = false;
                }, this.weaponShutTime);
                this.lastBoom = true;
                if (this.cage % 2 == 0) {
                    game.doPunch(this.GUID, {x: this.pos.x, y: this.pos.y}, new me.Vector2d(this.bulletDirection.x, this.bulletDirection.y));
                } else {
                    game.doPunch(this.GUID, {x: this.pos.x + 20, y: this.pos.y + 20}, new me.Vector2d(this.bulletDirection.x, this.bulletDirection.y));
                }
                this.cage -= 1;
            }
        }
    },
    
    punched: function (damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
        }
    },
    
    isItTimeToDie: function () {
        if (this.health <= 0) {
            var blood = new game.Blood(this.pos.x, this.pos.y, new Object());
            me.game.add(blood, this.z);
            
            me.game.remove(this);
            delete game.objectsPool[this.GUID];
            return {name: this.name};
        }
        return;
    },
    
    checkAmmo: function() {
        if (this.cage == 0){
            if (this.ammo != 0) {
                this.isWeaponCooldown = true; 
                var that = this;
                
                me.audio.play('usp_clipin');
                setTimeout(function(){
                    that.isWeaponCooldown = false;
                    that.cage = (that.ammo >= that.CAGE_SIZE) ? that.CAGE_SIZE : that.ammo;
                    that.ammo -= that.cage;
                },this.weaponCooldownTime);
                return false;
            }
            me.audio.play('usp_clipout');
            return false;            
        }
        return true;
    },
    
    updateAnimation: function () {
        var to_update = false;
        if (this.vel.x != 0.0 || this.vel.y != 0.0) {
            to_update = true;
            this.renderable.setCurrentAnimation(this.directionString + "-run");
        } else {
            this.renderable.setCurrentAnimation(this.directionString + "-idle");
        }
        
        if (this.lastBoom) {
            to_update = true;
            this.renderable.setCurrentAnimation(this.directionString + "-punch");
            me.audio.play("usp");
        }
        
        return to_update;
    },
    
    updateBullets: function() {
        for (var i = 0, len = game.bullet_pull.length; i < len; i ++) {
//            console.log(game.bullet_pull[i].inViewport);
            console.log(game.bullet_pull[i]);
            if(!(game.bullet_pull[i].inViewport)) {
                console.log("here");
                me.game.remove(game.bullet_pull[i]);
                game.bullet_pull[i] = null;
                game.bullet_pull.splice(i, 1);
                len = game.bullet_pull.length;
                i--;
            }
        }
    },
    
    update: function() {
        this.vel.x = 0;
        this.vel.y = 0;
        this.lastBoom = false;
        
        this.updateBullets();
        this.checkMovement();
        this.checkPunch();

        if (this.updateAnimation()){
            this.updateMovement();
            this.parent(this);
            return true;
        }

		me.game.collide(this);
        
        return false;
    }
});