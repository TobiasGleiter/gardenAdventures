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
    name: 'area01_level_tiles',
    type: 'image',
    src: 'data/img/map/area01_level_tiles.png',
  },
  {
    name: 'area01_level_tiles',
    type: 'tsx',
    src: 'data/map/area01_level_tiles.tsx',
  },
  // level map
  { name: 'area01', type: 'tmx', src: 'data/map/area01.json' },
  // main character png
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
  // title screen bg image
  {
    name: 'title_screen',
    type: 'image',
    src: 'data/img/sprite/title_screen.jpg',
  },
];

export default DataManifest;
