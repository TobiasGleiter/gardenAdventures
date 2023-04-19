// a melonJS data manifest
// import model of data (models can be found in folder types)
import { MData } from './types/dataModel';

// note : this is note a webpack manifest
const DataManifest: MData[] = [
  // game font
  { name: 'PressStart2P', type: 'image', src: 'data/fnt/PressStart2P.png' },
  { name: 'PressStart2P', type: 'binary', src: 'data/fnt/PressStart2P.fnt' },
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
    src: 'data/img/sprite/mainPlayer16x16.png',
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
  // title screen bg image
  {
    name: 'title_screen',
    type: 'image',
    src: 'data/img/sprite/title_screen.jpg',
  },

    //Levels
  { name: 'Lvl1-1', type: 'tmx', src: 'data/map/Lvl1-1.json' },
  { name: 'Lvl1-2', type: 'tmx', src: 'data/map/Lvl1-2.json' },
  { name: 'Lvl1-3', type: 'tmx', src: 'data/map/Lvl1-3.json' },
  { name: 'Lvl1-4', type: 'tmx', src: 'data/map/Lvl1-4.json' },


];

export default DataManifest;
