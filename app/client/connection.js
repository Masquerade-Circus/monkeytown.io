let Connection = {
    initSocket(url) {
        if (window.socket !== undefined) {
            window.socket.disconnect();
            window.socket = undefined;
        }

        window.socket = io(url);
    },
    connectServer() {
        return new Promise((resolve) => {
            socket.emit('connectServer', () => {
                Game.playerId = socket.id;

                resolve();
            });
        });
    }
};

export default Connection;
