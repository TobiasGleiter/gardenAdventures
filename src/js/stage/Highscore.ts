import * as me from 'melonjs';
import network from "../../multiplayer/network";
import {BitmapText} from "melonjs";


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


        async function doSomething() {
            try {
                return await network.getScoreboard();
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        doSomething().then(highscores => {
            // Highscore-Liste erstellen
                        const x = me.game.viewport.width / 2;
                        const startY = 120;
                        const spacing = 20;

                        for (let i = 0; i < highscores.length; i++) {
                            const highscoreText = new me.BitmapText(x, startY + i * spacing, {
                                font: 'PressStart2P',
                                text: i+1 + '. ' + highscores[i],
                                textAlign: 'center',
                                size: 0.5,
                            });
                            highscoreText.anchorPoint.set(0.5, 0);
                            me.game.world.addChild(highscoreText);
                        }
        }).catch(error => console.error(error));

        async function doSomething2() {
            try {
                return await network.getMyScore();
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        doSomething2().then(yourScore => {
            const Score = new BitmapText(me.game.viewport.width/2, 190, {
                font: "PressStart2P",
                text: "Your Highscore: " + yourScore[0].Score,
                textAlign: "center",
                size: 0.7
            });
            Score.tint.setColor(43, 77, 189);
            me.game.world.addChild(Score);
        })


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