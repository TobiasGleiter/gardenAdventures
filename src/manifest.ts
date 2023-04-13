// a melonJS data manifest
// import model of data (models can be found in folder types)
import { MData } from './types/dataModel';

// note : this is note a webpack manifest
const DataManifest: MData[] = [
    //Tileset
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
  //Player
  {
    name: 'gripe_run_right',
    type: 'image',
    src: 'data/img/sprite/gripe_run_right.png',
  },

    //1st Level
  { name: 'Lvl1-1', type: 'tmx', src: 'data/map/Lvl1-1.json' },


];

export default DataManifest;
