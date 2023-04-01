// @ts-nocheck
// because of import('@melonjs/debug-plugin')
import * as me from 'melonjs';
import resources from './resources';

import PlayerEntity from './renderables/player';
import PlayScreen from './stage/play';
import TitleScreen from './stage/title';

/* Game namespace */
var game = {
  // Run on page load.
  onload: function () {
    // Initialize the video.
    if (
      !me.video.init(800, 600, {
        parent: 'screen',
        scale: 'auto',
        scaleMethod: 'flex-width',
        renderer: me.video.AUTO,
      })
    ) {
      alert('Your browser does not support HTML5 canvas.');
      return;
    }

    // initialize the debug plugin in development mode.
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV === 'development') {
      import('@melonjs/debug-plugin').then((debugPlugin) => {
        // automatically register the debug panel
        me.utils.function.defer(
          me.plugin.register,
          this as any, // will ein object aber kann this nicht einfach festelegen...
          debugPlugin.DebugPanelPlugin,
          'debugPanel'
        );
      });
    }

    // Initialize the audio.
    me.audio.init('mp3,ogg');

    // allow cross-origin for image/texture loading
    me.loader.crossOrigin = 'anonymous';

    // set and load all resources.
    me.loader.preload(resources, () => {
      // set the user defined game stages
      me.state.set(me.state.MENU, new TitleScreen());
      me.state.set(me.state.PLAY, new PlayScreen());

      // add our player entity in the entity pool
      me.pool.register('mainPlayer', PlayerEntity);

      // Start the game.
      me.state.change(me.state.PLAY, true);
    });
  },
};

export default game;
