game.BulletEntity = me.ObjectEntity.extend({
    init: function(x, y, direction, settings) {   
        this.parent(x, y, settings);
        this.gravity = 0.0;
        this.direction = direction;
        this.collidable = true;
        
        this.renderable.angle = settings.angle;
       
        this.origVelocity = new me.Vector2d(25.0, 25.0);
        this.setVelocity(this.origVelocity.x, this.origVelocity.y);
        
        //check coordinates
        
        console.log(this);
    },
    
    update: function() {
        var bullet = this;
        this.vel.x += this.direction.x * this.accel.x * me.timer.tick;
        this.vel.y += this.direction.y * this.accel.y * me.timer.tick;
        
        this.computeVelocity(this.vel);
        this.updateMovement();
        
        if (this.vel.x == 0 && this.vel.y == 0) {
            me.game.remove(bullet);
        }
        
        return true;
    }
});