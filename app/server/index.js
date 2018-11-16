global.Entities = require('../entities');
const Connection = require('./connection');
const test = require('./test');

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
    },
    update() {
        let dt = (Date.now() - Game.deltaTime) * .001;

        for (let world in Game.worlds) {
            Game.worlds[world].playerCount = 0;
        }

        for (let i in Game.children) {
            Game.children[i].update(dt);
            if (Game.children[i].world) {
                Game.worlds[Game.children[i].world].playerCount += 1;
            }
        }

        for (let s in IO.sockets.sockets) {
            IO.sockets.sockets[s].sendWorld();
        }

        Game.deltaTime = Date.now();
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
                    width: 1000,
                    height: 1000
                },
                children: {},
                name: world,
                playerCount: 0,
                maxPlayers: 48
            };
        });
    },
    getWorldInfo(player) {
        let world = Game.worlds[player.world];
        let worldInfo = {
            children: {}
        };

        let position = player.p || new THREE.Vector3(0, 0, 0);

        for (let i in world.children) {
            let entity = world.children[i];
            let distance = entity.body.position.distanceTo(position);

            // Get only the closest entities
            if (distance < 50) {
                worldInfo.children[i] = Game.getEntityInfo(entity);
            }
        }

        return worldInfo;
    },
    getEntityInfo(entity) {
        let info = {
            id: entity.id,
            [Entities.PROPS.position]: {
                x: entity.body.position.x,
                y: entity.body.position.y,
                z: entity.body.position.z
            },
            [Entities.PROPS.quaternion]: {
                x: entity.body.quaternion.x,
                y: entity.body.quaternion.y,
                z: entity.body.quaternion.z,
                w: entity.body.quaternion.w
            },
            [Entities.PROPS.netType]: entity[Entities.PROPS.netType],
            [Entities.PROPS.lerp]: entity[Entities.PROPS.lerp]
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
    }
};

module.exports = Game;
