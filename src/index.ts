//@ts-nocheck
import * as me from 'melonjs';
import { audio, device, loader, plugin, utils } from 'melonjs';

import 'index.css';

import PlayerEntity from 'js/renderables/player';
import PlayScreen from 'js/stage/play.ts';
import TitleScreen from 'js/stage/title.ts';

import DataManifest from 'manifest.ts';
import BulletEntity from './js/renderables/bullet';
import EnemyEntity from './js/renderables/enemies';
import CollectableEntity from "./js/renderables/collectables";

import BeeEnemyEntity from './js/renderables/beeEnemy';
import BirdEnemyEntity from './js/renderables/birdEnemy';
import BugEnemyEntity from './js/renderables/bugEnemy';
import CaterpillarEnemyEntity from './js/renderables/caterpillarEnemy';
import MoleEnemyEntity from './js/renderables/moleEnemy';
import MothEnemyEntity from './js/renderables/mothEnemy';
import SnailEnemyEntity from './js/renderables/snailEnemy';
import WaspEnemyEntity from './js/renderables/waspEnemy';
import WormEnemyEntity from './js/renderables/wormEnemy';

device.onReady(() => {
  // initialize the display canvas once the device/browser is ready
  if (
    !me.video.init(500, 240, {
      parent: 'screen',
      scale: 'auto',
      scaleMethod: 'fit',
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
      utils.function.defer(
        plugin.register,
        this,
        debugPlugin.DebugPanelPlugin,
        'debugPanel'
      );
    });
  }

  // Initialize the audio.
  audio.init('mp3,ogg');

  // allow cross-origin for image/texture loading
  loader.crossOrigin = 'anonymous';

  // set and load all resources.
  loader.preload(DataManifest, function () {
    // set the user defined game stages
    me.state.set(me.state.MENU, new TitleScreen());
    me.state.set(me.state.PLAY, new PlayScreen());

    // set a global fading transition for the screen
    me.state.transition('fade', '#FFFFFF', 50);

    // add our player entity in the entity pool
    me.pool.register('mainPlayer', PlayerEntity);
    me.pool.register('mainPlayerAttack', BulletEntity);
    me.pool.register('EnemyEntity', EnemyEntity);
    me.pool.register('strawberry', CollectableEntity);

    me.pool.register('BeeEnemyEntity', BeeEnemyEntity);
    me.pool.register('BirdEnemyEntity', BirdEnemyEntity);
    me.pool.register('BugEnemyEntity', BugEnemyEntity);
    me.pool.register('CaterpillarEnemyEntity', CaterpillarEnemyEntity);
    me.pool.register('MoleEnemyEntity', MoleEnemyEntity);
    me.pool.register('MothEnemyEntity', MothEnemyEntity);
    me.pool.register('SnailEnemyEntity', SnailEnemyEntity);
    me.pool.register('WaspEnemyEntity', WaspEnemyEntity);
    me.pool.register('WormEnemyEntity', WormEnemyEntity);

    // enable the keyboard
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    // map X, Up Arrow and Space for jump
    me.input.bindKey(me.input.KEY.X, 'jump', true);
    me.input.bindKey(me.input.KEY.UP, 'jump', true);
    //me.input.bindKey(me.input.KEY.SPACE, 'jump', true);
    // map S to shoot
    //me.input.bindKey(me.input.KEY.S, 'shoot');
    me.input.bindKey(me.input.KEY.DOWN, 'shoot');
    me.input.bindKey(me.input.KEY.SPACE, 'shoot');
    // map shift to sneak
    me.input.bindKey(me.input.KEY.SHIFT, 'sneak');

    // Start the game.
    me.state.change(me.state.PLAY, true);
  });
});
