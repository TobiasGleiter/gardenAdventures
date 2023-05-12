// @ts-nocheck
import * as me from 'melonjs';
import io from 'socket.io-client';
import MPlayerEntity from './mPlayer';
//import {createSocket} from "dgram";
//const socket = io('http://localhost:3000');

class Network {
  init(serverUrl) {
    this.socket = io(serverUrl);
    this.socket.on('connect', () => {
      //console.log('Verbunden mit der Id: ' + this.socket.id);
      // tell server to create the player with username
      this.socket.emit('register', {
        id: this.socket.id,
        username: 'Spielername',
        position: { x: 0, y: 0 },
        level: me.level.getCurrentLevel().name as string,
      });

      this.socket.on('playerJoined', onPlayerJoined);
      this.socket.on('playerPosition', onUpdatePlayers);
      this.socket.on('playerLeft', (playerId) => {
        // Entferne das Spielerobjekt aus der Szene
        //console.log('Spieler entfernt: ' + playerId);
        const temp = me.game.world.getChildByName('mPlayer');
        //console.log(data)
        temp.forEach((player) => {
          if (player.socketId === playerId) {
            me.game.world.removeChild(player);
          }
        });
      });
      /* this.socket.on("scoreboard", (data) => {
                //console.log(data);
                this.scoreboard = data;
                //console.log(this.scoreboard[0]);
            });*/
    });
  }

  changeLevel(data) {
    this.socket.emit('changeLevel', data);
  }

  sendPosition(data) {
    this.socket.emit('movePlayer', data);
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
      this.socket.emit('getScoreboard');
      this.socket.on('scoreboard', (data) => {
        for (let i = 0; i < data.length; i++) {
          highscores.push(data[i].Score);
        }
        resolve(highscores);
      });
    });
  }

  async getMyScore() {
    return new Promise((resolve) => {
      this.socket.emit('getScore');
      this.socket.on('yourScore', (data) => {
        resolve(data);
      });
    });
  }
}

// HELPER
// Funktion, die aufgerufen wird, wenn ein neuer Spieler beitritt
function onPlayerJoined(data) {
  let players = JSON.parse(data);
  //console.log(JSON.parse(data));
  for (const playerId in players) {
    const player = players[playerId];
    if (player.id !== network.getPlayerId()) {
      const newPlayer = new MPlayerEntity(
        player.id,
        player.name,
        player.level,
        player.position.x,
        player.position.y
      );
      me.game.world.addChild(newPlayer);
    }
  }
  //const player = JSON.parse(data);
  // Füge den Spieler zu unserer Liste hinzu
  //const newPlayer = new MPlayerEntity(player.id, player.name, player.position.x, player.position.y);
  //me.game.world.addChild(newPlayer);

  //console.log(this.id)
}

function onUpdatePlayers(data) {
  const mPlayers = me.game.world.getChildByName('mPlayer');
  //console.log(data.players);
  if (mPlayers.length == 0) {
    let players = data.players;
    for (const playerId in players) {
      const player = players[playerId];
      // && ;
      if (
        player.id !== network.getPlayerId() &&
        player.level === me.level.getCurrentLevel().name
      ) {
        const newPlayer = new MPlayerEntity(
          player.id,
          player.name,
          player.level,
          player.position.x,
          player.position.y
        );
        //console.log('Spieler hinzugefügt:' + player.id);
        me.game.world.addChild(newPlayer);
      }
    }
  }

  // NEW POS
  mPlayers.forEach((player) => {
    if (
      player.socketId === data.id &&
      player.level === me.level.getCurrentLevel().name
    ) {
      player.pos.x = data.x + 8;
      player.pos.y = data.y + 8;
    }
  });
}

const network = new Network();

export default network;
