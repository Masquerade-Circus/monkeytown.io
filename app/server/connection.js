let Connection = {
    initSockets() {
        IO.sockets.on("connection", function (socket) {
            let playerId = socket.id;
            let player;

            socket.on("connectServer", function (callback = () => { }) {
                player = Entities.create({
                    [Entities.PROPS.netType]: Entities.TYPES.Player,
                    id: playerId,
                    socket: socket
                });

                Game.addEntity(player);
                callback();
            });

            socket.on('disconnect', () => {
                if (player) {
                    player.destroy();
                }
            });

        });

    }
};

module.exports = Connection;
