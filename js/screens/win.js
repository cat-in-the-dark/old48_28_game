game.WinScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.to_state = me.state.INTRO;
    },

    onResetEvent: function() {
        if (this.title == null) {
            if (game.data.girl_choice == "annie") {
                this.title = me.loader.getImage("win_screen_annie");
            } else {
                this.title = me.loader.getImage("win_screen_sara");
            }
        }
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
