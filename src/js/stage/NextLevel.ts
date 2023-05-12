import * as me from 'melonjs';
import {getLevel, setLevel} from "./globals";

class NextLevel extends me.Stage {
    private nextLevelText: me.BitmapText;

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
        this.nextLevelText = new me.BitmapText(
            me.game.viewport.width / 2,
            me.game.viewport.height / 2,
            {
                font: 'PressStart2P',
                text: 'Next Level!!!',
                textAlign: 'center',
                size: 1,
                color: '#FFFFFF', // Weiß
            }
        );
        this.nextLevelText.anchorPoint.set(0.5, 0.5);
        me.game.world.addChild(this.nextLevelText);


        const backButton = new me.BitmapText(
            me.game.viewport.width - 50,
            me.game.viewport.height - 20,
            {
                font: 'PressStart2P',
                text: 'MENU',
                textAlign: 'right',
                size: 0.5,
            }
        );

        backButton.anchorPoint.set(1, 1);
        me.game.world.addChild(backButton);



        me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {

            const youWinTextBounds = this.nextLevelText.getBounds();
            const backbuttonBounds = backButton.getBounds();

            if (
                event.gameWorldY >= youWinTextBounds.top &&
                event.gameWorldY <= youWinTextBounds.bottom
            ) {
                var winLevel=getLevel();
                var levelParts = winLevel.split('-'); // Den Wert der Variable in Teile aufteilen
                var levelNumber = parseInt(levelParts[1]); // Die Levelnummer extrahieren und in eine Zahl umwandeln
                var newLevelNumber = levelNumber + 1;
                var newLewel = `${levelParts[0]}-${newLevelNumber}`;
                setLevel(newLewel)
                me.state.change(me.state.PLAY, true);
            }else if
            (
                event.gameWorldY >= backbuttonBounds.top &&
                event.gameWorldY <= backbuttonBounds.bottom
            )
                {
                    me.state.change(me.state.MENU,true);
            }
        });
    }



    onDestroyEvent() {
        me.game.world.removeChild(this.nextLevelText);
    }
}

export default NextLevel;
