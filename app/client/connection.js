let Connection = {
    initSocket(url) {
        if (window.socket !== undefined) {
            window.socket.disconnect();
            window.socket = undefined;
        }

        window.socket = io(url);
        socket.on('world', data => Game.updateWorld(data));
    },
    connectServer(world = 'Alpha') {
        return new Promise((resolve) => {
            socket.emit('connectServer', world, () => {
                Game.playerId = socket.id;
                resolve();
            });
        });
    }
};

export default Connection;
