let Connection = {
    initSockets() {
        IO.sockets.on("connection", function (socket) {
            let playerId = socket.id;
            let player;
            socket.world = 'Alpha';

            socket.on("connectServer", function (world = 'Alpha', callback = () => { }) {
                player = Entities.create({
                    [Entities.PROPS.netType]: Entities.TYPES.Player,
                    [Entities.PROPS.position]: {x: 0, y: 0, z: 0},
                    id: playerId,
                    socket,
                    world
                });

                Game.addEntity(player);
                socket.world = world;
                callback();
            });

            socket.on('disconnect', () => {
                if (player) {
                    player.destroy();
                }
            });

            socket.sendingWorld = false;
            socket.sendWorld = function () {
                if (!socket.sendingWorld) {
                    socket.sendingWorld = true;
                    socket.emit('world', Game.getWorldInfo(socket));
                    socket.sendingWorld = false;
                }
            };

        });

    }
};

module.exports = Connection;
