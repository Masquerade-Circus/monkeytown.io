const ConnectionFactory = (Game) => {
    let Connection = {
        initSocket(url) {
            if (Game.socket !== undefined) {
                Game.socket.disconnect();
                Game.socket = undefined;
            }

            Game.socket = io(url);
            Game.socket.on('world', data => Game.updateWorld(data));
        },
        connectServer(world = 'Alpha') {
            return new Promise((resolve) => {
                Game.socket.emit('connectServer', world, () => {
                    Game.playerId = Game.socket.id;
                    resolve();
                });
            });
        },
        getWorlds: () => new Promise((resolve) => Game.socket.emit('getWorlds', resolve))
    };
    return Connection;
};


export default ConnectionFactory;
