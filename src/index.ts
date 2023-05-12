//@ts-nocheck
import * as me from 'melonjs';
import { audio, device, loader, plugin, utils } from 'melonjs';

import 'index.css';

import PlayerEntity from 'js/renderables/player';
import Highscore from 'js/stage/Highscore.ts';
import LevelSelect from 'js/stage/levelSelect.ts';
import PlayScreen from 'js/stage/play.ts';
import TitleScreen from 'js/stage/title.ts';

import Game_Over from 'js/stage/Game_over.ts';

import DataManifest from 'manifest.ts';
import BulletEntity from './js/renderables/bullet';
import CoinItemEntity from './js/renderables/coinItem';
import EnemyEntity from './js/renderables/enemies';
import HealingItemEntity from './js/renderables/healingItem';

import BeeEnemyEntity from './js/renderables/beeEnemy';
import BirdEnemyEntity from './js/renderables/birdEnemy';
import BugEnemyEntity from './js/renderables/bugEnemy';
import CaterpillarEnemyEntity from './js/renderables/caterpillarEnemy';
import MoleEnemyEntity from './js/renderables/moleEnemy';
import MothEnemyEntity from './js/renderables/mothEnemy';
import SnailEnemyEntity from './js/renderables/snailEnemy';
import SpikeEnemyEntity from './js/renderables/spikeEnemy';
import WaspEnemyEntity from './js/renderables/waspEnemy';
import WormEnemyEntity from './js/renderables/wormEnemy';

import AcidAttack from './js/renderables/acidAttack';
import MothAttack from './js/renderables/mothAttack';
import SlimeAttack from './js/renderables/slimeAttack';
import StingAttack from './js/renderables/stingAttack';

// Probleme bei pseudo mp
import tutorialFinishEntity from './js/renderables/tutorialFinish';
import network from './multiplayer/network';

//const serverUrl = 'localhost:3000' // <-- for Development
//const serverUrl = 'http://167.235.53.100'; // <-- funktioniert nur ohne ssl...
const serverUrl = 'https://gardenadventures.server-welt.com:3000'; // <-- erreichbar unter PORT 3000, leider mit Proxy nicht geschafft

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
    me.state.set(me.state.SETTINGS, new LevelSelect());
    me.state.set(me.state.SCORE, new Highscore());

    me.state.set(me.state.GAMEOVER, new Game_Over());

    // set a global fading transition for the screen
    me.state.transition('fade', '#FFFFFF', 50);

    // add our player entity in the entity pool
    me.pool.register('mainPlayer', PlayerEntity);
    me.pool.register('mainPlayerAttack', BulletEntity);
    me.pool.register('EnemyEntity', EnemyEntity);
    me.pool.register('cheese', HealingItemEntity);
    me.pool.register('coin', CoinItemEntity);
    me.pool.register('finishTutorial', tutorialFinishEntity);

    // add our player entity in the entity pool
    me.pool.register('mainPlayer', PlayerEntity);
    me.pool.register('mainPlayerAttack', BulletEntity);
    me.pool.register('EnemyEntity', EnemyEntity);

    me.pool.register('BeeEnemyEntity', BeeEnemyEntity);
    me.pool.register('BirdEnemyEntity', BirdEnemyEntity);
    me.pool.register('BugEnemyEntity', BugEnemyEntity);
    me.pool.register('CaterpillarEnemyEntity', CaterpillarEnemyEntity);
    me.pool.register('MoleEnemyEntity', MoleEnemyEntity);
    me.pool.register('MothEnemyEntity', MothEnemyEntity);
    me.pool.register('SnailEnemyEntity', SnailEnemyEntity);
    me.pool.register('WaspEnemyEntity', WaspEnemyEntity);
    me.pool.register('WormEnemyEntity', WormEnemyEntity);
    me.pool.register('SpikeEnemyEntity', SpikeEnemyEntity);

    me.pool.register('MothAttack', MothAttack);
    me.pool.register('StingAttack', StingAttack);
    me.pool.register('SlimeAttack', SlimeAttack);
    me.pool.register('AcidAttack', AcidAttack);

    // enable the keyboard
    me.input.bindKey(me.input.KEY.ESC, 'pause');
    me.input.bindKey(me.input.KEY.ENTER, 'resume');
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
    // SERVER
    // probleme bei psudo mp
    network.init(serverUrl, {
      path: '/socket.io',
    });
  });
});
