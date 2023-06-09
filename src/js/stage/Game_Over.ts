import * as me from 'melonjs';

class Game_Over extends me.Stage {
    private GameOverText: me.BitmapText;

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

        // Text "Game Over" erstellen
        this.GameOverText = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            {
                font: 'PressStart2P',
                text: 'GAME OVER',
                textAlign: 'center',
                size: 1,
                color: '#FFFFFF', // Weiß
            }
        );
        this.GameOverText.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.GameOverText);
        const backButton = new me.BitmapText(
            me.game.viewport.width - 50,
            me.game.viewport.height - 20,
            {
                font: 'PressStart2P',
                text: 'Back',
                textAlign: 'right',
                size: 0.5,
            }
        );

        backButton.anchorPoint.set(1, 1);
        me.game.world.addChild(backButton);



        me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {
            const backBounds =backButton.getBounds();
            if (
                event.gameWorldY >= backBounds.top &&
                event.gameWorldY <= backBounds.bottom
            ) {
                me.state.change(me.state.MENU);
            }
        });
    }



    onDestroyEvent() {



        me.game.world.removeChild(this.GameOverText);
    }


}

export default Game_Over;
