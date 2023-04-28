// @ts-nocheck
import io from "socket.io-client";
import {createSocket} from "dgram";
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

    sendScore(data) {
        this.socket.emit('score', data);
    }

    getPlayerId() {
        return this.socket.id;
    }


    async getScoreboard() {
        this.socket.emit("getScoreboard");
            return this.socket.on("scoreboard", (data) => {
            console.log(data);
        });

    }
}

const network = new Network();

export default network;