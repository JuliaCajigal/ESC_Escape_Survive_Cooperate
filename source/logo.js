        var logo=new Phaser.Scene('logo');
        logo.preload=function () {
            
            this.load.spritesheet('player2', 'assets/char/pc2s.png', { frameWidth: 10, frameHeight: 24 });
            this.load.spritesheet('player', 'assets/char/pcs.png', { frameWidth: 10, frameHeight: 24 });
            this.load.spritesheet('playerpower', 'assets/char/ens.png', { frameWidth: 10, frameHeight: 24 });
            this.load.spritesheet('powerup', 'assets/actors/ups.png', {frameWidth: 10, frameHeight: 10});
            this.load.spritesheet('escape','assets/menu/escs.png',{frameWidth:200,frameHeight:32});
            this.load.spritesheet('mirror','assets/menu/mirs.png',{frameWidth:200,frameHeight:32});
            this.load.spritesheet('survive','assets/menu/surs.png',{frameWidth:200,frameHeight:32});
            this.load.spritesheet('alone','assets/menu/alos.png',{frameWidth:200,frameHeight:32});
            this.load.spritesheet('cooperate','assets/menu/coos.png',{frameWidth:200,frameHeight:32});
            this.load.image('borde', 'assets/actors/borde.png');
            this.load.image('luz','assets/menu/luz.png');
            this.load.image('ESC','assets/menu/fondo.png');
            this.load.image('arr','assets/menu/flecha1.png');
            this.load.image('arr2','assets/menu/flecha2.png');
            this.load.image('arr3','assets/menu/flecha3.png');
            this.load.image('arr4','assets/menu/flecha4.png');
            this.load.image('arr5','assets/menu/flecha5.png');
            this.load.image('LOGO','assets/menu/LOGO.png');
            this.load.image('stairs', 'assets/actors/sta.png');
            this.load.image('goldenstairs', 'assets/actors/goldsta.png');
            this.load.image('ganahumano', 'assets/ghum.png');
            this.load.image('ganasombra', 'assets/gsom.png');
            this.load.audio('menumusic', ['assets/menu/menutheme.wav']);
            
            var randomtile = Math.random();
            if(randomtile < 0.25){
                this.load.image('tileo', 'assets/tilemap.png');
            } else if (randomtile < 0.5) {
                this.load.image('tileo', 'assets/tilemap2.png');
            } else if (randomtile < 0.75){
                this.load.image('tileo', 'assets/tilemap3.png');
            } else {
                this.load.image('tileo', 'assets/tilemap4.png');
            }
        };
        logo.create=function(){
            var l=logo.add.image(600,200,'LOGO');
            logo.add.tween({
                targets:l,
                alpha:0,
                duration:2500,
                ease:'Sine.easeInOut',
                onComplete:function(){
                   var t=logo.scene.transition({target:'menu',duration:'10'});
                }
            })
        };