game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
    init: function () {
        this.parent(true);
        this.title = null;
		this.font = null;
		this.girl_button = me.GUI_Object.extend({
			init:function (x, y, image, name) {
				settings = {};
				settings.image = image;
				settings.spritewidth = 240;
				settings.spriteheight = 320;
				this.parent(x, y, settings);
				this.name = name;
			},

			onClick:function (event) {
				game.data.girl_choice = this.name;
				return false;
			}
		});
    },

	onResetEvent: function () {
        console.log("menu");
		if (this.title == null) {
            this.title = me.loader.getImage("menu_background");
        }
		if (this.font == null) {
			this.font = new me.BitmapFont("32x32_font", 32);
		}
	},

	update: function () {
		return false;
	},

    draw: function(context) {
		context.drawImage(this.title, 0, 0);
		me.game.add((new this.girl_button(30, 30, "sara", "sara")), 1000);
		me.game.add((new this.girl_button(300, 30, "crazy_lady_little", "crazy_lady_little")), 1000);
		me.game.add((new this.girl_button(570, 30, "annie", "annie")), 1000);
		this.font.draw(context, "CHOOSE YOUR ASSISTANT\n AND PRESS ENTER TO START", 30, 568);
		if (game.data.girl_choice != "") {
			if (game.data.girl_choice == "crazy_lady_little") {
				this.font.draw(context, "ALL OTHERS LADIES MAD\n AT YOU\nCOS YOU DIDNT CHOOSE THEM\n", 30, 380);
			} else if (game.data.girl_choice == "sara") {
				this.font.draw(context, "SARA CONNOR WILL SAVE YOU\n FROM ANY DANGER!\n PRESS O TO USE POWER", 30, 380);
			} else if (game.data.girl_choice == "annie") {
				this.font.draw(context, "ANNIE IS CUUUUUTE!!\n PRESS O TO USE POWER", 30, 380);
			}
		}
		if ((me.input.isKeyPressed('enter')) && (game.data.girl_choice != "")){
            if (game.data.girl_choice == "crazy_lady_little") {
                game.data.girl_choice = "";
                return;
            }
            me.state.change(me.state.PLAY);
		}
    },

	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		; // TODO
	}
});
