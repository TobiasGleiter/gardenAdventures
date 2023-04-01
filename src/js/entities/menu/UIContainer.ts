// a Panel type container
import * as me from 'melonjs';

class UIContainer extends me.Container {
  constructor(x: number, y: number, width: number, height: number) {
    // call the constructor
    super(x, y, width, height);

    // [0, 0] as origin
    this.anchorPoint.set(0, 0);

    // use screen coordinates
    this.floating = true;

    // give a name
    this.name = 'UIPanel';

    this.backgroundColor = 'red';
  }

  draw(renderer: any) {
    super.draw(renderer);
  }
}

export default UIContainer;
