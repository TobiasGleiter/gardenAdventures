// a melonJS data manifest
// import model of data (models can be found in folder types)
import { MData } from './types/dataModel';

// note : this is note a webpack manifest
const DataManifest: MData[] = [
    // ----------------------------------------------------------------------------------
  // game font
  { name: 'PressStart2P', type: 'image', src: 'data/fnt/PressStart2P.png' },
  { name: 'PressStart2P', type: 'binary', src: 'data/fnt/PressStart2P.fnt' },
  // ----------------------------------------------------------------------------------
  // level tiles
  {
    name: 'Assets',
    type: 'image',
    src: 'data/img/map/Assets.png',
  },
  {
    name: 'Assets',
    type: 'tsx',
    src: 'data/map/Assets.tsx',
  },
  {
    name: 'obstacles',
    type: 'image',
    src: 'data/img/obstacles/obstacles.png',
  },
  {
    name: 'obstacles',
    type: 'tsx',
    src: 'data/map/obstacles.tsx',
  },
  //Background
  {
    name: 'Background_1',
    type: 'image',
    src: 'data/img/background/Background_1.png',
  },
  {
    name: 'Background_2',
    type: 'image',
    src: 'data/img/background/Background_2.png',
  },
  {
    name: 'Background_2',
    type: 'tsx',
    src: 'data/map/Background_2.tsx',
  },
  //Player
  {
    name: 'mainPlayerImage',
    type: 'image',
    src: 'data/img/sprite/mainPlayer16x16.png', //mainPlayer32x32.png
  },
  {
    name: 'cheese',
    type: 'image',
    src: 'data/img/collectables/Kaese.png',
  },
  {
    name: 'coin',
    type: 'image',
    src: 'data/img/collectables/Muenze.png',
  },
  {
    name: 'star',
    type: 'image',
    src: 'data/img/collectables/Stern.png',
  },
  // bullet png
  {
    name: 'mainPlayerAttack',
    type: 'image',
    src: 'data/img/sprite/bullet.png',
  },
  // Enemy
  {
    name: 'enemy',
    type: 'image',
    src: 'data/img/sprite/enemy.png',
  },
  {
    name: 'enemies',
    type: 'image',
    src: 'data/img/sprite/enemies.png',
  },
  {
    name: 'enemies1',
    type: 'image',
    src: 'data/img/sprite/enemies1.png',
  },
  {
    name: 'enemies2',
    type: 'image',
    src: 'data/img/sprite/enemies2.png',
  },

/*  {
    name: 'mothEnemy',
    type: 'image',
    src: 'data/img/sprite/moth_enemy.png',
  },
  {
    name: 'birdEnemy',
    type: 'image',
    src: 'data/img/sprite/bird_enemy.png',
  },
  {
    name: 'moleEnemy',
    type: 'image',
    src: 'data/img/sprite/mole_enemy.png',
  },
  {
    name: 'beeEnemy',
    type: 'image',
    src: 'data/img/sprite/bee_enemy.png',
  },
  {
    name: 'waspEnemy',
    type: 'image',
    src: 'data/img/sprite/wasp_enemy.png',
  },
  {
    name: 'snailEnemy',
    type: 'image',
    src: 'data/img/sprite/snail_enemy.png',
  },
  {
    name: 'caterpillarEnemy',
    type: 'image',
    src: 'data/img/sprite/caterpillar_enemy.png',
  },
  {
    name: 'bugEnemy',
    type: 'image',
    src: 'data/img/sprite/bug_enemy.png',
  },
  {
    name: 'wormEnemy',
    type: 'image',
    src: 'data/img/sprite/worm_enemy.png',
  },*/

  // Attacks
/*  {
    name: 'mothAttack',
    type: 'image',
    src: 'data/img/sprite/moth_attack.png',
  },
  {
    name: 'stingAttack',
    type: 'image',
    src: 'data/img/sprite/sting_attack.png',
  },*/
  {
    name: 'attacks',
    type: 'image',
    src: 'data/img/sprite/attacks.png',
  },
  {
    name: 'attacks1',
    type: 'image',
    src: 'data/img/sprite/attacks1.png',
  },

  // title screen bg image
  {
    name: 'title_screen',
    type: 'image',
    src: 'data/img/sprite/title_screen.jpg',
  },
  // title screen bg image
  {
    name: 'health',
    type: 'image',
    src: 'data/img/sprite/health.png',
  },

  //Levels
  { name: 'Lvl1-1', type: 'tmx', src: 'data/map/Lvl1-1.json' },
  { name: 'Lvl1-2', type: 'tmx', src: 'data/map/Lvl1-2.json' },
  { name: 'Lvl1-3', type: 'tmx', src: 'data/map/Lvl1-3.json' },
  { name: 'Lvl1-4', type: 'tmx', src: 'data/map/Lvl1-4.json' },

  //Test Levels
  { name: 'items', type: 'tmx', src: 'data/map/test/items.json' },
  { name: 'enemies', type: 'tmx', src: 'data/map/test/enemies.json' },

];

export default DataManifest;
