game.HealthPack = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.gravity = 0.0;
		this.collidable = true;
    },

    onCollision: function() {
		console.log("collision");
        this.collidable = false;
        me.game.remove(this);
    }
});