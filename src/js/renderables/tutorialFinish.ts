import * as me from 'melonjs';

class tutorialFinishEntity extends me.Collectable {
    /**
     *
     * @param x
     * @param y
     * @param settings
     */

    constructor(x: number, y: number) {
        super(x, y, {
            frameheight: 16,
            framewidth: 16,
            width: 16,
            height: 8,
            image: "star",
            anchorPoint: new me.Vector2d(0, 0),
        });

        // add a rectangle shape
        this.body.addShape(new me.Rect(0, 0, 16, 16));

        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);

    }

    /**
     * collision handling
     */
    onCollision(/*response*/) {

        me.state.change(me.state.MENU, false);

        return false;
    }

}

export default tutorialFinishEntity;
