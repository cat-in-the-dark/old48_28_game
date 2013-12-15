game.WinScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.to_state = me.state.INTRO;
    },

    onResetEvent: function() {
        if (this.title == null) {
            this.title = me.loader.getImage("win_screen");
        }
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    },

    draw: function(context) {
        context.drawImage(this.title, 0, 0);
    },

    update: function() {
        if (me.input.isKeyPressed('enter')){
            me.state.change(this.to_state);
        }
    },

    onDestryEvent: function() {
        this.title = null;
        me.input.unbindKey(me.input.KEY.ENTER);
    }
});
