function PlayerStat(name) {
    this.name = name;
    this.alive = true;
}
function Stat(who, icon, whos){
    this.who = who;
    this.icon = icon;
    this.whos = whos;
}    
game.panel = {
    // Run on page load.

    "init": function () {
        this.onResize = (function (that) {
            return function (scale) {

                var baseWidth = 256;
                var baseHeight = 640;
                var baseFontSize = 16;
//                console.log('videHeight:' + me.video.getWidth());
//                console.log('videoWidth:' + me.video.getHeight());
//                console.log('window width:' + window.innerWidth);
//                console.log('window height:' + window.innerHeight);
                ;
                //console.log('scale:' + scale);

                that.titleSize = 32 * scale;
                that.context2d.canvas.width = baseWidth * scale;
                that.context2d.canvas.height = baseHeight * scale;
                that.fontSize = baseFontSize * scale;

                if (that.font) {
                    //alert('scale font');
                    that.font.resize(scale);
                }
                if (that.fontCrossed) {
                    //alert('scale font');
                    that.fontCrossed.resize(scale);
                }
//                 alert(this.titleSize);
                if (that.resourceLoaded != null && that.resourceLoaded) {
                    //alert('draw');
                    that.draw();
                }

            }
        })(this);

        this.titleSize = 32;
        this.fontSize = 16;
        this.font = null;
        this.context2d = me.video.getContext2d(me.video.createCanvas(256, 640));

        document.getElementById('deathList').appendChild(this.context2d.canvas);
    },
    "resourceLoad": function (deathList) {
        this.font = new me.BitmapFont('16x16_font', 16);
        this.font.set('left');
        this.font.resize(this.fontSize / 16);

        //this.fontCrossed = new me.BitmapFont('16x16_font_crossed', 16);
        //this.fontCrossed.set('left');
        //this.fontCrossed.resize(this.fontSize / 16);

        this.panelImage = (me.loader.getImage("panel-right"));
        this.pistoletoIcon = (me.loader.getImage("pistoleto_icon"));
        this.shotgunIcon = (me.loader.getImage("shotgun_icon"));
        this.spoonIcon = (me.loader.getImage("spoon_icon"));

        this.resourceLoaded = true;
    },
    "draw": function () {
        //alert('ts:' + this.titleSize);
        //нарисовали background
        this.context2d.drawImage(this.panelImage,
            0, 0,
            256, 640,
            0, 0,
            this.titleSize * 256 / 32, this.titleSize * 640 / 32);

        this.font.draw(this.context2d, 'KILL_LIST', this.titleSize / 32 * 30, this.titleSize / 32 * 8);
        

        var currentY = 45;
        var x = 10;
        var lineInterval = 40;

        if (!this.deathNote)
            return;

        for (var i = 0; i < this.deathNote.length; i++) {
            var stat = this.deathNote[i];
            //console.log(stat);
            
            var word1 =  stat.who.toUpperCase();
            var word1Leng = this.font.measureText(this.context2d, word1).width;
            //console.log(word1Leng);
            
            this.font.draw(this.context2d, word1, this.titleSize / 32 * x, this.titleSize / 32 * currentY);
            
            
            //draw icon
            var iconSize = 32;
            var border = 5;
            var cImage = null;
            
            switch(stat.icon){
                case 'pistoleto' :
                    cImage = this.pistoletoIcon;
                break;
                case 'shotgun' :
                    cImage = this.shotgunIcon;
                break;
                case 'spoon' :
                    cImage = this.spoonIcon;
                break;
            }    
            
            var nx = this.titleSize * (x + border) / 32 + word1Leng;
            var ny = this.titleSize * (currentY - 16) / 32;
            this.context2d.drawImage(cImage, 0, 0, 32, 32, nx, ny,
                        this.titleSize * 32 / 32, this.titleSize * 32 / 32);
            
            var word2 =  stat.whos.toUpperCase();
            this.font.draw(this.context2d, word2, this.titleSize / 32 * (x + iconSize + border*2) + word1Leng, this.titleSize / 32 * currentY);
                           
            currentY += lineInterval;
        }
    },
    "kill": function (who, icon, whos) {
        var stat = new Stat(who, icon, whos);
        this.deathNote.push(stat);
        
        var maxSize = 20;
        if(this.deathNote.length > maxSize)
            this.deathNote.splice(0,1);
        
        this.draw();
    },
    resetBackground : function(){
        me.video.clearSurface(this.context2d, "#000000");
    },
    clear: function(){
        this.deathNote = [];
        this.draw();
    }
};
