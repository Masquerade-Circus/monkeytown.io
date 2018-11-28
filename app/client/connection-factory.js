const ConnectionFactory = (Game) => {
    let Connection = {
        initSocket(url) {
            if (Game.socket !== undefined) {
                Game.socket.disconnect();
                Game.socket = undefined;
            }

            Game.socket = io(url);

            /**
             * As we will destroy the player when socket disconnects
             * with this we will reload the browser page if the user recconnects
             */
            Game.socket.on('reconnect', () => window.location.href = window.location.href);

            // Custom game events
            Game.socket.on('world', data => Game.updateWorld(data));
        },
        connectServer(name, world = 'Alpha') {
            return new Promise((resolve) => {
                Game.socket.emit('connectServer', name, world, (err, entity) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    entity.socket = Game.socket;
                    resolve(entity);
                });
            });
        },
        getWorlds: () => new Promise((resolve) => Game.socket.emit('getWorlds', resolve))
    };
    return Connection;
};


export default ConnectionFactory;
