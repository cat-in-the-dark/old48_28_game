game.HealthPack = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.gravity = 0.0;
		this.collidable = true;
    },

    onCollision: function(res, obj) {
        if (obj.type == me.game.MAIN_HERO_OBJECT) {
			if (obj.health < 100) {
				obj.health += Math.min(100 - obj.health, 10);
				this.collidable = false;
				me.game.remove(this);
                
                me.audio.play('beer');
			}
		}
    }
});
