import { device } from 'melonjs';
import game from './js/index';

device.onReady(function onReady() {
  game.onload();
});
