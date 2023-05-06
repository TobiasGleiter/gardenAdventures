import * as me from 'melonjs';

class MPlayerEntity extends me.Sprite {
  public socketId: any;
  public username: string;

  constructor(id: any, username: string, x: number, y: number) {
    super(x, y, {
      frameheight: 16,
      framewidth: 16,
      image: 'mainPlayerImage',
    });

    this.socketId = id;
    this.name = 'mPlayer';
    this.username = username;
    this.pos.x = x;
    this.pos.y = y;

    this.tint.setColor(0, 255, 0);
    this.alpha = 0.5;

    this.addAnimation('run', [4]);
    this.setCurrentAnimation('run');
  }
}

export default MPlayerEntity;
