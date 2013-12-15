game.FinishEntity = me.CollectableEntity.extend({
    init: function(x, y, settings) {
        this.parent(x, y, settings);
		this.gravity = 0.0;
		this.collidable = true;
    },

    onCollision: function(res, obj) {
        console.log("bum");
        if (obj.type == me.game.MAIN_HERO_OBJECT || obj.type == me.game.ASSISTANT_OBJECT) {
			me.state.change(me.state.GAME_END);
		}
    }
});