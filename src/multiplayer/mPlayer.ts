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

    const rgb = randomColor();
    console.log(rgb);

    this.tint.setColor(rgb.r, rgb.g, rgb.b);
    this.alpha = 0.5;

    this.addAnimation('run', [4]);
    this.setCurrentAnimation('run');
  }
}

function randomColor() {
  const colors = [
    { r: 255, g: 0, b: 0 },
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 0, b: 255 },
    { r: 0, g: 255, b: 255 },
    { r: 255, g: 0, b: 255 },
    { r: 255, g: 255, b: 0 },
  ];
  // Generate a random index into the array
  const randomIndex = Math.floor(Math.random() * colors.length);

  const randomColor = colors[randomIndex];

  // Get the color at the random index
  return randomColor;
}

export default MPlayerEntity;
