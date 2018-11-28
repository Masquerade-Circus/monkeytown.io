const Entities = require('../entities');
const {PROPS, NET_TYPES, ADDITIONAL_PROPERTIES} = Entities;
const PlayerScriptsFactory = require('./player-scripts');

let Connection = {
    initSockets() {
        IO.sockets.on("connection", function (socket) {
            let player;
            let connecting = false;

            socket.world = 'Alpha';
            socket.on("connectServer", function (name, world = 'Alpha', callback = () => { }) {
                if (!name || name.trim().length === 0) {
                    name = 'Anonymous';
                }
                name = name.trim().slice(0, 23);
                if (!connecting && Game.children[socket.id] === undefined) {
                    connecting = true;
                    player = Entities.create({
                        [PROPS.NetType]: NET_TYPES.Player,
                        [PROPS.Position]: {x: 0, y: 1, z: 0},
                        [PROPS.Lerp]: 0.1,
                        id: socket.id,
                        socket,
                        world,
                        name
                    });

                    Game.addEntity(player);
                    socket.world = world;
                    callback(null, Game.fixedProps(Game.getEntityInfo(player, ADDITIONAL_PROPERTIES)));
                    PlayerScriptsFactory(player);
                    connecting = false;
                    return;
                }
                callback('Wrong connection');
            });

            socket.on('disconnect', () => player && player.destroy());
            socket.on('getWorlds', (callback) => callback(Game.getWorlds()));

            let distance = 18 * 1.41;
            socket.sendingWorld = false;
            socket.sendWorld = function (additionalProperties = []) {
                if (!socket.sendingWorld) {
                    socket.sendingWorld = true;
                    let entitiesInfo = Game.getWorldEntities(
                        player || socket,
                        distance,
                        ADDITIONAL_PROPERTIES.concat(additionalProperties)
                    );
                    socket.emit('world', Game.fixedProps(entitiesInfo));
                    socket.sendingWorld = false;
                }
            };

        });

    }
};

module.exports = Connection;
