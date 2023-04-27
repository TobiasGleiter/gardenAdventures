// @ts-nocheck
import io from "socket.io-client";
//const socket = io('http://localhost:3000');

class Network {
    init(serverUrl) {
        this.socket = io(serverUrl);
        this.socket.on('connect', () => {
            // tell server to create the player with a color
            this.socket.emit('initialize', {id: this.socket.id});

        })
    }

    sendPosition(positionData) {
        this.socket.emit('movePlayer', positionData);
    }


}

const network = new Network();

export default network;