// @ts-nocheck
import io from "socket.io-client";
//import {createSocket} from "dgram";
//const socket = io('http://localhost:3000');

class Network {

    init(serverUrl) {
        this.socket = io(serverUrl);
        this.socket.on('connect', () => {
            // tell server to create the player with a color
            this.socket.emit('initialize', {id: this.socket.id});

           /* this.socket.on("scoreboard", (data) => {
                //console.log(data);
                this.scoreboard = data;
                console.log(this.scoreboard[0]);
            });*/
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
        //this.socket.emit("getScoreboard");
        /*let scoreboard = await this.socket.on("scoreboard", (data) => {
            console.log(data);
            this.scoreboard = data;
            //console.log(this.scoreboard);
        }).then(() => { return this.scoreboard});

        console.log(scoreboard)
        return scoreboard;*/
    }

}

const network = new Network();

export default network;