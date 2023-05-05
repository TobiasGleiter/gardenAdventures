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
                framewidth: 15,
                frameheight: 16,
                width: 15,
                height: 16,
                image: "cheese",
                anchorPoint: new me.Vector2d(0,0),
            }
        );
        // add a rectangle shape
        this.body.addShape(new me.Rect(0, 0, 15, 16));

        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }
    /**
     * collision handling
     */
    onCollision(/*response*/) {

        if (game.data.health < 5){
            game.data.health++;
        }

        //avoid further collision and delete it

        me.game.world.removeChild(this as any);

        return false;
    }
}

export default CollectableEntity;
