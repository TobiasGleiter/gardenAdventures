import * as me from 'melonjs';
import {setLevel} from "./globals";

class TitleScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
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

        // create Endlessrun text
        const PlayText = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 1.5 - 30,
            {
                font: 'PressStart2P',
                text: 'PLAY',
                textAlign: 'center',
                size: 0.5,
            }
        );
        PlayText.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(PlayText);

        // create Levelselect text
        const LevelSelectText = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 1.5,
            {
                font: 'PressStart2P',
                text: 'LEVELSELECT',
                textAlign: 'center',
                size: 0.5,
            }
        );
        LevelSelectText.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(LevelSelectText);

        // create Highscore text
        const HighscoreText = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 1.5 + 30,
            {
                font: 'PressStart2P',
                text: 'HIGHSCORE',
                textAlign: 'center',
                size: 0.5,
            }
        );
        HighscoreText.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(HighscoreText);

        // register mouse click event on the canvas
        me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {
            const PlayBounds = PlayText.getBounds();
            const LevelSelect = LevelSelectText.getBounds();
            const highscoreBounds = HighscoreText.getBounds();

            // check if the click position is within the bounds of the respective texts
            if (
                event.gameWorldY >= PlayBounds.top &&
                event.gameWorldY <= PlayBounds.bottom
            ) {
                setLevel('Lvl1-1');
                me.state.change(me.state.PLAY);
            } else if (

                event.gameWorldY >= LevelSelect.top &&
                event.gameWorldY <= LevelSelect.bottom
            ) {
                me.state.change(me.state.SETTINGS);
            } else if (

                event.gameWorldY >= highscoreBounds.top &&
                event.gameWorldY <= highscoreBounds.bottom
            ) {
                me.state.change(me.state.SCORE);
            }
        });
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {

        me.input.releasePointerEvent('pointerdown', me.game.viewport);
    }

    /**
     *  action to perform to start the game
     */








}






export default TitleScreen;

