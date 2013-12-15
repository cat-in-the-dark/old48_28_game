game.AssistantEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        settings.image = "nurse";
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        this.parent(x, y, settings);
        game.DOCTOR_GIRL_ID = this.GUID; // or SHUTER_GIRL_ID
        
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
        }
        if (this.vel.x < 0.0) {
            this.directionString = "left";
        }
        if (this.vel.y > 0.0) {
            this.directionString = "down";
        }
        if (this.vel.y < 0.0) {
            this.directionString = "up";
        }
//        this.directionString = game.player.directionString;
    },
    
    updateAnimation: function () {
        if (this.vel.x != 0.0 || this.vel.y != 0.0) {
            this.renderable.setCurrentAnimation(this.directionString + "-run");
        } else {
            this.renderable.setCurrentAnimation(this.directionString + "-idle");
        }
    },
    
    update: function () {
        this.checkMovement();
        this.updateAnimation();

        this.updateMovement();

        this.parent(this);
        return true;
    }
});