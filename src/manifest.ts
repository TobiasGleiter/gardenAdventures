// a melonJS data manifest
// import model of data (models can be found in folder types)
import { MData } from './types/dataModel';

// note : this is note a webpack manifest
const DataManifest: MData[] = [
    //default
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
  { name: 'area01', type: 'tmx', src: 'data/map/area01.json' },

    //1st Level
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
    //not sure

  { name: 'Plattformer2', type: 'tmx', src: 'data/map/Plattformer2.json' },
  {
    name: 'gripe_run_right',
    type: 'image',
    src: 'data/img/sprite/gripe_run_right.png',
  },
];

export default DataManifest;
