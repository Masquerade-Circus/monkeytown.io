const Entities = require('../entities');
const {PROPS, NET_TYPES} = Entities;
const PlayerScriptsFactory = require('./player-scripts');

let Connection = {
    initSockets() {
        IO.sockets.on("connection", function (socket) {
            let player;
            let connecting = false;

            socket.world = 'Alpha';
            socket.on("connectServer", function (world = 'Alpha', callback = () => { }) {
                if (!player && !connecting && Game.children[socket.id] === undefined) {
                    connecting = true;
                    player = Entities.create({
                        [PROPS.NetType]: NET_TYPES.Player,
                        [PROPS.Position]: {x: 0, y: 1, z: 0},
                        [PROPS.Lerp]: 0.1,
                        id: socket.id,
                        socket,
                        world
                    });

                    Game.addEntity(player);
                    socket.world = world;
                    callback(null, Game.fixedProps(Game.getEntityInfo(player)));
                    PlayerScriptsFactory(player);
                    connecting = false;
                    return;
                }
                callback('Wrong connection');
            });

            socket.on('disconnect', () => player && player.destroy());
            socket.on('getWorlds', (callback) => callback(Game.getWorlds()));

            socket.sendingWorld = false;
            socket.sendWorld = function () {
                if (!socket.sendingWorld) {
                    socket.sendingWorld = true;
                    socket.emit('world', Game.fixedProps(Game.getWorldEntities(player || socket, 18 * 1.41)));
                    socket.sendingWorld = false;
                }
            };

        });

    }
};

module.exports = Connection;
