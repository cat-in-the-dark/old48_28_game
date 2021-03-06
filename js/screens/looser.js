game.LooserScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.to_state = me.state.CREDITS;
    },

    onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("loose_screen");
        }
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    },

    draw: function(context) {
        context.drawImage(this.title, 0, 0);
    },

    update: function() {
    },

    onDestryEvent: function() {
        this.title = null;
        me.input.unbindKey(me.input.KEY.ENTER);
    }
});
