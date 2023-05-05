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
        return new Promise((resolve) => {
            const highscores = [];
            this.socket.emit("getScoreboard");
            this.socket.on("scoreboard", (data) => {
                highscores.push(data[0].Score);
                highscores.push(data[1].Score);
                highscores.push(data[2].Score);
                highscores.push(data[3].Score);
                highscores.push(data[4].Score);
                resolve(highscores);
            });
        });
    }

    async getMyScore(){
        return new Promise((resolve) => {
            this.socket.emit("getScore");
            this.socket.on('yourScore', (data) => {
                resolve(data);
            })
        })
    }


}

const network = new Network();

export default network;