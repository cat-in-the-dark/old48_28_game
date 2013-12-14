game.PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.image = "test";
        settings.spriteheight = 32;
        settings.spritewidth = 32;
        this.parent(x, y, settings);
        
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
            if (true) { //check weapon cooldown 
                game.doPunch({x: this.pos.x, y: this.pos.y}, this.direction);
            }
        }
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