game.BulletEntity = me.ObjectEntity.extend({
    init: function(x, y, direction, settings) {  
        this.parent(x, y, settings);
        this.gravity = 0.0;
        this.direction = direction;
        this.collidable = true;
        this.id = settings.id;
        
        this.renderable.angle = settings.angle;
       
        this.origVelocity = new me.Vector2d(25.0, 25.0);
        this.setVelocity(this.origVelocity.x, this.origVelocity.y);
        this.inViewport = true; //a little splint
        game.bullet_pull.push(this);
    },
    
    update: function() {
        var bullet = this;
        this.vel.x += this.direction.x * this.accel.x * me.timer.tick;
        this.vel.y += this.direction.y * this.accel.y * me.timer.tick;
        
        this.computeVelocity(this.vel);
        this.updateMovement();
        
        if ((this.vel.x == 0 && this.vel.y == 0)) {
            me.game.remove(bullet);
        }
        
        var res = me.game.collide(this);
        if (res && res.obj.GUID != this.id && (res.type == me.game.ENEMY_OBJECT)) {
            me.game.remove(bullet);
            game.hitObject(this.id, res.obj.GUID);
        }
        
        return true;
    }
});