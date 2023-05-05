import * as me from 'melonjs';

class TitleScreen extends me.Stage {
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

    // create singleplayer text
    const singleplayerText = new me.BitmapText(
        me.game.viewport.width / 2,
        me.game.viewport.height / 2 - 30,
        {
          font: 'PressStart2P',
          text: 'Singleplayer',
          textAlign: 'center',
          size: 0.5,
        }
    );
    singleplayerText.anchorPoint.set(0.5, 0.5);
    me.game.world.addChild(singleplayerText);

    // create highscore text
    const highscoreText = new me.BitmapText(
        me.game.viewport.width / 2,
        me.game.viewport.height / 2,
        {
          font: 'PressStart2P',
          text: 'Highscore',
          textAlign: 'center',
          size: 0.5,
        }
    );
    highscoreText.anchorPoint.set(0.5, 0.5);
    me.game.world.addChild(highscoreText);

    // create options text
    const optionsText = new me.BitmapText(
        me.game.viewport.width / 2,
        me.game.viewport.height / 2 + 30,
        {
          font: 'PressStart2P',
          text: 'Options',
          textAlign: 'center',
          size: 0.5,
        }
    );
    optionsText.anchorPoint.set(0.5, 0.5);
    me.game.world.addChild(optionsText);

    // register mouse click event on the canvas
    me.input.registerPointerEvent('pointerdown', me.game.viewport, (event) => {
      const singleplayerBounds = singleplayerText.getBounds();
      const highscoreBounds = highscoreText.getBounds();
      const optionsBounds = optionsText.getBounds();

      // check if the click position is within the bounds of the respective texts
      if (
          event.gameWorldX >= singleplayerBounds.left &&
          event.gameWorldX <= singleplayerBounds.right &&
          event.gameWorldY >= singleplayerBounds.top &&
          event.gameWorldY <= singleplayerBounds.bottom
      ) {
        me.state.change(me.state.SETTINGS);
      } else if (
          event.gameWorldX >= highscoreBounds.left &&
          event.gameWorldX <= highscoreBounds.right &&
          event.gameWorldY >= highscoreBounds.top &&
          event.gameWorldY <= highscoreBounds.bottom
      ) {
        me.state.change(me.state.SCORE);
      } else if (
          event.gameWorldX >= optionsBounds.left &&
          event.gameWorldX <= optionsBounds.right &&
          event.gameWorldY >= optionsBounds.top &&
          event.gameWorldY <= optionsBounds.bottom
      ) {
        me.state.change(me.state.GAMEOVER);
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


  startGame() {
    me.state.change(me.state.PLAY, true);
  }







}






export default TitleScreen;

