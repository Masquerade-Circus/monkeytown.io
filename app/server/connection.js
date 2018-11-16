const Entities = require('../entities');
const {PROPS, NET_TYPES} = Entities;

let Connection = {
    initSockets() {
        IO.sockets.on("connection", function (socket) {
            let playerId = socket.id;
            let player;
            socket.world = 'Alpha';

            socket.on("connectServer", function (world = 'Alpha', callback = () => { }) {
                player = Entities.create({
                    [PROPS.netType]: NET_TYPES.Player,
                    [PROPS.position]: {x: 0, y: 0, z: 0},
                    [PROPS.lerp]: 0.1,
                    id: playerId,
                    socket,
                    world
                });

                Game.addEntity(player);
                socket.world = world;
                callback();
            });

            socket.on('disconnect', () => player && player.destroy());
            socket.on('getWorlds', (callback) => callback(Game.getWorlds()));

            socket.sendingWorld = false;
            socket.sendWorld = function () {
                if (!socket.sendingWorld) {
                    socket.sendingWorld = true;
                    socket.emit('world', Game.fixedProps(Game.getWorldInfo(socket)));
                    socket.sendingWorld = false;
                }
            };

        });

    }
};

module.exports = Connection;
