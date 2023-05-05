import * as me from 'melonjs';

class Game_Over extends me.Stage {
    public gameOverText: me.BitmapText;

    onResetEvent() {
        // Text "Game Over" erstellen
        this.gameOverText = new me.BitmapText(
            me.game.viewport.width / 2,
            -100, // Startposition außerhalb des Bildschirms
            {
                font: 'PressStart2P',
                text: 'Game Over',
                textAlign: 'center',
                size: 1,
            }
        );
        this.gameOverText.anchorPoint.set(0.5, 0);
        me.game.world.addChild(this.gameOverText);

        // Animation, um den Text von oben nach unten einfliegen zu lassen
        this.gameOverText.tween = new me.Tween(this.gameOverText.pos)
            .to({ y: me.game.viewport.height / 2 }, 1000)
            .easing(me.Tween.Easing.Bounce.Out)
            .start();
    }

    onDestroyEvent() {
        // Tween beenden und Text entfernen
        if (this.gameOverText.tween) {
            this.gameOverText.tween.stop();
            this.gameOverText.tween = null;
        }
        me.game.world.removeChild(this.gameOverText);
    }
}

export default Game_Over;
