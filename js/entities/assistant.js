game.AssistantEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        if (game.data.girl_choice == "annie") {
            settings.image = "nurse";
            game.DOCTOR_GIRL_ID = this.GUID;
            this.collectedHealthPacks = 5;
        } else if (game.data.girl_choice == "sara") {
            settings.image = "shooter";
            this.isWeaponCooldown = false;
            this.weaponShutTime = 2000;
            game.SHOOTER_GIRL_ID = this.GUID;
            this.damage = 1;
            this.weapon = game.panel.SHOTGUN;
            this.name = "Sara";
        }
        
        this.bulletDirection = {
            x: 0.0,
            y: -1.0
        }
        
        this.parent(x, y, settings);
        this.gravity = 0.0;
        
        this.origVelocity = new me.Vector2d(4.5, 4.5);
        this.setVelocity(this.origVelocity.x, this.origVelocity.y);
        this.setFriction(0.55, 0.55);
        
        this.directionString = "up";
        var directions = [ "up", "right", "down", "left" ];
        
        this.renderable.addAnimation("up-run",      [0, 1]);
        this.renderable.addAnimation("right-run",   [4, 5]);
        this.renderable.addAnimation("down-run",    [8, 9]);
        this.renderable.addAnimation("left-run",    [12, 13]);
        
        this.renderable.addAnimation("up-idle",     [2]);
        this.renderable.addAnimation("right-idle",  [6]);
        this.renderable.addAnimation("down-idle",   [10]);
        this.renderable.addAnimation("left-idle",   [14]);
            
        this.renderable.addAnimation("up-action",    [3, 2]);
        this.renderable.addAnimation("right-action", [7, 6]);
        this.renderable.addAnimation("down-action",  [11, 10]);
        this.renderable.addAnimation("left-action",  [15, 14]);
        
        this.renderable.setCurrentAnimation(this.directionString + "-idle");
        this.renderable.animationspeed = 8;

        this.type = me.game.ASSISTANT_OBJECT;
        game.assistant = this;
        //for debug
        this.posX = 1.0 * 48;
        this.posY = 1.0 * 48;
        game.objectsPool[this.GUID] = this;
        
        this.updateColRect(8, 32, 8, 32);
    },
    
    checkMovement: function () {
        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        
        var dist = this.distanceTo(game.player);
        var distX = Math.cos(this.angleTo(game.player)) * dist;
        var distY = Math.sin(this.angleTo(game.player)) * dist;
        if (Math.abs(distX) > this.posX) {
            this.vel.x += (distX > 0.0) ? this.accel.x * me.timer.tick : -this.accel.x * me.timer.tick;
        }
        if (Math.abs(distY) > this.posY) {
            this.vel.y += (distY > 0.0) ? this.accel.y * me.timer.tick : -this.accel.y * me.timer.tick;
        }
        
        if (this.vel.x > 0.0) {
            this.directionString = "right";
            this.bulletDirection.x = 1.0;
            this.bulletDirection.y = 0.0;
        }
        if (this.vel.x < 0.0) {
            this.directionString = "left";
            this.bulletDirection.x = -1.0;
            this.bulletDirection.y = 0.0;
        }
        if (this.vel.y > 0.0) {
            this.directionString = "down";
            this.bulletDirection.x = 0.0;
            this.bulletDirection.y = 1.0;
        }
        if (this.vel.y < 0.0) {
            this.directionString = "up";
            this.bulletDirection.x = 0.0;
            this.bulletDirection.y = -1.0;
        }
    },

    checkAction: function() {
        if (me.input.isKeyPressed('action')){
            if (game.data.girl_choice == "annie") {
                this.actionNurse();
            } else if (game.data.girl_choice == "sara") {
                this.actionShooter();
            }
        }
    },
    
    actionNurse: function() {
        if ((this.collectedHealthPacks > 0) && (game.player.health < 100)) {
            game.player.heal(10);
            this.collectedHealthPacks --;
            this.lastAction = true;
        }
    },
    
    actionShooter: function() {
        if (!this.isWeaponCooldown) {
            this.isWeaponCooldown = true;
            var that = this;
            setTimeout(function(){
                that.isWeaponCooldown = false;
            }, this.weaponShutTime);
            this.lastAction = true;
            game.doPunch(this.GUID, {x: this.pos.x + 4, y: this.pos.y + 4 }, new me.Vector2d(this.bulletDirection.x, this.bulletDirection.y));
            game.doPunch(this.GUID, {x: this.pos.x + 14, y: this.pos.y + 14}, new me.Vector2d(this.bulletDirection.x, this.bulletDirection.y));
            game.doPunch(this.GUID, {x: this.pos.x + 24, y: this.pos.y + 24}, new me.Vector2d(this.bulletDirection.x, this.bulletDirection.y));
            me.audio.play("shotgun");
        }
    },

    updateAnimation: function () {
        if (this.vel.x != 0.0 || this.vel.y != 0.0) {
            this.renderable.setCurrentAnimation(this.directionString + "-run");
        } else {
            this.renderable.setCurrentAnimation(this.directionString + "-idle");
        }
        if (this.lastAction) {
            this.renderable.setCurrentAnimation(this.directionString + "-action");
        }
    },
    
    updateNurse: function() {
    },
    
    updateShooter: function() {
    },
    
    update: function () {
        if (game.data.girl_choice == "annie") {
            this.updateNurse();
        } else if (game.data.girl_choice == "sara") {
            this.updateShooter();
        }
        this.lastAction = false;
        this.checkMovement();
        this.checkAction();
        this.updateAnimation();

        this.updateMovement();

        this.parent(this);
        return true;
    }
});