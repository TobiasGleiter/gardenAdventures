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
    // add description
    const text = new me.BitmapText(
      me.game.viewport.width / 2,
      me.game.viewport.height / 2,
      {
        font: 'PressStart2P',
        text: 'PRESS ENTER TO PLAY!',
        textAlign: 'center',
      }
    );
    me.game.world.addChild(text);

    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, 'enter', true);

    this.handler = me.event.on(me.event.KEYDOWN, function (action: any): any {
      if (action === 'enter') {
        // play something on tap / enter
        // this will unlock audio on mobile devices
        me.state.change(me.state.PLAY, true);
      }
    });
  }

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent() {
    // TODO
    me.input.unbindKey(me.input.KEY.ENTER);
    me.event.off(me.event.KEYDOWN, this.handler);
  }
}

export default TitleScreen;
