import * as me from "melonjs";
import game from "../../game";

class CollectableEntity extends me.Collectable {
    /**
     * constructor
     */
    constructor(x:number, y:number) {
        // call the super constructor
        super(x, y,
            {
                framewidth: 12,
                frameheight: 16,
                width: 12,
                height: 16,
                image: "strawberry",
                anchorPoint: new me.Vector2d(0,0),
            }
        );
        // add a rectangle shape
        this.body.addShape(new me.Rect(0, 0, 12, 16));

        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }
    /**
     * collision handling
     */
    onCollision(/*response*/) {

        // give some score
        game.data.score += 1;

        //avoid further collision and delete it

        me.game.world.removeChild(this as any);

        return false;
    }
}

export default CollectableEntity;
