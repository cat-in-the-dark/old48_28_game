game.Blood = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        settings.spriteheight = 48;
        settings.spritewidth = 48;
        settings.image = "blood";
        
        this.parent(x, y, settings);
        this.type = me.game.NO_OBJECT;
    }
});