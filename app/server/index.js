const Entities = require('../entities');
const Connection = require('./connection');
const GameReady = require('./game-ready');
const test = require('./test');

const {PROPS, NET_TYPES} = Entities;

const Game = {
    deltaTime: Date.now(),
    ready: false,
    children: {},
    connection: Connection,
    worlds: {},
    initGame() {
        Entities.init();
        Game.generateWorlds();
        Connection.initSockets();
        test();

        Game.update();
        Game.ready = true;
        GameReady(Game);
    },
    update() {
        let dt = (Date.now() - Game.deltaTime) * .001;

        for (let world in Game.worlds) {
            Game.worlds[world].playerCount = 0;
        }

        for (let i in Game.children) {
            Game.children[i].update(dt);
            if (
                Game.children[i][PROPS.netType] === NET_TYPES.Player
                && Game.children[i].world
            ) {
                Game.worlds[Game.children[i].world].playerCount += 1;
            }
        }

        for (let s in IO.sockets.sockets) {
            IO.sockets.sockets[s].sendWorld();
        }

        Game.deltaTime = Date.now();
        setTimeout(() => Game.update(), 1000 / 60);
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
                maxPlayers: 48
            };
        });
    },
    getWorldEntities(player, maxDistance = 26 * 1.41) {
        let world = Game.worlds[player.world];
        let worldEntities = {};

        let position = player.p || new THREE.Vector3(0, 0, 0);

        for (let i in world.children) {
            let entity = world.children[i];
            let distance = entity.body.position.distanceTo(position);

            // Get only the closest entities
            if (distance < maxDistance) {
                worldEntities[i] = Game.getEntityInfo(entity);
            }
        }

        return worldEntities;
    },
    getEntityInfo(entity) {
        let info = {
            id: entity.id,
            [PROPS.position]: {
                x: entity.body.position.x,
                y: entity.body.position.y,
                z: entity.body.position.z
            },
            [PROPS.quaternion]: {
                x: entity.body.quaternion.x,
                y: entity.body.quaternion.y,
                z: entity.body.quaternion.z,
                w: entity.body.quaternion.w
            },
            [PROPS.netType]: entity[PROPS.netType],
            [PROPS.lerp]: entity[PROPS.lerp],
            [PROPS.status]: entity[PROPS.status]
        };
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
