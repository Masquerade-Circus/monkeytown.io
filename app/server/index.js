const Entities = require('../entities');
const Connection = require('./connection');
const GameReady = require('./game-ready');
const test = require('./test');

const {PROPS, NET_TYPES, RESOURCES} = Entities;

const Game = {
    clock: null,
    ready: false,
    children: {},
    connection: Connection,
    worlds: {},
    initGame() {
        Entities.init(Game);
        Game.generateWorlds();
        Connection.initSockets();
        test();

        Game.clock = new THREE.Clock(true);
        Game.update();
        Game.ready = true;
        GameReady(Game);
    },
    update() {
        let dt = Game.clock.getDelta();

        for (let world in Game.worlds) {
            Game.worlds[world].playerCount = 0;
        }

        for (let i in Game.children) {
            Game.children[i].update(dt);
            if (
                Game.children[i]
                && Game.children[i][PROPS.NetType] === NET_TYPES.Player
                && Game.children[i].world
            ) {
                Game.worlds[Game.children[i].world].playerCount += 1;
            }
        }

        for (let s in IO.sockets.sockets) {
            IO.sockets.sockets[s].sendWorld();
        }

        setTimeout(() => Game.update(), 1000 / 30);
    },
    addEntity(childEntity) {
        Game.children[childEntity.id] = childEntity;
        childEntity.parent = Game;
        Game.worlds[childEntity.world].children[childEntity.id] = childEntity;
    },
    generateWorlds() {
        let servers = ['Alpha', 'Beta'];
        servers.forEach(world => {
            Game.worlds[world] = {
                size: {
                    width: 100,
                    height: 100
                },
                children: {},
                name: world,
                playerCount: 0,
                maxPlayers: 48,
                leaderboard: []
            };
        });
        Game.updateLeaderboards();
    },
    updateLeaderboards() {
        for (let world in Game.worlds) {
            let leaderboard = [];
            for (let id in Game.worlds[world].children) {
                if (Game.children[id][PROPS.NetType] === NET_TYPES.Player) {
                    leaderboard.push({
                        id,
                        name: Game.children[id].name,
                        score: Game.children[id][PROPS.Resources][RESOURCES.Gold]
                    });
                }
            }
            leaderboard.sort((a, b) => {
                if (a.score === b.score) {
                    return a.name - b.name;
                }

                return b.score - a.score;
            });
            Game.worlds[world].leaderboard = leaderboard.slice(0, 10);
        }
        setTimeout(Game.updateLeaderboards, 2000);
    },
    getWorldEntities(player, maxDistance = 3, additionalProps = []) {
        let world = Game.worlds[player.world];
        let worldEntities = {};

        let position = player[PROPS.Position] || new THREE.Vector3(0, 0, 0);

        for (let i in world.children) {
            let entity = world.children[i];
            let distance = entity.body.position.distanceTo(position);

            // Get only the closest entities
            if (distance < maxDistance) {
                worldEntities[i] = Game.getEntityInfo(entity, additionalProps);
            }
        }

        return worldEntities;
    },
    getEntityInfo(entity, additionalProps = []) {
        let info = {
            id: entity.id,
            [PROPS.Position]: {
                x: entity.body.position.x,
                y: entity.body.position.y,
                z: entity.body.position.z
            },
            [PROPS.Quaternion]: {
                x: entity.body.quaternion.x,
                y: entity.body.quaternion.y,
                z: entity.body.quaternion.z,
                w: entity.body.quaternion.w
            },
            [PROPS.NetType]: entity[PROPS.NetType],
            [PROPS.Lerp]: entity[PROPS.Lerp],
            [PROPS.Status]: entity[PROPS.Status]
        };

        for (let l = additionalProps.length; l--;) {
            if (entity[additionalProps[l]] !== undefined) {
                info[additionalProps[l]] = entity[additionalProps[l]];
            }
        }
        return info;
    },
    fixedProps(obj = {}, precision = 3) {
        let o = Array.isArray(obj) ? [] : {};

        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                o[i] = Game.fixedProps(obj[i]);
                continue;
            }

            if (typeof obj[i] === 'number') {
                o[i] = +(obj[i]).toFixed(precision);
                continue;
            }

            o[i] = obj[i];
        }

        return o;
    },
    getWorlds() {
        let worlds = {};
        for (let name in Game.worlds) {
            worlds[name] = {
                playerCount: Game.worlds[name].playerCount,
                maxPlayers: Game.worlds[name].maxPlayers
            };
        }
        return worlds;
    }
};

module.exports = Game;
