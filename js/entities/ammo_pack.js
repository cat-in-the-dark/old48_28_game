game.AmmoPack = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.gravity = 0.0;
		this.collidable = true;
    },

    onCollision: function(res, obj) {
        if (obj.type == me.game.MAIN_HERO_OBJECT) {
			if (obj.ammo < 96) {
				obj.ammo += Math.min(96 - obj.ammo, 12);
				this.collidable = false;
				me.game.remove(this);
                me.audio.play('pickup');
			}
		}
    }
});
