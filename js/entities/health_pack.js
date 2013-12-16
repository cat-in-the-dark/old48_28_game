game.HealthPack = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.gravity = 0.0;
		this.collidable = true;
    },

    onCollision: function(res, obj) {
        if (obj.type == me.game.MAIN_HERO_OBJECT || (obj.type == me.game.ASSISTANT_OBJECT)) {
			if (game.player.health < 100) {
				game.player.heal(10);
                this.collidable = false;
                me.game.remove(this);
			} else if (game.data.girl_choice == "annie") {
                game.assistant.collectedHealthPacks ++;
                this.collidable = false;
                me.game.remove(this);
            }
		}
    }
});
