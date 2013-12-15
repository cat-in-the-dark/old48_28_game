game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
    {name: "maptile1", type: "image", src: "data/img/maptile1.png"},
    {name: "textures", type: "image", src: "data/img/textures.png"},
    {name: "panel-right", type: "image", src: "data/img/panel.png"},
    {name: "metatiles32x32", type: "image", src: "data/img/metatiles32x32.png"},
    
    //incons
    {name: "pistoleto_icon", type: "image", src: "data/img/pistoleto_icon.png"},
    {name: "shotgun_icon", type: "image", src: "data/img/shotgun_icon.png"},
    {name: "spoon_icon", type: "image", src: "data/img/spoon_icon.png"},
    
    {name: "test", type: "image", src: "data/img/test.png" },
    {name: "bullet", type: "image", src: "data/img/bullet.png" },
    {name: "main_hero", type: "image", src: "data/img/Main_Hero.png" },
    {name: "crazy_girl", type: "image", src: "data/img/Crazy_lady_all.png" },
	{name: "health_pack", type: "image", src: "data/img/health_pack.png"},
	{name: "ammo_pack", type: "image", src: "data/img/ammo.png"},

    {name: "intro_screen", type: "image", src: "data/img/intro_screen.png"},
    {name: "sara", type: "image", src: "data/img/sara_konnor.png"},
    {name: "maroussia", type: "image", src: "data/img/maroussia.png"},
    {name: "annie", type: "image", src: "data/img/annie.png"},
    {name: "menu_background", type: "image", src: "data/img/menu_bagkground.png"},
    {name: "nurse", type: "image", src: "data/img/nurse.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
     */

    {name: "area01", type: "tmx", src: "data/map/area02.tmx"},
    
    {name: "32x32_font",          type:"image", src: "data/img/32x32_font.png"},
    {name: "16x16_font",          type:"image", src: "data/img/16x16_font.png"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */

    /* 
     * Sound effects. 
     */
    //hero
    {name: "hard", type: "audio", src: "data/sfx/hero/", channel : 1},
    {name: "usp", type: "audio", src: "data/sfx/hero/", channel : 1},
    {name: "usp_clipin", type: "audio", src: "data/sfx/hero/", channel : 1},
    {name: "usp_clipout", type: "audio", src: "data/sfx/hero/", channel : 1},
    {name: "beer", type: "audio", src: "data/sfx/hero/", channel : 1},
    {name: "pickup", type: "audio", src: "data/sfx/hero/", channel : 1},
//    {name: "usp_slideback", type: "audio", src: "data/sfx/hero/", channel : 1},
//    {name: "usp_sliderelease", type: "audio", src: "data/sfx/hero/", channel : 1},
    //assistance
    {name: "shotgun",  type: "audio", src: "data/sfx/assistant/", channel : 2},
    //mobs
    {name: "mob_die1",  type: "audio", src: "data/sfx/mob/", channel : 3},
    {name: "mob_die2",  type: "audio", src: "data/sfx/mob/", channel : 4},
    {name: "mob_die3",  type: "audio", src: "data/sfx/mob/", channel : 5},
    {name: "mob_die4",  type: "audio", src: "data/sfx/mob/", channel : 6},
    {name: "mob_die5",  type: "audio", src: "data/sfx/mob/", channel : 7}
];
