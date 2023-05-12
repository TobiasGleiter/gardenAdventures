import * as me from 'melonjs';
import {  setLevel } from 'js/stage/globals.ts';
class levelSelect extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // TODO
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

        // create Level 1 text
        const Level1Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 1.5 - 50,
            {
                font: 'PressStart2P',
                text: 'Level 1',
                textAlign: 'center',
                size: 0.5,
            }
        );
        Level1Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(Level1Text);

        // create Level 2 text
        const Level2Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 1.5-25,
            {
                font: 'PressStart2P',
                text: 'Level 2',
                textAlign: 'center',
                size: 0.5,
            }
        );
        Level2Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(Level2Text);

        // create Level 3 text
        const Level3Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 1.5 ,
            {
                font: 'PressStart2P',
                text: 'Level 3',
                textAlign: 'center',
                size: 0.5,
            }
        );
        Level3Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(Level3Text);

        // create Level 3 text
        const Level4Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 1.5 + 25,
            {
                font: 'PressStart2P',
                text: 'Level 4',
                textAlign: 'center',
                size: 0.5,
            }
        );
        Level3Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(Level4Text);

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

        // register mouse click event on the canvas
        me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {
            const Level1Bounds = Level1Text.getBounds();
            const Level2Bounds = Level2Text.getBounds();
            const Level3Bounds = Level3Text.getBounds();
            const Level4Bounds = Level4Text.getBounds();
            const backBounds =backButton.getBounds();
            // check if the click position is within the bounds of the respective texts
            if (
                event.gameWorldY >= Level1Bounds.top &&
                event.gameWorldY <= Level1Bounds.bottom
            ) {
                setLevel('Lvl1-1');
                me.state.change(me.state.PLAY,);
            } else if (
                event.gameWorldY >= Level2Bounds.top &&
                event.gameWorldY <= Level2Bounds.bottom
            ) {
                setLevel('Lvl1-2');
                me.state.change(me.state.PLAY);
            } else if (
                event.gameWorldY >= Level3Bounds.top &&
                event.gameWorldY <= Level3Bounds.bottom
            ) {
                setLevel('Lvl1-3');
                me.state.change(me.state.PLAY);
            } else if (
                event.gameWorldY >= Level4Bounds.top &&
                event.gameWorldY <= Level4Bounds.bottom
            ) {
                setLevel('Lvl1-4');
                me.state.change(me.state.PLAY);
            }
            else if (
                event.gameWorldY >= backBounds.top &&
                event.gameWorldY <= backBounds.bottom
            ) {
                me.state.change(me.state.MENU);
            }
        });
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        // TODO
        me.input.releasePointerEvent('pointerdown', me.game.viewport);
    }

    /**
     *  action to perform to start the game
     */








}






export default levelSelect;

