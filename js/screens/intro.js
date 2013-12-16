game.IntroScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
        this.title = null;
        this.counter = 0;
        this.to_state = me.state.MENU;
        console.log(this);
    },

    onResetEvent: function() {
        console.log("intro");
        if (this.title == null) {
            this.title = me.loader.getImage("intro_screen");
        }
    },

    draw: function(context) {
        context.drawImage(this.title, 0, 0);
    },

    update: function() {
        if (me.input.isKeyPressed('enter')){
            me.state.change(this.to_state);
        }else if (this.counter < 120){
            this.counter++;
        } else {
            me.state.change(this.to_state);
        }
    },

    onDestryEvent: function() {
        //TODO
    }
});
