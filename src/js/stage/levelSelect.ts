import * as me from 'melonjs';




export class LevelSelect extends me.Stage {

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

        // Registriere Klick-Ereignis für den Zurück-Button
        me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {
            const backButtonBounds = backButton.getBounds();

            if (
                event.gameWorldX >= backButtonBounds.left &&
                event.gameWorldX <= backButtonBounds.right &&
                event.gameWorldY >= backButtonBounds.top &&
                event.gameWorldY <= backButtonBounds.bottom
            ) {
                me.state.change(me.state.MENU);
            }
        });
        // Erstelle neue Texte für die Level
        // Level 1 Text
        const level1Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2 - 40,
            {
                font: 'PressStart2P',
                text: 'Level 1',
                textAlign: 'center',
                size: 0.5,
            }
        );
        level1Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(level1Text);

// Level 2 Text
        const level2Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2 - 20,
            {
                font: 'PressStart2P',
                text: 'Level 2',
                textAlign: 'center',
                size: 0.5,
            }
        );
        level2Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(level2Text);

// Level 3 Text
        const level3Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            {
                font: 'PressStart2P',
                text: 'Level 3',
                textAlign: 'center',
                size: 0.5,
            }
        );
        level3Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(level3Text);

// Level 4 Text
        const level4Text = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2 + 20,
            {
                font: 'PressStart2P',
                text: 'Level 4',
                textAlign: 'center',
                size: 0.5,
            }
        );
        level4Text.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(level4Text);

        // register mouse click event on the canvas
            me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {
                const level1Bounds = level1Text.getBounds();
                const level2Bounds = level2Text.getBounds();
                const level3Bounds = level3Text.getBounds();
                const level4Bounds = level4Text.getBounds();

                // check if the click position is within the bounds of the respective texts
                if (
                    event.gameWorldX >= level1Bounds.left &&
                    event.gameWorldX <= level1Bounds.right &&
                    event.gameWorldY >= level1Bounds.top &&
                    event.gameWorldY <= level1Bounds.bottom
                ) {
                    // Starte Level 1
                    me.level.load('Lvl1-1');
                } else if (
                    event.gameWorldX >= level2Bounds.left &&
                    event.gameWorldX <= level2Bounds.right &&
                    event.gameWorldY >= level2Bounds.top &&
                    event.gameWorldY <= level2Bounds.bottom
                ) {
                    // Starte Level 2
                    me.level.load('Lvl1-2');
                } else if (
                    event.gameWorldX >= level3Bounds.left &&
                    event.gameWorldX <= level3Bounds.right &&
                    event.gameWorldY >= level3Bounds.top &&
                    event.gameWorldY <= level3Bounds.bottom
                ) {
                    // Starte Level 3
                    me.level.load('Lvl1-3');
                } else if (
                    event.gameWorldX >= level4Bounds.left &&
                    event.gameWorldX <= level4Bounds.right &&
                    event.gameWorldY >= level4Bounds.top &&
                    event.gameWorldY <= level4Bounds.bottom
                ) {
                    // Starte Level 4
                    me.level.load('Lvl1-4');
                }
            });





        }
    }

export default LevelSelect;