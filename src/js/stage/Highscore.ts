import * as me from 'melonjs';


class Highscore extends me.Stage {
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



        // Highscore-Liste erstellen
        const highscores = ['1. Highscore ', '2. Highscore ', '3. Highscore ', '4. Highscore ', '5. Highscore ', 'Your Highscore'];
        const x = me.game.viewport.width / 2;
        const startY = 80;
        const spacing = 20;

        for (let i = 0; i < highscores.length; i++) {
            const highscoreText = new me.BitmapText(x, startY + i * spacing, {
                font: 'PressStart2P',
                text: highscores[i],
                textAlign: 'center',
                size: 0.5,
            });
            highscoreText.anchorPoint.set(0.5, 0);
            me.game.world.addChild(highscoreText);
        }

        // Zurück-Button erstellen
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

        // Klick-Ereignis für den Zurück-Button registrieren
        me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {
            const backButtonBounds = backButton.getBounds();

            if (
                event.gameWorldX >= backButtonBounds.left &&
                event.gameWorldX <= backButtonBounds.right &&
                event.gameWorldY >= backButtonBounds.top &&
                event.gameWorldY <= backButtonBounds.bottom
            ) {
                this.goBackToTitle();
            }
        });
    }

    onDestroyEvent() {
        // Klick-Ereignis für den Zurück-Button freigeben
        me.input.releasePointerEvent('pointerdown', me.game.viewport);
    }

    goBackToTitle() {
        me.state.change(me.state.MENU);
    }
}


export default Highscore;