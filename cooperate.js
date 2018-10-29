//definimos una nueva escena de phaser, nos aseguramos de que se carga al cambiar a este modo con la impresion en consola, ponemos un texto para hacernos una idea, y definimos que si pulsamos la tecla ESC hacemos una transicion de vuelta al menu
    var esc;
    var cooperate = new Phaser.Scene('cooperate');

        cooperate.create=function () {
            console.log ("Modo cooperate");
            var test = this.add.text(500,150,'COOPERATE',{fontSize: '50px', fill:'#0f0'});
            esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            var test2 = this.add.text(400,250,'Pulsa ESC para volver',{fontSize: '30px', fill:'#0f0'});
        }
        
        cooperate.update=function () {
            if(esc.isDown){
                var t=cooperate.scene.transition({target:'menu',duration:'10'});
            }
        }
