game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "test";
        settings.spriteheight = 32;
        settings.spritewidth = 32;
        this.parent(x, y, settings);
        
        this.CAGE_SIZE = 12;
        this.health = 100;
        this.ammo = 48;
        this.cage = this.CAGE_SIZE; 
        this.isWeaponCooldown = false;
        this.weaponCooldownTime = 800;// ms
        this.weaponShutTime = 150;
        
        this.gravity = 0.0;
        this.origVelocity = new me.Vector2d(5.0, 5.0);
        this.setVelocity(this.origVelocity.x, this.origVelocity.y);
        this.direction = new me.Vector2d(0.0, -1.0);
        
        this.directionString = "up";
        var directions = [ "up", "right", "down", "left" ];

        this.renderable.addAnimation("up-idle",     [0]);
        this.renderable.addAnimation("down-idle",   [6]);
        this.renderable.addAnimation("left-idle",   [9]);
        this.renderable.addAnimation("right-idle",  [3]);
        this.renderable.addAnimation("up-run",      [1, 0 , 2]);
        this.renderable.addAnimation("down-run",    [7, 6 , 8]);
        this.renderable.addAnimation("left-run",    [10, 9, 11]);
        this.renderable.addAnimation("right-run",   [4, 3, 5]);
        
        this.renderable.setCurrentAnimation(this.directionString + "-run");
        this.renderable.animationspeed = 8;
        
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        game.player = this;
        console.log(this);
    },
    
    checkMovement: function () {
        var tempDir = new me.Vector2d(0.0, 0.0);
        //Prepare movement
        if (me.input.isKeyPressed('left')) {
            this.directionString = "left";
            tempDir.x = -1.0;
        }
        if (me.input.isKeyPressed('right')) {
            this.directionString = "right";
            tempDir.x = 1.0;
        }
        if (me.input.isKeyPressed('down')) {
            this.directionString = "down";
            tempDir.y = 1.0;
        }
        if (me.input.isKeyPressed('up')) {
            this.directionString = "up";
            tempDir.y = -1.0;
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
                
                game.doPunch({x: this.pos.x, y: this.pos.y}, this.direction);
                this.cage -= 1;
            }
        }
    },
    
    checkAmmo: function() {
        if (this.cage == 0){
            if (this.ammo != 0) {
                this.isWeaponCooldown = true; 
                var that = this;
                setTimeout(function(){
                    that.isWeaponCooldown = false;
                    that.cage = (that.ammo >= that.CAGE_SIZE) ? that.CAGE_SIZE : that.ammo;
                    that.ammo -= that.cage;
                },this.weaponCooldownTime);
                return false;
            }
            return false;            
        }
        return true;
    },
    
    updateAnimation: function () {
        if (this.vel.x != 0.0 || this.vel.y != 0.0) {
            this.renderable.setCurrentAnimation(this.directionString + "-run");
        } else {
            this.renderable.setCurrentAnimation(this.directionString + "-idle");
        }
    },
    
    update: function() {
        this.vel.x = 0;
        this.vel.y = 0;
        
        this.checkPunch();
        this.checkMovement();
        
        this.updateAnimation();
        this.updateMovement();
        
        this.parent();
        return true;
    }
});