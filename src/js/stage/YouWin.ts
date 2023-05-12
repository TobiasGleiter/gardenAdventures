import * as me from 'melonjs';


class YouWIN extends me.Stage {
    private YouWinText: me.BitmapText;

    onResetEvent() {
        const backgroundImage = new me.Sprite(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            {
                image: me.loader.getImage('title_screen'),
            }
        );

        // scale to fit with the viewport size
        backgroundImage.scale(
            me.game.viewport.width / backgroundImage.width,
            me.game.viewport.height / backgroundImage.height
        );

        // add to the world container
        me.game.world.addChild(backgroundImage, 1);
        // Text "YOU WIN!!!" erstellen
        this.YouWinText = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            {
                font: 'PressStart2P',
                text: 'YOU WIN!!!',
                textAlign: 'center',
                size: 1,
                color: '#FFFFFF', // Weiß
            }
        );
        this.YouWinText.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.YouWinText);





        me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {

            const youWinTextBounds = this.YouWinText.getBounds();


            if (
                event.gameWorldY >= youWinTextBounds.top &&
                event.gameWorldY <= youWinTextBounds.bottom
            ) {
                me.state.change(me.state.MENU, true);
            }
        });
    }



    onDestroyEvent() {
        me.game.world.removeChild(this.YouWinText);
    }
}

export default YouWIN;
